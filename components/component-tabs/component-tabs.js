// components/component-tabs/component-tabs.js
const app = getApp();
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
    userInfo: {},
    hasUserInfo: false,
    currentTab: 0,
    showModal:false
    // tabList: ['资讯', '攻略', '图集', '评论'] 暂时没用，等组件支持复用的时候再完善
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTab(event) {
      console.log(event);
      this.setData({
        currentTab: event.target.dataset.current
      })
    },
    swiperTab(event) {
      console.log(event.detail)
      this.setData({
        currentTab: event.detail.current
      })
    },
    submitComment: function(e) {
      if (e.detail.userInfo) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        console.log('用户信息', app.globalData.userInfo)
      } else {
        console.log('拒绝授权')
      }
    },
    showCommentModal(){
      this.setData({
        showModal: true
      })
    }
  }
})