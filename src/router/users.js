const Router = require('koa-router')
const { register, login, modifyPassword } = require('../controller/userController')
const { auth } = require('../middleware/auth')
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user')

// 前缀 /users
const router = new Router({ prefix: '/users' })
// GET /users/
/**
 * @method post
 * @description 注册接口
 */
router.post('/register', userValidator, verifyUser, cryptPassword, register)  //控制器与路由拆分
/**
 * @method post
 * @description 登录接口
 */
router.post('/login', userValidator, verifyLogin, login)

/**
 * @method patch
 * @description 修改密码
 */
router.patch('/', auth, cryptPassword, modifyPassword)

module.exports = router
