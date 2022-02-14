const Router = require('koa-router')
const { auth, hadAdminPermission } = require('../middleware/auth')

const router = new Router({ prefix: '/goods' })

/**
 * @description 上传商品
 */
router.post('/upload', auth, hadAdminPermission)

module.exports = router