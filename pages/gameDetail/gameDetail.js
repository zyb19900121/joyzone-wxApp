const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.baseUrl,
    gameDetail: '',
    gameTypeList: []
  },
  //根据ID获取游戏详细信息
  getGameDetail(gameId) {
    app.userService.getGameDetail(gameId)
      .then(res => {
        console.log(res)
        // wx.stopPullDownRefresh()
        this.setData({
          gameDetail: res,
          gameTypeList: res.game_type.split(',')
        })
        wx.setNavigationBarTitle({
          title: res.game_name
        })

      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        app.requestErrorHandle()
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('options', options)
    this.setData({

    })

    this.getGameDetail(options.gameId);
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