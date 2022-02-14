const User = require('../model/user')
// const getNextSequence = require('../db/dbHelper')
class UserService {
  async createUser(user_name, password) {
    const user = new User({ user_name, password, is_admin: false })
    const res = await user.save()
    return res
  }

  async getUserInfo({ _id, user_name, password, is_admin }) {
    const whereOpt = {}
    arguments[0] && Object.assign(whereOpt, arguments[0])
    const res = await User.findOne(whereOpt, ['_id', 'user_name', 'password', 'is_admin'])
    return res ? res : false
  }

  async updateById({ _id, user_name, password, is_admin }) {
    const whereOpt = { _id }
    const newUser = {}
    const item = arguments[0]
    item && Object.assign(newUser, item)
    const res = await User.updateOne({ whereOpt }, newUser)
    return res.acknowledged
  }
}

// 在控制器中使用
module.exports = new UserService()