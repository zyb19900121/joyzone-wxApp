// components/component-list/component-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    upperTthreshold:{
      type:Number,
      value: 50
    },
    lowerTthreshold: {
      type: Number,
      vaule: 50
    },
    scrollX:{
      type:Boolean,
      value: false
    },
    scrollY: {
      type: Boolean,
      value: true
    },
    listData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollToUpper(){
      wx.showToast({
        title: 'Scroll To Upper',
      })
    },
    scrollToLower(){
      wx.showToast({
        title: 'Scroll To Lower',
      })
    }
  }
})