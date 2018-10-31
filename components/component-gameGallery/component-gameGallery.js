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
      currentPage: 1
    },
    galleryList: [],
    galleryTotal: '',
    scrollAction: '',
    isTouchEnd: true, //解决多次触发的问题,
    imgList: [] //用于preview
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
            console.log(this.data.galleryList)
            wx.hideLoading();
          } else {
            this.setData({
              galleryList: res.list,
              galleryTotal: res.total,
              scrollAction: '',
            })
          }
          this.initImgUrl();
        })
        .catch(res => {
          app.requestErrorHandle()
        })
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
      this.getGalleryList(this.data.searchParams);
    },
    scrollToLower() {
      // if (!this.data.isTouchEnd) {
      //   return;
      // }
      if (this.data.galleryList.length == this.data.galleryTotal) {
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
        // loadList: false
      })
      this.getGalleryList(this.data.searchParams);
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
    },
    initImgUrl() {
      this.data.imgList = [];
      for (let item of this.data.galleryList) {
        let realSrc = `${this.data.baseUrl}${item.image_src }`;
        this.data.imgList.push(realSrc)
      }
    },
    handlePreviewImage(event) {
      app.globalData.previewOnshow = true;
      let index = event.currentTarget.dataset.index;
      wx.previewImage({
        current: this.data.imgList[index], // 当前显示图片的http链接
        urls: this.data.imgList // 需要预览的图片http链接列表
      })
    }
  }
})