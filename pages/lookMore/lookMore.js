const app = getApp()
Page({
  data: {
    list: []
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    const {item} = options;
    this.setData({ list: wx.getStorageSync(item) });
    wx.setNavigationBarTitle({
      title: item === 'travels' ? '志愿者' : '体验测评'
    });
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
  // 跳转到详情页
  toDetail (e) {
    const postid = e.currentTarget.dataset.postid;
    wx.navigateTo({url: '../detail/detail?postId=' + postid});
  }
})