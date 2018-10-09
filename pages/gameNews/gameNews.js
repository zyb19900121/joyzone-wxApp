// pages/gameNews/gameNews.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.baseUrl,
    newsSwiperList: [
      //   {
      //   id: '1',
      //   title: "《精灵宝可梦 Let's Go 皮卡丘/伊布》公布！中文版同步",
      //   img: 'http://joyzone.xyz:9090/image/news1.jpeg'
      // }, {
      //   id: '2',
      //   title: "《最后生还者2》新消息：开发进度约50% 明年E3将进行展示",
      //   img: 'http://joyzone.xyz:9090/image/news2.jpeg'
      // }, {
      //   id: '3',
      //   title: "《荒野大镖客2》最小安装容量105GB 在线模式最大支持32人",
      //   img: 'http://joyzone.xyz:9090/image/news3.jpeg'
      // }
    ],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

    upperThreshold: -50,
    lowerThreshold: -50,
    scrollX: false,
    scrollY: true,

    searchParams: {
      pageSize: 16,
      currentPage: 1,
      platform: "",
      isBanner: false
    },
    scrollAction: '',
    newsList: null,
    newsTotal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNewsList(this.data.searchParams);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  changeProperty: function(e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  getNewsList(searchParams) {
    wx.showLoading({
      title: '加载中...',
    })

    app.userService.getNewsList({
        pageSize: 16,
        currentPage: 1,
        isBanner: true
      })
      .then(res => {
        console.log(res)
        this.setData({
          newsSwiperList: res.list,
          // newsTotal: res.total,
        })
      })
      .catch(res => {
        app.requestErrorHandle()
      })

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
        wx.hideLoading();
        // } 
        // else if (this.data.scrollAction == 'get_more') {
        //   let tempArr = [...this.data.commentList, ...res.list];
        //   this.setData({
        //     commentList: tempArr,
        //     commentTotal: res.total,
        //     scrollAction: '',
        //     loadList: true
        //   })
        //   wx.hideLoading();
        // } else {
        //   this.setData({
        //     commentList: res.list,
        //     commentTotal: res.total,
        //     scrollAction: '',
        //     loadList: true
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
    console.log(newsId);
    wx.navigateTo({
      url: `../gameNewsDetail/gameNewsDetail?newsId=${newsId}`
    })
  }
})