## 初始化

```shell
npm init -y
```

## 创建基本 server 服务器

### 1、安装 koa

```shell
npm i koa
```

### 2、入口文件

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

## 项目优化

### 1、自重启服务

```shell
npm i nodemon
```

脚本

```javascript
 "scripts": {
    "serve": "nodemon src/main.js",
  },
```

### 2、配置文件

```shell
npm dotenv -S
```

`.env`文件

```js
# .env file
#
# Add environment-specific variables on new lines in the form of NAME=VALUE
#
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

`/config/config.js`文件

```js
const dotenv = require('dotenv')

// Loads .env file contents into process.env.
dotenv.config()

module.exports = process.env
```

## 路由

### 1、安装

```shell
npm i koa-router
```

步骤：

- 导入
- 实例化
- 编写路由
- 注册中间件

### 2、路由模块化

src/router/user 目录,userRoute.js

```js
const Router = require('koa-router')
// 前缀 /users
const router = new Router({ prefix: '/users' })
// GET /users/
router.get('/', (ctx, next) => {
  ctx.body = 'Hello Users'
})

module.exports = router
```

## 目录结构优化

### 1、http 服务与 app 服务拆分

src/app/index.js

```js
// 业务相关
const Koa = require('koa')
const app = new Koa()

const userRouter = require('../router/user/userRoute')

app.use(userRouter.routes())

module.exports = app
```

### 2、路由与控制器拆分

controller/userController.js

```js
// 控制器-处理不同业务
class UserController {
  async register(ctx, next) {
    ctx.body = '用户注册成功！'
  }
  async login(ctx, next) {
    ctx.body = '用户登录成功！'
  }
}

module.exports = new UserController()
```

route/user/userRoute.js

```js
const Router = require('koa-router')
const { register, login } = require('../../controller/userController')
// 前缀 /users
const router = new Router({ prefix: '/users' })
// GET /users/
// router.get('/',)
router.post('/register', register) //控制器与路由拆分
router.post('/login', login)

module.exports = router
```

## 解析 body

### 1、安装 koa-body 中间件

```shell
npm i koa-body
```

### 2、注册中间件

```js
const koaBody = require('koa-body')
app.use(koaBody())
```

### 3、解析请求数据

```js
// 控制器-处理不同业务
const { createUser } = require('../services/userService')

class UserController {
  async register(ctx, next) {
    // 1、获取数据
    const { user_name, password } = ctx.request.body
    // 2、操作数据库
    const res = await createUser(user_name, password)
    // 3、返回结果
    ctx.body = ctx.request.body
  }
  async login(ctx, next) {
    ctx.body = '用户登录成功！'
  }
}

module.exports = new UserController()
```

### 4、拆分 service 层

services/userService.js 进行数据库的处理

```js
class UserService {
  async createUser(username, password) {
    // 写入数据库
    return '写入数据库成功！'
  }
}

// 在控制器中使用
module.exports = new UserService()
```

### 

### 自定义中间件

## 加密

`bcrypt.js`

## 用户认证

`jsonwebtoken`

`jwt`(Json Web Token)基于token，由三部分组成：

- header
- playload
- signature



删除接口

`patch` 方法，修改部分信息，非幂等。