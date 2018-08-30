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
   * 获取app信息
   */
  getAppInfo() {
    let data = ''
    return this._request.getRequest(this._baseUrl + '/api/appInfo/1', data, this._defaultHeader)
      .then(res => res.data)
  }

}
export default UserService