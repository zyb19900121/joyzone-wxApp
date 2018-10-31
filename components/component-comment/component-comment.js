// components/component-list/component-list.js
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
    upperThreshold: {
      type: Number,
      value: 50
    },
    lowerThreshold: {
      type: Number,
      value: 50
    },
    scrollX: {
      type: Boolean,
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
    baseUrl: app.globalData.baseUrl,
    commentParams: {
      gameId: '',
      pageSize: 12,
      currentPage: 1
    },
    commentList: [],
    commentTotal: '',
    scrollAction: '',
    scrollTop: '', //解决多次触发的问题
    // loadList: true //解决多次触发的问题
    isTouchEnd: true, //解决多次触发的问题
  },

  ready() {
    this.getCommentList(this.data.commentParams);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollhandle(e) {
      // if (e.detail.scrollTop == 0) {
      //   this.setData({
      //     loadList: true
      //   })
      // }
      // console.log(e.detail.scrollTop)
    },
    scrollToUpper() {
      if (!this.data.isTouchEnd) {
        return;
      }
      wx.showLoading({
        title: '刷新中...',
      })
      this.setData({
        commentParams: {
          pageSize: this.data.commentParams.pageSize,
          currentPage: 1
        },
        scrollAction: 'refresh',
        isTouchEnd: false
        // loadList: false
      })
      this.getCommentList(this.data.commentParams);
    },
    scrollToLower() {
      // if (!this.data.isTouchEnd) {
      //   return;
      // }
      if (this.data.commentList.length == this.data.commentTotal) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
        return false;
      }
      wx.showLoading({
        title: '加载中...',
      })
      this.setData({
        commentParams: {
          pageSize: this.data.commentParams.pageSize,
          currentPage: this.data.commentParams.currentPage + 1
        },
        scrollAction: 'get_more',
        isTouchEnd: false
        // loadList: false
      })
      this.getCommentList(this.data.commentParams);
    },
    getCommentList(commentParams) {
      commentParams.gameId = this.data.gameId
      app.userService.getCommentList(commentParams)
        .then(res => {
          if (this.data.scrollAction == 'refresh') {
            this.setData({
              commentList: res.list,
              commentTotal: res.total,
              scrollAction: '',
              // loadList: true
            })
            wx.hideLoading();
          } else if (this.data.scrollAction == 'get_more') {
            let tempArr = [...this.data.commentList, ...res.list];
            this.setData({
              commentList: tempArr,
              commentTotal: res.total,
              scrollAction: '',
              // loadList: true
            })
            wx.hideLoading();
          } else {
            this.setData({
              commentList: res.list,
              commentTotal: res.total,
              scrollAction: '',
              // loadList: true
            })
          }


          // wx.stopPullDownRefresh()
        })
        .catch(res => {
          // wx.stopPullDownRefresh()
          app.requestErrorHandle()
        })
    },
    handleTouchStart() {
      this.setData({
        isTouchEnd: true
      })
    },
    handleTouchEnd() {
      this.setData({
        isTouchEnd: true
      })
    }
  }
})