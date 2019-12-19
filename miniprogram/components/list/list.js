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
      const _ = db.command;
      const $ = db.command.aggregate
      //get count...
      const categoryResult = db.collection('inventoryNote')
        .aggregate()
        // .project({
        //   _id: 0,  // 指定去除 _id 字段
        //   _openid: 1,
        //   barCode: 1,
        //   categoryId: 1,
        //   count: 1,
        //   isDel: 1,
        //   isInCome: 1,
        // })
        // .match({
        //   isDel: false,
        //   _openid: 'owS4l0Znjyc6A7HBniDyA_X09hFE',
        //    categoryId: '01ace4015df9d861047c3d581f029a8c',
        // })
        .group({
          _id: {
            categoryId: '$categoryId',
            // isInCome: '$isInCome',
          },
          totalSum: $.sum('$count'),                
        })
        .end()
      console.log('categoryResult',categoryResult)
    },
    
    getCategoryList() {
      this.setData({
        defaultCategoryList: getApp().globalData.defaultCategoryList,
      }) 
    },
    control(e) {
      const { mode } = e.currentTarget.dataset
      switch (mode) {
        case 'reset':
          this.getCategoryList()
          break
      }

    },
    getAggregate() {
      const defaultCategoryList = []
      wx.cloud.callFunction({
        name: 'getCategory',
        data: {
          mode: 'getAggregate'
        },
        success: res => {
          console.log('getCategory result', res)
          if (res.result.code === 1) {
            const resultList = res.result.data
            resultList.forEach((item) => {
              defaultCategoryList.push(item)
            })
            getApp().globalData.defaultCategoryList = defaultCategoryList
            const list = this.selectComponent('#list')
            const addrecord = this.selectComponent('#addrecord')
            list.getCategoryList()
            addrecord.getCategoryList()
            console.log('getCategory CategoryList', defaultCategoryList)
          }
        },
        fail: err => {
          console.log('getCategory fail', err)
        }
      })
    }
  }
})
