//app.js

App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cashbook-sw74a',
        traceUser: true,
      })
    }


    wx.setTopBarText({
      text: '库存',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.getSystemInfo({
      success: function (res) {
        // console.log('getSystemInfo', res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.getCategory()
    // this.globalData = {}
    console.log('this.globalData', this.globalData)

  },
  globalData: {
    categoryList: [],
    defaultCategoryList: []
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        getApp().globalData.openid = res.result.openid
        console.log('[云函数] [login] user openid: ', getApp().globalData.openid)
        this.getCategory()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  getCategory() {
    const defaultCategoryList = []
    wx.cloud.callFunction({
      name: 'getCategory',
      data: {},
      success: res => {
        console.log('getCategory sucess', res)
        if (res.result.code === 1) {
          const list = res.result.data
          list.forEach((item) => {
            defaultCategoryList.push(item)
          })
          this.globalData.defaultCategoryList = defaultCategoryList 
        }
      },
      fail: err => {
        console.log('getCategory fail', err)
      }
    })


  }
})
