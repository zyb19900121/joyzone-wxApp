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
      value: 0
    },
    lowerThreshold: {
      type: Number,
      value: 0
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
          console.log(res)
          // if (this.data.scrollAction == 'refresh') {
          this.setData({
            newsList: res.list,
            newsTotal: res.total,
            scrollAction: '',
            // loadList: true
          })
          // wx.hideLoading();
          // } else if (this.data.scrollAction == 'get_more') {
          //   let tempArr = [...this.data.commentList, ...res.list];
          //   this.setData({
          //     commentList: tempArr,
          //     commentTotal: res.total,
          //     scrollAction: '',
          //     // loadList: true
          //   })
          //   wx.hideLoading();
          // } else {
          //   this.setData({
          //     commentList: res.list,
          //     commentTotal: res.total,
          //     scrollAction: '',
          //     // loadList: true
          //   })
          // }


          // wx.stopPullDownRefresh()
        })
        .catch(res => {
          // wx.stopPullDownRefresh()
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
    }
  }
})