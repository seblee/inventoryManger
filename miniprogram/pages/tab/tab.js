// pages/tab/tab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'addrecord',
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '新标题',
      nbLoading: true,
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })

    this.getCategory()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goTo(event) {
    const { active } = event.currentTarget.dataset
    this.setData({
      active,
      scale: active,
    })
    wx.vibrateShort()
    const self = this
    setTimeout(() => {
      self.setData({
        scale: null,
      })
    }, 200)
  },
  showIconName(event) {
    const { active } = event.currentTarget.dataset

    wx.vibrateShort()
    if (active === 'addcatagory') {
      wx.showToast({
        title: mapFace[this.data.activeRightIcon],
        icon: 'none',
      })
    }
    if (active === 'list') {
      wx.showToast({
        title: '( •̀ᄇ• ́)ﻭ✧来记笔账 ❤️',
        icon: 'none',
      })
    }
    if (active === 'addrecord') {
      wx.showToast({
        title: '要养成理财记账习惯哦',
        icon: 'none',
      })
    }
  },


  getCategory() {
    const defaultCategoryList = []
    wx.cloud.callFunction({
      name: 'getCategory',
      data: {},
      success: res => {
        console.log('getCategory sucess', res)
        if (res.result.code === 1) {
          const resultList = res.result.data
          resultList.forEach((item) => {
            defaultCategoryList.push(item)
          })
          getApp().globalData.defaultCategoryList = defaultCategoryList
           const list = this.selectComponent('#list')
          list.getCategoryList()
        }
      },
      fail: err => {
        console.log('getCategory fail', err)
      }
    })
  }

})