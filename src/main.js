const Koa = require('koa')

const app = new Koa()
const port = 3000;

app.use(async (ctx, next) => {
  ctx.body = "hello world"
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
})