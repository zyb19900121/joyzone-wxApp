// components/component-tabs/component-tabs.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gameId: {
      type: Number,
      value: null
    },
    gameDetail:{
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {}, //用户信息
    hasUserInfo: false, //是否有用户信息
    currentTab: 0, //当前tab页
    showModal: false, //发表评论弹窗
    commentContent: ''
    // tabList: ['资讯', '攻略', '图集', '评论'] 暂时没用，等组件支持复用的时候再完善

  },

  /**
   * 组件的生命周期
   */

  // created: function() {}, // 组件在内存中创建完毕执行
  // attached: function() {}, // 组件挂载之前执行
  // ready: function() {}, // 组件挂载后执行
  // detached: function() {}, // 组件移除执行
  // moved: function() {}, // 组件移动的时候执行

  /**
   * 组件的方法列表
   */
  methods: {
    clickTab(event) {
      this.setData({
        currentTab: event.target.dataset.current
      })
    },
    swiperTab(event) {
      this.setData({
        currentTab: event.detail.current
      })
    },
    showCommentModal(e) {
      if (e.detail.userInfo) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
      } else {
      }
      this.setData({
        showModal: true
      })
    },
    bindCommentInput(e) {
      this.setData({
        commentContent: e.detail.value
      })
    },
    modalCancel() {
      this.setData({
        showModal: false
      })
    },
    modalConfirm(e) {
      if (!this.data.commentContent) {
        wx.showToast({
          title: '请填写评论内容',
          icon: 'none'
        })
        return false;
      }
      if (this.data.hasUserInfo) {
        let commentData = {
          username: this.data.userInfo.nickName,
          user_avatar: this.data.userInfo.avatarUrl,
          comment_content: this.data.commentContent,
          game_id: this.data.gameId
        }
        this.saveComment(commentData);
      } else {
        let commentData = {
          username: '匿名',
          user_avatar: '/public/system/default_avatar.jpg',
          comment_content: this.data.commentContent,
          game_id: this.data.gameId
        }
        this.saveComment(commentData);
      }

      this.setData({
        commentContent: '',
        showModal: false
      })
    },

    //发表评论
    saveComment(data) {
      app.userService.saveComment(data)
        .then(res => {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })

          let commentParams = {
            gameId: this.data.gameId,
            pageSize: 12,
            currentPage: 1
          }

          this.selectComponent("#componentComment").getCommentList(commentParams);
          // wx.stopPullDownRefresh()
        })
        .catch(res => {
          // wx.stopPullDownRefresh()
          app.requestErrorHandle()
        })
    }
  }
})