// components/addCategory/addCategory.js
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
    unitArray: ['kg', '个', '包', '桶', 'L'],
    unitIndex: 0,
    categoryName: '',
    discription: '',
    barCode: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * form submit 函数
     */
    formSubmit: function (e) {
      if (this.data.categoryName.length === 0) {
        wx.vibrateShort()
        wx.showToast({
          title: '名字不能为空啊！',
          icon: 'none',
        })
        return
      }
      this.onAddCategory()
    },

    /**
     * input 输入触发函数
     */
    inputName: function (e) {
      this.setData({
        categoryName: e.detail.value
      })
    },

    /**
     * input 输入触发函数
     */
    inputBarCode: function (e) {
      this.setData({
        barCode: e.detail.value
      })
    },

    /**
    * input 输入触发函数
    */
    inputDescription: function (e) {
      this.setData({
        discription: e.detail.value
      })
    },

    /**
     * 添加物品类型
     */
    onAddCategory: function () {
      const db = wx.cloud.database()
      db.collection('inventoryCategory').add({
        data: {
          name: this.data.categoryName,
          unit: this.data.unitArray[this.data.unitIndex],
          isDel: false,
          noteDate: new Date(),
          discription: this.data.discription,
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
    scanCode: function () {
      var myThis = this;
      wx.scanCode({
        onlyFromCamera: true,
        scanType: ['barCode'],
        success  :function(res){
          console.log('scanCode success', res)
          myThis.setData({
            barCode: res.result
          })
        },
        fail  :function(res){
          // console.log('scanCode fail', res)
        },
        complete  :function(res){
          // console.log('scanCode complete', res)
        },
      })
    },
  }
})
