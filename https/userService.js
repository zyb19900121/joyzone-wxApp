import request from './request.js'
import {
  baseUrl
} from './config.js'
class UserService {
  constructor() {
    // this._baseUrl = 'http://127.0.0.1:3000'
    this._baseUrl = baseUrl
    this._defaultHeader = {
      'Content-Type': 'application/json'
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 保存访问用户的设备信息
   */
  saveSystemInfo(data) {
    return this._request.postRequest(this._baseUrl + '/api/log', data, this._defaultHeader)
      .then(res => res.data)
  }

  /**
   * 获取所有游戏列表
   */
  getGameList(data) {
    return this._request.getRequest(this._baseUrl + '/api/game', data, this._defaultHeader)
      .then(res => res.data)
  }

  /**
   * 根据ID获取游戏详情
   */
  getGameDetail(gameId) {
    let data = ''
    return this._request.getRequest(`${this._baseUrl}/api/game/${gameId}`, data, this._defaultHeader)
      .then(res => res.data)
  }

  /**
   * 更新游戏详情（游戏喜欢的数量）
   */
  updateGameDetail(gameId) {
    return this._request.putRequest(`${this._baseUrl}/api/game/${gameId}`, '', this._defaultHeader)
      .then(res => res.data)
  }

  /**
   * 获取资讯列表
   */
  getNewsList(data) {
    return this._request.getRequest(this._baseUrl + '/api/gameNews', data, this._defaultHeader)
      .then(res => res.data)
  }

  /**
   * 获取资讯详情
   */
  getNewsDetail(newsId) {
    let data = ''
    return this._request.getRequest(`${this._baseUrl}/api/gameNews/${newsId}`, data, this._defaultHeader)
      .then(res => res.data)
  }

  /**
   * 更新资讯详情（自增阅读量）
   */
  updateNewsDetail(newsId, newsDetail) {
    return this._request.putRequest(`${this._baseUrl}/api/gameNews/${newsId}`, newsDetail, this._defaultHeader)
      .then(res => res.data)
  }

  /**
   * 发表评论
   */
  saveComment(data) {
    return this._request.postRequest(this._baseUrl + '/api/gameComment', data, this._defaultHeader)
      .then(res => res.data)

  }

  /**
   * 发表评论
   */
  getCommentList(data) {
    return this._request.getRequest(this._baseUrl + '/api/gameComment', data, this._defaultHeader)
      .then(res => res.data)
  }


  /**
   * 获取图集列表
   */
  getGalleryList(data) {
    return this._request.getRequest(this._baseUrl + '/api/gameGallery', data, this._defaultHeader)
      .then(res => res.data)
  }

  /**
   * 获取app信息
   */
  getAppInfo() {
    let data = ''
    return this._request.getRequest(this._baseUrl + '/api/appInfo/1', data, this._defaultHeader)
      .then(res => res.data)
  }

}
export default UserService