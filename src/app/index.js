const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body');

const userRouter = require('../router/users');
const goodRouter = require('../router/goods')
const errorHandler = require('./errorHandler');

app.use(koaBody());
app.use(userRouter.routes())
app.use(goodRouter.routes())
// 错误处理
app.on('error', errorHandler)

module.exports = app