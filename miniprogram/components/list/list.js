// components/list/list.js
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
    defaultCategoryList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    upper(e) {
      // console.log(e)
    },

    lower(e) {
      // console.log(e)
    },

    scroll(e) {
      // console.log(e)
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
      db.collection('inventoryNote').add({
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
    getCategoryList() {

      this.setData({
        defaultCategoryList: getApp().globalData.defaultCategoryList,
      })
      console.log('defaultCategoryList', this.data.defaultCategoryList)
    },
    control(e) {
      const { mode } = e.currentTarget.dataset
      switch (mode) {
        case 'reset':
          this.getCategoryList()
          break
      }

    },
  }
})
