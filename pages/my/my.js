import api from '../../utils/api.js'
const app = getApp()
Page({
  data: {
    user: {},
    isLogin: null
  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    const user = wx.getStorageSync('user')
    wx.showToast({ title: '加载中', icon: 'loading' })
    if (user) {
      api.findOneUser({ account: user.account }).then(({ data: { code,msg,result } }) => {
        if (code === -1003) {
          wx.showToast({
            title: msg,
            icon: 'none',
            success () {
              wx.navigateTo({url: '../self/self'})
            }
          })
        } else if (code === 200) {
          this.setData({ user: result[0]})
          app.globalData.userInfo = result[0]
        }
        this.setData({ isLogin: true })
      }).catch(r => {
        wx.showToast({ title: '服务器错误', icon: 'none' })
      })
    } else {
      this.setData({ isLogin: false })
    }
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function() {
  },
  // 生命周期函数--监听页面显示
  onShow: function() {},
  // 生命周期函数--监听页面隐藏
  onHide: function() {},
  // 生命周期函数--监听页面卸载
  onUnload: function() {},
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {},
  // 页面上拉触底事件的处理函数
  onReachBottom: function() {},
  // 用户点击右上角分享
  onShareAppMessage: function() {},
  // 跳转到登录页面
  toLogin () {
    wx.navigateTo({ url: '../login/login' })
  },
  // 跳转到个人简历页面
  toSelfInfo () {
    wx.navigateTo({ url: '../self/self' })
  },
  // 跳转到已报名页面
  toApply () {
    wx.navigateTo({ url: '../apply/apply' })
  },
  // 跳转到兼职记录页面
  toRecord () {
    wx.navigateTo({ url: '../record/record' })
  }
})