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


  const countResult = await db.collection('inventoryCategory')
    .where({
      _openid: wxContext.OPENID,
      isDel: false,
      categoryName: event.categoryName,
    }).count()
  const total = countResult.total
  //计算分几次
  const batchTimes = Math.ceil(total / 100)
  //承载最终结果的数组
  const task = []

  for (let i = 0; i < batchTimes; i++) {
    const promise = await db.collection('inventoryCategory')
      .where({
        _openid: wxContext.OPENID,
        isDel: false,
        categoryName: event.categoryName,
      }).skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get()
      promise.data.forEach((item)=>{
        task.push(item)
      })
  }
  return {
    event,
    task,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}