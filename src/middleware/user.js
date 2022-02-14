/**
 * 中间件
 */
const {
  userAlreadyExisted,
  userFormateError,
  registerError,
  loginError,
  userNotExisted,
  invalidPassword } = require('../constant/err.type');
const { getUserInfo } = require('../services/userService')
const bcrypt = require('bcrypt')
// 格式校验
const userValidator = async (ctx, next) => {
  // 1、获取数据
  const { user_name, password } = ctx.request.body
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}
// 判断用户
const verifyUser = async (ctx, next) => {
  // 判断是否存在
  const { user_name } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
    await next()
  } catch (error) {
    console.error('获取用户信息错误', error);
    ctx.app.emit('error', registerError, ctx)
    return
  }
}
// 登录判断
const verifyLogin = async (ctx, next) => {
  // 判断用户是否存在
  const { user_name, password } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (!res) {
      console.error(`用户不存在：${user_name}`);
      ctx.app.emit('error', userNotExisted, ctx)
      return
    }
    if (!bcrypt.compareSync(password, res.password)) {
      console.error(`密码错误`);
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
    await next()
  } catch (error) {
    console.error(error);
    return ctx.app.emit('error', loginError, ctx)
  }
}
// 加密
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)

  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
}