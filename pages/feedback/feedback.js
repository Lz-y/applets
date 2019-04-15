import api from '../../utils/api.js'
const { $Toast } = require('../../components/dist/base/index')
const app = getApp()
Page({
  data: {
    feedback: {
      title: '',
      contact: '',
      content: ''
    }
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
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
  // 输入反馈标题
  inputTitle({ detail }) {
    const value = detail.detail.value
    this.setData({'feedback.title': value})
  },
  // 输入联系方式
  inputContact({ detail }) {
    const value = detail.detail.value
    this.setData({ 'feedback.contact': value })
  },
  // 输入留言内容
  inputContent({ detail }) {
    const value = detail.detail.value
    this.setData({
      'feedback.content': value
    })
  },
  // 保存修改后的用户信息
  save() {
    const self = this;
    if (!self.data.feedback.title) {
      $Toast({
        content: '请输入留言标题',
        type: 'warning'
      })
    } else if (!self.data.feedback.content) {
      $Toast({
        content: '请输入留言内容',
        type: 'warning'
      })
    } else {
      const account = wx.getStorageSync('user').account
      api.addFeedback({...self.data.feedback, account}).then(({ data: { msg } }) => {
        wx.showToast({ title: msg })
        self.setData({
          feedback: {
            title: '',
            contact: '',
            content: ''
          }
        })
      }).catch(err => {
        wx.showToast({ title: '服务器错误', icon: 'none' })
      })
    }
  }
})