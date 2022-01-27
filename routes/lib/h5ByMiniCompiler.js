const path = require('path');
const fs = require('fs');
const { assert } = require('console');
const templateConverter = require('./htmlToH5Compiler.js');
// babylon  将源码转成ast Babylon 是 Babel 中使用的 JavaScript 解析器。
// @babel/traverse 对ast解析遍历语法树
// @babel/types 用于AST节点的Lodash-esque实用程序库
// @babel/generator 结果生成
const types = require('@babel/types');
const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const extract = require('babel-extract-comments');
const TemplateParser = require('../lib/templateParser.js');

const failTip = (content, node = {}) => {
  const { start } = node;
  const obj = extract(`// 转换失败标记:` + content);
  obj[0].start = start;
  obj[0].end = start;
  return obj;
};

class WebpackCompiler {
  constructor(config) {
    this.config = config;
    this.modules = {};
    this.root = process.cwd(); //当前项目地址
    this.source = this.config.source;
  }

  // 解析源码
  async parse(source) {
    const htmlExp = /(?<=template)(?![\w\W]*template\>)[\w\W]+/gi;
    let htmlStr = source
      .replace(htmlExp, '>')
      .toString()
      .replace(/\<template\>/g, '')
      .replace(/(.*)<\/template>/, '$1');
    const styleExp = /<style([\s\S]*?)<\/style>/gi;
    const styleStr = source.match(styleExp, '$1').toString().replace(/(\d+)rpx/g,function(val,group){
      return group + 'px'
   })

    var jsExp = /<script([\s\S]*?)<\/script>/gi;
    var jsStr = source.match(jsExp);
    let jsContent = jsStr[0]
      .toString()
      .replace(/\<script\>/g, '')
      .replace(/(.*)<\/script>/, '$1');
    let jsAst = babylon.parse(jsContent, { sourceType: 'module' });
    // js部分，遍历语法树
    // https://astexplorer.net/
    traverse(jsAst, {
      // 监听整个ast节点
      Program(path) {
        // 添加import导入
        const importDefaultSpecifier = [types.ImportDefaultSpecifier(types.Identifier('PageMixins'))];
        const importDeclaration = types.ImportDeclaration(importDefaultSpecifier, types.StringLiteral('@/mixins/PageMixins'));
        path.get('body')[0].insertBefore(importDeclaration);
      },
      // export的监听
      ExportDefaultDeclaration(path) {
        const obj = types.ObjectProperty(types.Identifier('mixins'), types.ArrayExpression([types.identifier('PageMixins')]));
        path.node.declaration.properties.unshift(obj);
      },
      // 方法调用的监听
      // CallExrpession 节点有两个属性，callee 和 arguments，分别对应调用的函数名和参数
      CallExpression(path, state) {
        // 是方法类型
        // 说明是通过对象调用
        if (types.isMemberExpression(path.node.callee)) {
          const name = path.node.callee.object.name; // 调用对象的名称
          const propertyName = path.node.callee.property.name; // 调用对象的方法名称
          // 针对uni对象做处理
          if (name === 'uni') {
            // 需要转换完内部封装api
            const changeMyApi = ['navigateTo', 'showLoading', 'hideLoading', 'showToast', 'navigateBack'];
            if (changeMyApi.includes(propertyName)) {
              // 将uni转成wx.yl
              path.node.callee.object.name = 'this.utils';
              switch (propertyName) {
                case 'navigateTo':
                  path.node.callee.property.name = 'goPage';
                  break;
                case 'navigateBack':
                  path.node.callee.property.name = 'goBack';
                  break;
                case 'showLoading':
                  // showLoading去除mask属性，无效
                  path.node.arguments[0].properties = path.node.arguments[0].properties.filter(item => {
                    return item.key.name !== 'mask';
                  });
                  // 插入对象的方法
                  break;
                case 'hideLoading':
                  path.node.callee.property.name = 'hideLoading';
                  break;
                case 'showToast':
                  path.node.callee.property.name = 'showToast';
                  break;
              }
            } else{
              // 非封装的情况，帮忙转换成wx
              // path.node.callee.object.name = 'wxkkkk';
            }
          } else if (name === 'wx') {
            // 需要转换完内部封装api
            const changeMyApi = ['navigateTo', 'navigateBack'];
            // 需要转换完“微信”封装api
            if (changeMyApi.includes(propertyName)) {
              // 将uni转成wx.yl
              path.node.callee.object.name = 'this.utils';
              switch (propertyName) {
                case 'navigateTo':
                  path.node.callee.property.name = 'goPage';
                  break;
                case 'navigateBack':
                  path.node.callee.property.name = 'goBack';
                  break;
              }
            } else{
              // 非封装的情况，帮忙转换成wx
              // path.node.callee.object.name = 'wx';
            }
          }
        } else {
          // 说明是直接调用，暂时无需处理
        }
      },
      // 引入部分处理
      ImportDeclaration(path) {
      },
      // 对象的监听
      ObjectProperty(path) {
        switch (path.node.key.name) {
          case 'methods':
            // 删除mapMutations
            path.node.value.properties.forEach(property => {
              if (property.key.name === 'mapMutations') {
                path.node.leadingComments = failTip(`不支持mapMutations，请删除`, path.node);
              }
            });
            break;
        }
      },
      // 方法监听
      ObjectMethod(path) {
      },
    });
    jsContent = generator(jsAst).code;

    const templateParser = new TemplateParser();
    const pattern = /<(\w+)\s*(.*?)\/>/ig
    htmlStr = htmlStr.replace( pattern, '<$1 $2></$1>');
    const templateAst = await templateParser.parse(htmlStr);
    //进行上述目标的转换
    const convertedTemplate = templateConverter(templateAst);
    //把语法树转成文本
    let templateConvertedString = templateParser.astToString(convertedTemplate);
    templateConvertedString = templateConvertedString.replace(/else=\"\"/ig, 'else' );
    templateConvertedString = templateConvertedString.replace(/><\/input>/ig, '\/>' );
    return {
      htmlStr: `<template>${templateConvertedString}</template>` ,
      // htmlStr: htmlStr[0].toString().replace("<template>", "").replace("</template>", ""),
      styleStr: styleStr,
      jsStr: `<script>${jsContent}</script>`,
    };
  }

  async run() {
    const { htmlStr, jsStr, styleStr } = await this.parse(this.source); //根据路径拿到源码，以及源码中已经require的文件名称数组
    return htmlStr + '\n'+ jsStr  + '\n'+ styleStr;
  }
}

module.exports = WebpackCompiler;
