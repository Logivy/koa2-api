## 初始化

```shell
npm init -y
```

## 安装 koa

```shell
npm i koa
```

## 创建 app

`src/main.js`

```javascript
const Koa = require('koa')

const app = new Koa()
const port = 3000

app.use(async (ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})
```
