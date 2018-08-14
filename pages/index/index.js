const app = getApp();
Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    gameList: [],
  },
  onLoad: function() {
    // wx.startPullDownRefresh()
    this.getGameList();
    this.saveSystemInfo();

  },
  //保存访问用户的设备信息
  saveSystemInfo() {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        let systemInfo = {
          phone_brand: res.brand,
          phone_model: res.model,
          phone_system: res.system
        }
        app.userService.saveSystemInfo(systemInfo)
          .then(res => {
            console.log(res)
            // wx.stopPullDownRefresh()
          })
          .catch(res => {
            // wx.stopPullDownRefresh()
            app.requestErrorHandle()
          })
      },
      fail: function(err) {
        console.log(err);
      }
    })

  },
  //查询游戏列表
  getGameList() {
    app.userService.getGameList()
      .then(res => {
        console.log(res)
        // wx.stopPullDownRefresh()
        let list = res
        this.setData({
          gameList: list
        })
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        app.requestErrorHandle()
      })
  },
  goGameDetail(event) {
    let gameId = event.currentTarget.dataset.gameid
    let gameName = event.currentTarget.dataset.gamename
    wx.navigateTo({
      url: `../gameDetail/gameDetail?gameId=${gameId}`
    })
  }
  //下拉刷新
  // onPullDownRefresh() {
  //   console.log("下拉刷新");
  //   this.getdataList();
  // },
})