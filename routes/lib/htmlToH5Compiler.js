const tagConverterConfig = {
  text: 'span',
  view: 'div',
  image: 'x-image',
};
//属性替换规则，也可以加入更多
const attrConverterConfig = {
  '@tap': {
    key: '@click',
    value: str => {
      return str;
    },
  },
  ':nodes': {
    key: 'v-html',
  },
};

//替换入口方法
const templateConverter = function (ast) {
  for (let i = 0; i < ast.length; i++) {
    let node = ast[i];
    //检测到是html节点
    if (node.type === 'tag') {
      //进行标签替换
      if (tagConverterConfig[node.name]) {
        node.name = tagConverterConfig[node.name];
      }
      //进行属性替换
      let attrs = {};
      for (let k in node.attribs) {
        let target = attrConverterConfig[k];
        // 先看替换规则有没有
        if (target) {
          //分别替换属性名和属性值
          attrs[target['key']] = target['value'] ? target['value'](node.attribs[k]) : node.attribs[k];
        } else {
          attrs[k] = node.attribs[k];
        }
      }
      node.attribs = attrs;
    }
    //因为是树状结构，所以需要进行递归
    if (node.children) {
      templateConverter(node.children);
    }
  }
  return ast;
};

module.exports = templateConverter;
