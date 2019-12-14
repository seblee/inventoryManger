// pages/index1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultCategoryList: []
  },
  upper(e) {
    // console.log(e)
  },

  lower(e) {
    // console.log(e)
  },

  scroll(e) {
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCategoryList()
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
    this.getCategoryList()
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

  onAdd: function () {
    const db = wx.cloud.database()
    db.collection('inventoryCategory').add({
      data: {
        name: '润滑油',
        unit: '桶',
        isDel: false,
        noteDate: new Date(),
      },

      success: res => {
        wx.showToast({
          title: '增加物品名称成功',
          icon: 'success',
          image: '',
          duration: 1500,
        })
        console.log('onAdd success', res)
      },
      fail: err => {
        console.log('onAdd fail', err)
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          image: '',
          duration: 1500,
        })
      }
    })
  },

  onAddRecord: function () {
    const db = wx.cloud.database()
    db.collection('inventoryCategory').add({
      data: {
        categoryId: '',//类别ID
        description: '',//备注描述
        barCode: '',//条码
        count: 0,
        isInCome: true,
        isDel: false,
        noteDate: new Date(),
      },

      success: res => {
        wx.showToast({
          title: '增加物品名称成功',
          icon: 'success',
          image: '',
          duration: 1500,
        })
        console.log('onAddRecord success', res)
      },
      fail: err => {
        console.log('onAddRecord fail', err)
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          image: '',
          duration: 1500,
        })
      }
    })

  },
  getCategoryList() {

    this.setData({
      defaultCategoryList: getApp().globalData.defaultCategoryList,
    })
    console.log('defaultCategoryList', this.data.defaultCategoryList)
  },
  control(e) {
    const { mode } = e.currentTarget.dataset
    switch (mode) {
      case 'reset': this.getCategoryList()       
        break
    }

  },


})