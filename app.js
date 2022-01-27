const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
// var timeout = require('connect-timeout')
const controller = require('./routes/controller');
const page = require('./routes/page');

const path = require("path")

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/static'));
// app.use(timeout('60s'))
app.use(views(path.join(__dirname,"views/"),{extension:'html'}))

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
});

// routes
app.use(page.routes(), page.allowedMethods());
app.use(controller.routes(), controller.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.log('异常捕捉======================', err, ctx);
});

module.exports = app;
