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
    description: '',
    barCode: '',
    isEdit: false,
    _id: '',
    unit: 'kg',
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
      if (e.detail.value.categoryName.length === 0) {
        wx.vibrateShort()
        wx.showToast({
          title: '名字不能为空啊！',
          icon: 'none',
        })
        return
      }
      this.onAddCategory()
      this.formReset()
    },
    formReset: function () {
      this.setData({
        description: '',
        categoryName: '',
        barCode: '',
      })
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
        description: e.detail.value
      })
    },

    /**
     * unitPickerChange change触发函数
     */
    unitPickerChange: function (e) {
      console.log('unitIndex:', this.data.unitIndex)
      this.setData({
        unit: this.data.unitArray[e.detail.value]
      })
    },

    /**
     * 添加物品类型
     */
    onAddCategory: function (data) {
      const db = wx.cloud.database()
      const { _id, categoryName, unit, description, barCode, isEdit } = this.data;
      db.collection('inventoryCategory').add({
        data: {
          categoryName: categoryName,
          unit: unit,
          isDel: false,
          noteDate: new Date(),
          description: (description.length === 0) ? categoryName : description,
          barCode: barCode,
          id: isEdit ? _id : '',
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
        success: function (res) {
          console.log('scanCode success', res)
          myThis.setData({
            barCode: res.result
          })
        },
        fail: function (res) {
          // console.log('scanCode fail', res)
        },
        complete: function (res) {
          // console.log('scanCode complete', res)
        },
      })
    },
    inputNameBlur: function () {
      const db = wx.cloud.database()
      if (this.data.categoryName.length !== 0) {
        wx.cloud.callFunction({
          name: 'checkName',
          data: {
            mode: 'name',
            categoryName: this.data.categoryName
          },
        }).then(res => {
          console.log('inputNameBlur then', res.result.task)
          if (res.result.task.length !== 0) {
            wx.vibrateShort()
            wx.showToast({
              title: '名称已存在！',
              icon: 'none',
            })
            this.setData({
              isEdit: true,
              barCode: res.result.task[0].barCode,
              description: res.result.task[0].description,
              unit: res.result.task[0].unit,
              _id: res.result.task[0]._id,
              categoryName: res.result.task[0].categoryName,
            })
          }
        }).catch(err => {
          console.log('inputNameBlur catch', err)
        })
      }
    },
  }
})
