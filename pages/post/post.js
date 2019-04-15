import { icons, classifications, sortRules, time, payment } from '../../utils/data.js'
import api from '../../utils/api.js'
const app = getApp()
Page({
  data: {
    current: 'all',
    icons: [],
    sortRuleName: "默认排序",
    classificationName: "全部岗位",
    classifications,
    sortRules,
    time,
    payment,
    secondTitle: [],
    navActive: 0,
    isFixed: !1,
    firstTag: 0,
    secondTag: 0,
    sortRuleTag: 0,
    filter: {
      time: 0,
      pay: 9,
      gender: 9
    },
    jobs: [],
    params: {
      title: '',
      subTitle: '',
      sort: 0,
      page: 1,
      offset: 10
    }
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) { 
    const self = this;
    self.getPostList(), self.setData({
      secondTitle: self.data.classifications[0].secondTitle,
      icons: icons[self.data.current]
    })
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
  // 切换tab
  handleChange({ detail }) {
    this.setData({
      current: detail.key,
      icons: icons[detail.key],
      loading: !0
    });
    setTimeout(()=>{
      this.setData({loading: !1})
    }, 1500);
  },
  // 点击图标
  universalJump(e) {
    const self = this;
    const title = e.currentTarget.dataset.title;
    self.setData({ 'params.title': title }), self.getPostList();
  },
  // 滑动选择框
  preventTouchMove () {
    return false
  },
  // 关闭选项框
  closeNav () {
    const that = this;
    that.setData({
      navActive: 0,
      isFixed: !that.data.isFixed
    });
  },
  // 筛选区域
  changeActiveNav(e) {
    const that = this;
    const index = parseInt(e.currentTarget.dataset.index);
    if (index === that.data.navActive) {
      that.setData({ navActive: 0, isFixed: !1 });
      return false;
    } else {
      that.setData({ navActive: index, isFixed: !0 });
    }
  },
  // 获取二级分类
  getSecondTitle (e) {
    const self = this;
    const title = e.currentTarget.dataset.title;
    const index = parseInt(e.currentTarget.dataset.index);
    self.setData({
      firstTag: index,
      classificationName: title,
      secondTitle: self.data.classifications[index].secondTitle,
      'params.title': index === 0 ? '': title,
      'params.subTitle': ''
    }),self.closeNav(),self.getPostList();
  },
  // 选择二级分类
  clickSecondClassification (e) {
    const that = this;
    const subtitle = e.currentTarget.dataset.subtitle;
    const index = parseInt(e.currentTarget.dataset.index);
    that.setData({
      secondTag: index,
      classificationName: index > 0 ? subtitle: '全部岗位',
      'params.subTitle': index > 0 ? subtitle : ''
    }),that.closeNav(),that.getPostList();
  },
  // 选择排序规则
  addSorts (e) {
    const that = this;
    const name = e.currentTarget.dataset.name;
    const index = parseInt(e.currentTarget.dataset.index);
    const id = parseInt(e.currentTarget.dataset.sortid);
    that.setData({
      'params.sort': index,
      sortRuleTag: index,
      sortRuleName: name
    }), that.getPostList(), that.closeNav();
  },
  // 选择工作区域
  changeTimeFlag (e) {
    const that = this;
    const time = parseInt(e.currentTarget.dataset.time);
    that.setData({'filter.time': time})
  },
  // 选择支付方式
  changePayFlag (e) {
    const that = this;
    const key = parseInt(e.currentTarget.dataset.key);
    that.setData({ 'filter.pay': key })
  },
  // 选择性别要求
  chooseGengerFilter ({detail}) {
    const that = this;
    let {value} = detail;
    value = parseInt(value);
    that.setData({'filter.gender': value});
  },
  // 选择其他条件
  changeWeekendFlag () {
    const that = this;
    that.setData({ 'filter.other': !that.data.filter.other });
  },
  // 重置筛选条件
  resetFilter () {
    const that = this;
    that.setData({
      filter: {
        time: 0,
        pay: 9,
        gender: 9
      }})
  },
  // 保存筛选条件
  submitFilter () {
    const self = this;
    api.filterPost(self.data.filter).then(({data: {result}}) => {
      self.setData({jobs: result})
    }).catch(err => {
      console.log(err)
    })
    this.closeNav();
  },
  // 到兼职的详情页
  toDetail (e) {
    const that = this;
    const jobId = e.currentTarget.dataset.jobid;
    wx.navigateTo({
      url: `../detail/detail?postId=${jobId}`
    })
  },
  // 获取岗位列表
  getPostList () {
    const self = this;
    wx.showToast({title: '加载中',icon: 'loading'});
    api.getPostList(self.data.params).then(({data: {result}}) => {
      self.setData({jobs: result})
    }).catch(err => {
      console.log(err)
    })
  }
})