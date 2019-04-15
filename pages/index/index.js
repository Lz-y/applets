import { focuses} from '../../utils/data.js'
import { debounce} from '../../utils/util.js'
import api from '../../utils/api.js'
//获取应用实例
const app = getApp()
Page({
  data: {
    address: '',
    value: '',
    focuses,
    travels: [],
    experices: [],
    novels: [],
    home: [],
    recommends: [],
    result: [],
    localIndex: 0,
    loading: false
  },
  onLoad: function () {
  },
  onShow () {
    const self = this;
    const user = wx.getStorageSync('user');
    if (user) {
      const address = wx.getStorageSync('address');
      address ? (this.init({ address }), self.setData({ 'address': address })) :
      app.getCurrentLocation.bind(app)(val => {
        this.init({'address': val});
        self.setData({ 'address': val });
      });
    } else {
      wx.reLaunch({ url: '../login/login' });
    }
  },
  // 初始化数据
  init (params) {
    const self = this;
    if (!self.data.loading) {
      wx.showToast({ title: '加载中', icon: 'loading' });
      api.first(params).then(({ data: { result: { travels, experices, novels, home, recommends } } }) => {
        self.setData({ travels, experices, novels, home: home.slice(0, 3), recommends, loading: true})
        wx.setStorage({ key: 'travels', data: travels })
        wx.setStorage({ key: 'experices', data: experices })
        wx.setStorage({ key: 'home', data: home })
      }).catch(err => {
        console.log(err)
      })
    } else {
      return
    }
  },
  // 点击地址跳转到城市选择页面
  toAddress () {
    wx.navigateTo({ url: '../cityList/cityList' })
  },
  // 搜索兼职信息
  change({ detail }){
    const value = detail.detail.value;
    const self = this;
    if (value) {
      api.searchPost({q:value}).then(({data:{result}}) => {
        self.setData({ value, result })
      }).catch(err => {
        wx.showToast({ title: '服务器错误', icon: 'none' })
      })
    } else {
      return false
    }
  },
  // 点击查询结果跳转到详情页
  clickRes (e) {
    const postid = e.currentTarget.dataset.postid;
    const self = this;
    wx.navigateTo({
      url: '../detail/detail?postId='+postid,
      success(){
        self.setData({ result: [], value: ''});
      }
    });
  },
  // 跳转到查看更多
  toLookMore (e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({url: `../lookMore/lookMore?item=${item}`});
  },
  // 换一换
  refresh () {
    const self = this;
    let t = [];
    let home = wx.getStorageSync('home');
    self.data.localIndex += 1;
    for (let i = 0; i < home.length; i += 3) t.push(home.slice(i, i + 3));
    self.data.localIndex <= t.length - 1 ? self.setData({
      home: t[self.data.localIndex]
    }) : self.setData({
      home: t[0],
      localIndex: 0
    });
  },
  // 跳转到详情页
  toDetail(e) {
    const postid = e.currentTarget.dataset.postid;
    wx.navigateTo({url: '../detail/detail?postId='+postid });
  }
})
