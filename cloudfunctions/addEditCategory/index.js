// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command;
  const $ = db.command.aggregate
  const {
    categoryName,
    unit,
    isDel,
    noteDate,
    description,
    barCode,
    _id,
    isEdit,
  } = event
  if (isEdit) {
    try {
      res = await db.collection('inventoryCategory')
        .where({
          _id: _id,
          _openid: wxContext.OPENID,
        }).update({
          data: {
            categoryName: categoryName,
            unit: unit,
            isDel: false,
            noteDate: noteDate,
            description: description,
            barCode: barCode,
          }
        })     
      return {
        res,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
      }
    } catch (e) {
      throw e
    }
  } else {
    try {
      res = await db.collection('inventoryCategory')
        .add({
          data: {
            categoryName: categoryName,
            unit: unit,
            isDel: false,
            noteDate: noteDate,
            description: description,
            barCode: barCode,
            _openid: wxContext.OPENID,
          }
        })
      return {
        res,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
      }
    } catch (e) {
      throw e
    }
  }
}