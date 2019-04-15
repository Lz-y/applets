import {share} from '../../utils/util.js'
import { payment} from '../../utils/data.js'
import api from '../../utils/api.js'
const app = getApp()
Page({
  data: {
    details: {},
    isCollect: !1,
    isApply: !1,
    id: null,
    payment
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) { 
    const self = this;
    const id = parseInt(options.postId);
    self.setData({ id});
    this.getDetail();
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () { },
  // 生命周期函数--监听页面显示
  onShow: function () { },
  // 生命周期函数--监听页面隐藏
  onHide: function () { },
  // 生命周期函数--监听页面卸载
  onUnload: function () { },
  // 用户点击右上角分享
  onShareAppMessage: function (e) { 
    const _from = e.from
    return share(_from, {
      title: '快来使用开心兼职吧',
      path: '/page/index/index'
    })
  },
  getDetail () {
    const self = this;
    const id = self.data.id
    const params = {
      id,
      account: wx.getStorageSync('user').account
    };
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    api.findOnePost(params).then(({ data: { result } }) => {
      self.setData({ details: result, isCollect: result.isCollect, isApply: result.isApply })
    }).catch(err => {
      console.log(err)
    })
  },
  toAddress () {
    const self = this;
    const address = self.data.details.job_address;
    if (!address || address === '不限工作地点') {
      return
    } else {
      wx.navigateTo({url: '../address/address?cur='+address});
    }
  },
  // 添加收藏
  addCollect () {
    const self = this;
    self.setData({ isCollect: !self.data.isCollect})
    const params = {
      account: wx.getStorageSync('user').account,
      id: self.data.id,
      isCollect: self.data.isCollect,
      merchantId: self.data.details.merchant_id
    };
    api.addCollect(params).then(({data: {msg}}) => {
      wx.showToast({ title: msg});
    }).catch(err => {
      console.log(err);
    });
  },
  // 报名
  addApply () {
    const self = this;
    self.setData({ isApply: !self.data.isApply })
    const params = {
      account: wx.getStorageSync('user').account,
      id: self.data.id,
      isApply: self.data.isApply
    };
    api.addApply(params).then(({ data: { msg } }) => {
      wx.showToast({ title: msg });
    }).catch(err => {
      console.log(err);
    });
  }
})