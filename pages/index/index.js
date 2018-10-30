const app = getApp();
const gameConfig = require('../../utils/gameConfig.js')
Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    gameList: [],
    gameTotal: '',
    inputShowed: false,
    platformIndex: 0,
    gameTypeIndex: 0,
    orderByIndex: 1,
    loading: false,
    spinShow: true,
    searchParams: {
      pageSize: 100,
      currentPage: 1,
      platform: '',
      gameType: '',
      orderBy: 'game_score DESC',
      keyword: '',
      isSold: true
    },
    platformList: gameConfig.platformList,
    gameTypeList: gameConfig.gameTypeList,
    gameOrderByList: gameConfig.gameOrderByList,
    scrollAction: ''
  },
  onLoad: function() {
    // wx.startPullDownRefresh()
    this.getGameList();
    this.saveSystemInfo();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //保存访问用户的设备信息
  saveSystemInfo() {
    wx.getSystemInfo({
      success: function(res) {
        let systemInfo = {
          phone_brand: res.brand,
          phone_model: res.model,
          phone_system: res.system
        }
        app.userService.saveSystemInfo(systemInfo)
          .then(res => {
            // wx.stopPullDownRefresh()
          })
          .catch(res => {
            // wx.stopPullDownRefresh()
            app.requestErrorHandle()
          })
      },
      fail: function(err) {
      }
    })

  },
  //查询游戏列表
  getGameList() {
    wx.showNavigationBarLoading();
    this.setData({
      loading: true
    })
    app.userService.getGameList(this.data.searchParams)
      .then(res => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()

        if (this.data.scrollAction == 'refresh') {
          this.setData({
            gameList: res.list,
            gameTotal: res.total,
            scrollAction: '',
            spinShow: false
          })
        } else {
          this.setData({
            gameList: [...this.data.gameList, ...res.list],
            gameTotal: res.total,
            spinShow: false
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
    this.setData({
      'searchParams.pageSize': 12,
      'searchParams.currentPage': 1,
      scrollAction: 'refresh'
    })
    this.getGameList();
  },
  onReachBottom() {
    if (this.data.gameList.length == this.data.gameTotal) {
      return false;
    }
    this.setData({
      'searchParams.pageSize': this.data.searchParams.pageSize,
      'searchParams.currentPage': this.data.searchParams.currentPage + 1
    })
    this.getGameList(this.data.searchParams);
  },
  showInput() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput() {
    this.setData({
      'searchParams.keyword': '',
      'searchParams.pageSize': 12,
      'searchParams.currentPage': 1,
      scrollAction: 'refresh',
      inputShowed: false
    });
    this.getGameList(this.data.searchParams);
  },
  clearInput() {
    this.setData({
      'searchParams.keyword': '',
      'searchParams.pageSize': 12,
      'searchParams.currentPage': 1,
      scrollAction: 'refresh'
    });
    this.getGameList(this.data.searchParams);
  },
  keywordInputTyping(e) {
    this.setData({
      'searchParams.keyword': e.detail.value,
      'searchParams.pageSize': 12,
      'searchParams.currentPage': 1,
      scrollAction: 'refresh'
    });
    this.getGameList(this.data.searchParams);
  },
  bindPlatformChange(e) {
    let platform = ''
    switch (e.detail.value) {
      case '0':
        platform = ""
        break;
      case '1':
        platform = "PlayStation4"
        break;
      case '2':
        platform = "Xbox One"
        break;
      case '3':
        platform = "Nintendo Switch"
        break;
      default:
        break;
    }
    this.setData({
      'searchParams.platform': platform,
      platformIndex: e.detail.value,
      'searchParams.currentPage': 1,
      scrollAction: 'refresh'
    })
    this.getGameList(this.data.searchParams);
  },
  bindGameTypeChange(e) {
    let gameType = ''
    switch (e.detail.value) {
      case '0':
        gameType = ""
        break;
      case '1':
        gameType = "动作"
        break;
      case '2':
        gameType = "冒险"
        break;
      case '3':
        gameType = "射击"
        break;
      case '4':
        gameType = "格斗"
        break;
      case '5':
        gameType = "音乐"
        break;
      case '6':
        gameType = "益智"
        break;
      case '7':
        gameType = "竞速"
        break;
      case '8':
        gameType = "角色扮演"
        break;
      case '9':
        gameType = "即时战略"
        break;
      case '10':
        gameType = "模拟"
        break;
      default:
        break;
    }
    this.setData({
      'searchParams.gameType': gameType,
      gameTypeIndex: e.detail.value,
      'searchParams.currentPage': 1,
      scrollAction: 'refresh'
    })
    this.getGameList(this.data.searchParams);
  },
  bindOrderByChange(e) {
    let orderBy = ''
    switch (e.detail.value) {
      case '0':
        orderBy = ""
        break;
      case '1':
        orderBy = "game_score DESC"
        break;
      case '2':
        orderBy = "game_score"
        break;
      case '3':
        orderBy = "sale_date DESC"
        break;
      case '4':
        orderBy = "sale_date"
        break;
      default:
        break;
    }
    this.setData({
      'searchParams.orderBy': orderBy,
      orderByIndex: e.detail.value,
      'searchParams.currentPage': 1,
      scrollAction: 'refresh'
    })
    this.getGameList(this.data.searchParams);
  }
})