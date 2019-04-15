import { cities } from '../../utils/city.js';
const app = getApp();
Page({
  data: {
    townName: "正在定位中...",
    townId: "",
    hotcityList: [
      {
        townName: "杭州",
        townId: 87
      }, {
        townName: "上海",
        townId: 73
      }, {
        townName: "北京",
        townId: 1
      }, {
        townName: "深圳",
        townId: 199
      }, {
        townName: "南京",
        townId: 74
      }, {
        townName: "武汉",
        townId: 169
      }, {
        townName: "广州",
        townId: 197
      }
    ],
    allArea: {},
    isShow: !1,
    cities: []
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName
      });
    })
    this.setData({
      cities: storeCity,
      townName: wx.getStorageSync('address')
    })
   },
  // 生命周期函数--监听页面显示
  onShow: function () { },
  // 生命周期函数--监听页面隐藏
  onHide: function () { },
  // 生命周期函数--监听页面卸载
  onUnload: function () { },
  // 选择热门城市
  jumpindex (e) {
    const hot = e.currentTarget.dataset.hot;
    wx.setStorage({
      key: 'address',
      data: hot.townName,
      success () {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  // 首字母改变时
  onChange({detail}) {
  },
  // 点击首字母下的城市
  selectCity (e) {
    const city = e.currentTarget.dataset.city;
    wx.setStorage({
      key: 'address',
      data: city.townName,
      success() {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})