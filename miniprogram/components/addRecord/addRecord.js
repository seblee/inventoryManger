// components/addRecord/addRecord.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    categoryName: '',
    barCode: '',
    count: 0,
    description: '',
    defaultCategoryList: [],
    pikerIndex: 0,
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * form submit 函数
     */
    formSubmit: function (e) {
      if (this.data.count === 0) {
        wx.vibrateShort()
        wx.showToast({
          title: '数量不能为零啊，😛！',
          icon: 'none',
        })
        return
      }
      this.onAddRecord()
    },

    /**
     * form submit 函数
     */
    formReset: function () {
      this.setData({
        categoryName: '',
        barCode: '',
        count: 0,
        description: '',
        pikerIndex: 0,
      })
    },

    /**
     * bindPickerCategory 函数
     */
    bindPickerCategory: function (e) {
      console.log('bindPickerCategory，携带值为', e.detail.value)
      this.setData({
        pikerIndex: e.detail.value,
        categoryName: this.data.defaultCategoryList[e.detail.value].name,
        barCode: this.data.defaultCategoryList[e.detail.value].barCode,
      })
    },
    /**
     * input 输入触发函数
     */
    inputCount: function (e) {
      this.setData({
        count:( e.detail.value)
      })
    },
    getCategoryList() {
      this.setData({
        defaultCategoryList: getApp().globalData.defaultCategoryList,
      })

      if (this.data.defaultCategoryList.length !== 0) {
        this.setNameDatas()
      }
    },
    setNameDatas: function () {
      this.setData({
        categoryName: this.data.defaultCategoryList[this.data.pikerIndex].categoryName,
        barCode: this.data.defaultCategoryList[this.data.pikerIndex].barCode,
      })
    },
    onAddRecord: function () {
      const db = wx.cloud.database()
      db.collection('inventoryNote').add({
        data: {
          categoryId: this.data.defaultCategoryList[this.data.pikerIndex]._id,//类别ID
          description: this.data.description,//备注描述
          barCode: this.data.barCode,//条码
          count:Number(this.data.count),
          isInCome: true,
          isDel: false,
          noteDate: new Date(),
        },
        success: res => {
          wx.showToast({
            title: '增加记录成功',
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
  }
})
