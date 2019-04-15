import { sha1 } from '../../utils/sha1.js'
const { $Toast } = require('../../components/dist/base/index');
import api from '../../utils/api.js'
const app = getApp()
Page({
  data: {
    user: {},
    psw: '******',
    visible: !1
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({user: wx.getStorageSync('user')})
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () { },
  // 生命周期函数--监听页面显示
  onShow: function () { },
  // 生命周期函数--监听页面隐藏
  onHide: function () { },
  // 生命周期函数--监听页面卸载
  onUnload: function () { },
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () { },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () { },
  // 用户点击右上角分享
  onShareAppMessage: function () { },
  // 显示密码修改框
  showModel (e) {
    const self = this;
    self.setData({visible: true})
  },
  // 输入密码
  inputPsw({ detail }) {
    const value = detail.detail.value
    this.setData({ 'user.psw': value })
  },
  // 修改密码并保存
  save () {
    const self = this;
    wx.setStorageSync('user', self.data.user)
    self.data.user.psw = sha1(self.data.user.psw)
    api.modifyPsw(self.data.user).then(({data:{msg}}) => {
      $Toast({ content: msg, type: 'success' });
      wx.reLaunch({url: '../login/login'})
    }).catch(err => {
      $Toast({ content: '服务器端异常', type: 'error' });
    })
    self.setData({ visible: false })
  },
  // 关闭弹框
  close () {
    const self = this;
    self.setData({ visible: false })
  },
  // 退出登录
  logout() {
    const self = this;
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗？',
      success(res) {
        if (res.confirm) {
          app.globalData.userInfo = {}
          wx.removeStorageSync('user')
          wx.removeStorageSync('token')
          wx.reLaunch({ url: '../login/login' })
          self.setData({ user: {}, psw: '' })
        } else {
          return false
        }
      }
    })
  },
  openSetting () {
    wx.openSetting({})
  }
})