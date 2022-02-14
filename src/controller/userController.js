// 控制器-处理不同业务
const { registerError, loginError, modifyPasswordError } = require('../constant/err.type');
const { createUser, getUserInfo, updateById } = require('../services/userService')
const { JWT_SECRET } = require('../config/config')
const jwt = require('jsonwebtoken');
const { toJSON } = require('koa/lib/response');
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body
    // // 1、获取数据
    // if (!user_name || !password) {
    //   console.error('用户名或密码为空', ctx.request.body);
    //   ctx.status = 400
    //   ctx.body = {
    //     code: '10001',
    //     message: '用户名或密码为空',
    //     result: ''
    //   }
    //   return
    // }
    // // 判断是否存在
    // if (await getUserInfo({ user_name })) {
    //   // 冲突
    //   ctx.status = 409
    //   ctx.body = {
    //     code: '10002',
    //     message: '用户名存在',
    //     result: ''
    //   }
    //   return
    // }
    try {
      // 2、操作数据库
      // 创建用户
      const res = await createUser(user_name, password)
      // 3、返回结果
      ctx.body = {
        code: 200,
        message: '用户注册成功！',
        result: {
          _id: res._id,
          user_name: res.user_name
        }
      }
    } catch (error) {
      console.log(error);
      ctx.app.emit('error', registerError, ctx)
    }

  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body
    try {
      const res = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res.toJSON(), JWT_SECRET, { expiresIn: '1d' })
        }
      }
    } catch (err) {
      console.error('登录失败', err);
      ctx.app.emit('error', loginError, ctx)
    }
  }

  async modifyPassword(ctx, next) {
    const id = ctx.state.user._id
    const password = ctx.request.body.password
    try {
      if (await updateById({ id, password })) {
        ctx.body = {
          code: 0,
          message: '修改密码成功',
          result: ''
        }
      }
    } catch (err) {
      console.error('修改密码失败', err);
      ctx.app.emit('error', modifyPasswordError)
    }
  }
}

module.exports = new UserController()