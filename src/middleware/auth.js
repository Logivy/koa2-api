const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')
const { tokenExpiredError, invalidToken, hasNotAdminPermissionError } = require('../constant/err.type')

// 判断token权限
const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
    await next()
  } catch (error) {
    switch (error.name) {
      // 过期
      case 'TokenExpiredError':
        console.error('token已过期', error);
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效token', error);
        return ctx.app.emit('error', invalidToken, ctx)
      default:
        break;
    }
  }
}
// 判断管理员权限
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user

  if (!is_admin) {
    console.error('该用户没有管理员权限！', ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermissionError, ctx)
  }
  await next()
}
module.exports = {
  auth,
  hadAdminPermission
}