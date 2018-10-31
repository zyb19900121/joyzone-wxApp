// components/component-gameNews/component-gameNews.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    baseUrl: app.globalData.baseUrl,

    searchParams: {
      gameId: '',
      pageSize: 12,
      currentPage: 1,
      platform: "",
      isBanner: ''
    },
    newsList: [],
    newsTotal: '',
    scrollAction: '',
    isTouchEnd: true, //解决多次触发的问题
  },

  ready() {
    this.getNewsList(this.data.searchParams);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getNewsList(searchParams) {
      searchParams.gameId = this.data.gameId
      app.userService.getNewsList(searchParams)
        .then(res => {
          if (this.data.scrollAction == 'refresh') {
          this.setData({
            newsList: res.list,
            newsTotal: res.total,
            scrollAction: '',
            // loadList: true
          })
          wx.hideLoading();
          } else if (this.data.scrollAction == 'get_more') {
            let tempArr = [...this.data.newsList, ...res.list];
            this.setData({
              newsList: tempArr,
              newsTotal: res.total,
              scrollAction: '',
            })
            wx.hideLoading();
          } else {
            this.setData({
              newsList: res.list,
              newsTotal: res.total,
              scrollAction: '',
            })
          }
          wx.stopPullDownRefresh()
        })
        .catch(res => {
          wx.stopPullDownRefresh()
          app.requestErrorHandle()
        })
    },
    getNewsDetail(event) {
      let newsId = event.currentTarget.dataset.newsid;
      wx.navigateTo({
        url: `../gameNewsDetail/gameNewsDetail?newsId=${newsId}`
      })

      if (event.currentTarget.dataset.viewscount >= 0) {
        let index = event.currentTarget.dataset.index;
        let count = event.currentTarget.dataset.viewscount + 1;
        this.setData({
          [`newsList[${index}].views_count`]: count
        })
      }
    },
    scrollhandle() {},
    scrollToUpper() {
      if (!this.data.isTouchEnd) {
        return;
      }
      wx.showLoading({
        title: '刷新中...',
      })
      this.setData({
        searchParams: {
          pageSize: this.data.searchParams.pageSize,
          currentPage: 1
        },
        scrollAction: 'refresh',
        isTouchEnd: false
      })
      this.getNewsList(this.data.searchParams);
    },
    scrollToLower() {
      // if (!this.data.isTouchEnd) {
      //   return;
      // }
      if (this.data.newsList.length == this.data.newsTotal) {
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
        searchParams: {
          pageSize: this.data.searchParams.pageSize,
          currentPage: this.data.searchParams.currentPage + 1
        },
        scrollAction: 'get_more',
        isTouchEnd: false
      })
      this.getNewsList(this.data.searchParams);
    },
    handleTouchStart() {
      console.log('handleTouchStart');
      this.setData({
        isTouchEnd: true
      })
    },
    handleTouchEnd() {
      console.log('handleTouchEnd');
      this.setData({
        isTouchEnd: true
      })
    },
  }
})