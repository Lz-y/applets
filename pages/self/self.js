import api from '../../utils/api.js'
const app = getApp()
Page({
  data: {
    user: {},
    education: ['高中', '专科', '本科', '硕士', '博士'],
    visible: false,
    index: 0
  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    wx.showToast({title: '加载中',icon: 'loading'})
    this.setData({ user: app.globalData.userInfo })
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function() {},
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
  // 输入姓名
  inputName({ detail }) {
    const value = detail.detail.value
    this.setData({'user.name': value})
  },
  // 选择性别
  selectSex({ detail }) {
    const sex = parseInt(detail.value)
    this.setData({'user.gender': sex})
  },
  // 填写年龄
  inputAge({ detail }) {
    const age = parseInt(detail.detail.value)
    this.setData({ 'user.age': age })
  },
  // 填写手机号
  blurPhone({ detail }) {
    const tel = detail.detail.value;
    /[^\d]+/.test(tel) ? wx.showToast({ title: '手机号含有非法字符', icon: 'none' }) : !(/0?(13|14|15|17|18|19)[0-9]{9}/.test(tel)) ? wx.showToast({ title: '手机号不足11位', icon: 'none' }) :  this.setData({ 'user.tel': tel })
  },
  // 输入学校
  inputSchool({ detail }) {
    const value = detail.detail.value
    this.setData({'user.school': value})
  },
  // 输入现居地
  inputAdress({ detail }) {
    const value = detail.detail.value;
    this.setData({'user.address': value});
  },
  // 输入邮箱
  inputEmail({ detail }) {
    const value = detail.detail.value;
    /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value) ? this.setData({ 'user.email': value }) : wx.showToast({ title: '邮箱格式不正确', icon: 'none' });
  },
  // 选择学历
  selectEdu({ detail }) {
    const that = this;
    let {value} = detail;
    value = parseInt(value);
    const $value = that.data.education[value];
    that.setData({ index: value, 'user.education': $value});
  },
  // 输入专业
  inputMajor({ detail }) {
    const value = detail.detail.value
    this.setData({'user.major': value})
  },
  // 输入自我介绍
  inputBrief({ detail }) {
    const value = detail.detail.value
    this.setData({'user.brief': value})
  },
  // 保存修改后的用户信息
  save () {
    const self = this;
    if (!self.data.user.age) {
      wx.showToast({ title: '请填写您的年龄', icon: 'none' });
    } else if (!self.data.user.address) {
      wx.showToast({ title: '请填写现居地', icon: 'none' });
    } else if (!self.data.user.email) {
      wx.showToast({ title: '请填写您的邮箱', icon: 'none' });
    }else if (!self.data.user.school) {
      wx.showToast({ title: '请填写您的学校', icon: 'none' });
    } else if (!self.data.user.education) {
      wx.showToast({ title: '请选择您的学历', icon: 'none' });
    }else if (!self.data.user.major) {
      wx.showToast({ title: '请填写您的专业', icon: 'none' });
    } else if (!self.data.user.brief) {
      wx.showToast({ title: '请填写您的自我介绍', icon: 'none' });
    } else {
      api.modifyOneUser(self.data.user).then(({ data: { msg } }) => {
        wx.showToast({ title: msg });
        app.globalData.userInfo = self.data.user;
      }).catch(err => {
        wx.showToast({ title: '服务器错误', icon: 'none' });
      });
    }
  }
})