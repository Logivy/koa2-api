const { unSupportFileTypeError, fileUploadError } = require("../constant/err.type")
const path = require('path')
class GoodController {
  async upload(ctx, next) {
    const { file } = ctx.request.files
    const fileTypes = ['image/jpeg', 'image/png']

    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit('error', unSupportFileTypeError, ctx)
      }
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(file.path)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }
}