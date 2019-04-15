import { sha1 } from '../../utils/sha1.js'
const { $Toast } = require('../../components/dist/base/index');
import api from '../../utils/api.js'
const app = getApp()
Page({
  data: {
    user: {
      account: '',
      psw: ''
    },
    reg: {
      account: '',
      psw: ''
    },
    current: 'login'
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) { },
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
  // 切换tab
  handleChange({ detail }) {
    this.setData({ current: detail.key });
  },
  // 输入帐号（手机号）
  inputAccount({ detail }) {
    const value = detail.detail.value;
    const self = this;
    /[^\d]+/.test(value) ? wx.showToast({ title: '手机号含有非法字符', icon: 'none' }) : !(/0?(13|14|15|17|18|19)[0-9]{9}/.test(value)) ? wx.showToast({ title: '手机号不足11位', icon: 'none' }) : self.data.current === 'login' ? 
    self.setData({ 'user.account': value }) : self.setData({ 'reg.account': value });
  },
  // 输入密码
  inputPsw({ detail }) {
    const value = detail.detail.value;
    const self = this;
    self.data.current === 'login' ? self.setData({ 'user.psw': value }) : self.setData({ 'reg.psw': value });
  },
  // 用户登录
  login() {
    const self = this;
    if (!self.data.user.account) {
      $Toast({ content: '请输入账号', type: 'warning' });
    } else if (!self.data.user.psw) {
      $Toast({ content: '请输入密码', type: 'warning' });
    } else {
      let params = Object.assign({}, self.data.user);
      params.psw = sha1(params.psw);
      api.login(params).then(({ data: { code, msg, result } }) => {
        if (code === - 1000) {
          $Toast({ content: msg, type: 'error' });
          self.setData({ current: 'reg' });
        } else if (code === 200) {
          wx.setStorageSync('user', params);
          wx.setStorageSync('token', result.token);
          wx.setStorageSync('userInfo', {
            address: "",
            age: 0,
            brief: "",
            education: "",
            email: "",
            gender: 0,
            major: "",
            name: "",
            school: "",
            tel: params.account
          });
          $Toast({ content: msg, type: 'success' });
          wx.switchTab({ url: '../index/index' });
        } else {
          $Toast({ content: msg, type: 'error' });
        }
      }).catch(err => {
        $Toast({ content: '服务器端异常', type: 'error' });
      });
      self.setData({
        user: {
          account: '',
          psw: ''
        }
      });
    }
  },
  // 用户注册
  reg() {
    const self = this;
    if (!self.data.reg.account) {
      $Toast({ content: '请输入账号', type: 'warning' });
    } else if (!self.data.reg.psw) {
      $Toast({ content: '请输入密码', type: 'warning' });
    } else {
      let params = Object.assign({ type: 0}, self.data.reg);
      params.psw = sha1(params.psw);
      api.reg(params).then(({ data: { code, msg } }) => {
        if (code === - 1001) {
          $Toast({ content: msg, type: 'error' });
          self.setData({ current: 'login' });
        } else if (code === 200) {
          wx.setStorageSync('user', params);
          $Toast({ content: msg, type: 'success' });
          self.setData({ current: 'login' });
        } else {
          $Toast({ content: msg, type: 'error' });
        }
      }).catch(err => {
        $Toast({ content: '服务器端异常', type: 'error' });
      });
      self.setData({
        reg: {
          account: '',
          psw: ''
        }
      });
    }
  }
})