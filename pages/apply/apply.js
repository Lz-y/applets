import api from '../../utils/api.js'
Page({
  data: {
    current: '4',
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
  onReady: function () {},
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
  getList (){
    const user = wx.getStorageSync('user');
    const self = this;
    const current = self.data.current;
    wx.showToast({ title: '加载中', icon: 'loading' })
    if (user) {
      const status = parseInt(current)
      api.getApplyList({ account: user.account, status, ...self.data.pageParam }).then(({ data: { result } }) => {
        self.setData({ dataList: result })
      }).catch(r => {
        wx.showToast({ title: '服务器错误', icon: 'none' })
      })
    } else {
      wx.showToast({ title: '请您先登录', icon: 'none' })
    }
  },
  // 切换tab
  handleChange({ detail }) {
    const current = detail.key;
    const self = this;
    self.setData({current}, () => {
      this.getList()
    })
  },
  // 跳转到详情页
  toDetail (e) {
    const postId = e.currentTarget.dataset.postid
    wx.navigateTo({url: '../detail/detail?postId='+ postId})
  }
})