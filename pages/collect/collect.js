import api from '../../utils/api.js'
const app = getApp();
Page({
  data: {
    dataList: [],
    pageParam: {
      page: 1,
      offset: 10
    }
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getList()
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
  // 获取数据
  getList () {
    const user = wx.getStorageSync('user')
    wx.showToast({ title: '加载中', icon: 'loading' })
    if (user) {
      api.getCollectList({ account: user.account, ...this.data.pageParam }).then(({ data: { result } }) => {
        this.setData({ dataList: result })
      }).catch(r => {
        wx.showToast({ title: '服务器错误', icon: 'none' })
      })
    } else {
      wx.showToast({ title: '请您先登录', icon: 'none' })
    }
  },
  // 跳转到详情页
  toDetail(e) {
    const postId = e.currentTarget.dataset.postid
    wx.navigateTo({ url: '../detail/detail?postId=' + postId })
  }
})