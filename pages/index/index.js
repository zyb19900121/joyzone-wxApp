const app = getApp();
Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    gameList: [],
    gameTotal: '',
    searchParams: {
      pageSize: 18,
      currentPage: 1,
      platform: '',
      gameType: ''
    },
    scrollAction: ''
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
    wx.showNavigationBarLoading();
    app.userService.getGameList(this.data.searchParams)
      .then(res => {
        console.log(res)
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()

        if (this.data.scrollAction == 'refresh') {
          this.setData({
            gameList: res.list,
            gameTotal: res.total,
            scrollAction: ''
          })
        } else {
          this.setData({
            gameList: [...this.data.gameList, ...res.list],
            gameTotal: res.total
          })
        }
      })
      .catch(res => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
        app.requestErrorHandle()
      })
  },
  goGameDetail(event) {
    app.globalData.gameId = event.currentTarget.dataset.gameid;
    let gameId = event.currentTarget.dataset.gameid
    let gameName = event.currentTarget.dataset.gamename
    wx.navigateTo({
      url: `../gameDetail/gameDetail?gameId=${gameId}`
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.setData({
      searchParams: {
        pageSize: 18,
        currentPage: 1,
        platform: '',
        gameType: ''
      },
      scrollAction: 'refresh'
    })
    this.getGameList();
  },
  onReachBottom() {
    if (this.data.gameList.length == this.data.gameTotal) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return false;
    }
    this.setData({
      searchParams: {
        pageSize: this.data.searchParams.pageSize,
        currentPage: this.data.searchParams.currentPage + 1
      }
    })
    this.getGameList(this.data.searchParams);
  }
})