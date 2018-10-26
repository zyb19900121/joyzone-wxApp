// pages/gameCalendar/gameCalendar.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    inputShowed: false,
    actions: [{
      name: '喜欢',
      color: '#fff',
      fontsize: '20',
      width: 100,
      icon: 'like',
      background: '#ed3f14'
    }],

    spinShow: true,
    searchParams: {
      pageSize: 99999,
      currentPage: 1,
      platform: '',
      gameType: '',
      isSold: false,
      orderBy: 'sale_date',
      keyword: ''
    },

    gameList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getGameList(this.data.searchParams)
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

  //页面滚动执行方式
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },

  //查询游戏列表
  getGameList() {
    // wx.showLoading({
    //   title: '加载中...',
    // })
    app.userService.getGameList(this.data.searchParams)
      .then(res => {
        this.initGameList(res.list);
      })
      .catch(err => {
        console.log(err)
        app.requestErrorHandle()
      })
  },

  initGameList(list) {

    let tempArr = new Array();
    let date = new String();
    let isExist = new Boolean();

    for (let game of list) {
      isExist = false;
      if (game.sale_date) {
        date = game.sale_date.substring(0, 7);
      } else {
        date = 'TBA'
      }

      for (let group of tempArr) {
        if (group.key == date) {
          isExist = true;
          game.key = group.key;
          group.list.push(game)
        }
      }

      if (!isExist) {
        let tempGroup = {
          'key': date,
          'list': []
        }
        game.key = date;
        tempGroup.list.push(game);
        tempArr.push(tempGroup);
      }
    }

    if (tempArr.length > 0 && tempArr[0].key == 'TBA') {
      tempArr.push(tempArr[0]);
      tempArr.splice(0, 1);
    }

    this.setData({
      spinShow: false,
      gameList: tempArr
    })
  },

  updateGameDetail(newsId, firstIndex, secondIndex) {
    app.userService.updateGameDetail(newsId, this.data.newsDetail)
      .then(res => {
        this.setData({
          [`gameList[${firstIndex}].list[${secondIndex}].like_count`]: res.likeCount
        })
      })
      .catch(res => {
        app.requestErrorHandle()
      })
  },

  handleLikeButton(event) {

    event.currentTarget.dataset.likecount += 1;

    let firstIndex = 0; //第一层数组的下标
    let secondIndex = event.currentTarget.dataset.index; //第二层数组的下标
    for (let index in this.data.gameList) {
      if (event.currentTarget.dataset.key == this.data.gameList[index].key) {
        firstIndex = index;
        break;
      }
    }

    this.updateGameDetail(event.currentTarget.dataset.gameid, firstIndex, secondIndex);
  },

  showInput() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput() {
    this.setData({
      'searchParams.keyword': '',
      'searchParams.pageSize': 18,
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
})