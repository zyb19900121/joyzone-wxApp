// pages/gameNewsDetail/gameNewsDetail.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   * @import "/wxParse/wxParse.wxss";
   * 
   */
  data: {
    newsId: '',
    newsContent: '',
    newsDetail: {}
  },

  //根据ID获取游戏详细信息
  getNewsDetail(newsId) {
    console.log('newsis!!',newsId)
    wx.showLoading({
      title: '加载中...',
    })
    app.userService.getNewsDetail(newsId)
      .then(res => {

        // this.setData({
        //   newsDetail: res
        // })
        console.log('newsDetail', res)
        WxParse.wxParse('newsContent', 'html', `<div class="ql-editor">${res.news_content}</div>`, this, 20);
        wx.hideLoading();

        this.data.newsDetail.newsTitle = res.news_title;
        this.data.newsDetail.newsContent = res.news_content;
        this.data.newsDetail.newsThumbnail = res.news_thumbnail;
        this.data.newsDetail.platform = res.platform;
        this.data.newsDetail.gameId = res.game_id;
        this.data.newsDetail.isBanner = res.is_banner;
        this.data.newsDetail.viewsCount = res.views_count + 1;
        console.log('newsDetail', this.data.newsDetail)
        this.updateNewsDetail(this.data.newsId);
      })
      .catch(res => {
        app.requestErrorHandle()
      })
  },

  updateNewsDetail(newsId) {
    console.log(this.data.newsDetail.views_count)
    app.userService.updateNewsDetail(newsId, this.data.newsDetail)
      .then(res => {
        console.log('update', res)
      })
      .catch(res => {
        app.requestErrorHandle()
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('options',options)
    this.setData({
      newsId: options.newsId
    })

    this.getNewsDetail(this.data.newsId)
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

  }
})