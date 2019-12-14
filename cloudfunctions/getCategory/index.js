// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command;
  const $ = db.command.aggregate
  try {
    const self = this
    const categoryList = []
    const defaultCategoryList = []

    const promise = await db.collection('inventoryCategory')
      .where({
        isDel: false,
        _openid: wxContext.OPENID
      })
      .get()

    const response = []
    promise.data.forEach((item) => {
      if (!item.parentId) {
        response.push(item)
      }
    })


    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      code: 1,
      message: '获取成功',
      data: response
    }
  }
  catch (e) {
    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      code: -1,
      message: '获取失败'
    }
  }



}
 