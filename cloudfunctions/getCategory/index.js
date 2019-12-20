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
  const { mode } = event

  if (mode === 'getCategory') {
    try {
      const self = this
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
  else if (mode === 'getAggregate') {
    const aggregateResult = await db.collection('inventoryNote')
      .aggregate()
      .project({
        _id: 0,  // 指定去除 _id 字段
        _openid: 1,
        barCode: 1,
        categoryId: 1,
        count: 1,
        isDel: 1,
        isInCome: 1,
      })
      .match({
        isDel: false,
        _openid: 'owS4l0eJ9NtNF9Xl8QExspW94CS8',
        // categoryId: '72527ac65df9d8cd047d85f224f828d3',
      })
      .group({
        _id: {
          categoryId: '$categoryId',
        },
        totalSum: $.sum('$count'),
      })
      .replaceRoot({
        newRoot: $.mergeObjects(['$_id', '$$ROOT'])
      })
      .project({
        _id: 0
      })
      .lookup({
        from: 'inventoryCategory',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'totalList'
      })
      .replaceRoot({
        newRoot: $.mergeObjects([$.arrayElemAt(['$totalList', 0]), '$$ROOT'])
      })
      .project({
        totalList: 0,
        noteDate: 0,
        categoryId: 0
      })
      .end()
    return aggregateResult
  }
}
