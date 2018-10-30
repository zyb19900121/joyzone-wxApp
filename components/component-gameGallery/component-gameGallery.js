// components/component-gameGallery/component-gameGallery.js
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
      currentPage: 1
    },
    galleryList: [],
    galleryTotal: '',
    scrollAction: '',
    isTouchEnd: true, //解决多次触发的问题
  },

  ready() {
    this.getGalleryList(this.data.searchParams);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getGalleryList(searchParams) {
      searchParams.gameId = this.data.gameId
      app.userService.getGalleryList(searchParams)
        .then(res => {
          if (this.data.scrollAction == 'refresh') {
            this.setData({
              galleryList: res.list,
              galleryTotal: res.total,
              scrollAction: '',
            })
            wx.hideLoading();
          } else if (this.data.scrollAction == 'get_more') {
            let tempArr = [...this.data.galleryList, ...res.list];
            this.setData({
              galleryList: tempArr,
              galleryTotal: res.total,
              scrollAction: '',
            })
            wx.hideLoading();
          } else {
            this.setData({
              galleryList: res.list,
              galleryTotal: res.total,
              scrollAction: '',
            })
          }


        })
        .catch(res => {
          app.requestErrorHandle()
        })
    },
    handleTouchEnd() {
      this.setData({
        isTouchEnd: true
      })
    }
  }
})