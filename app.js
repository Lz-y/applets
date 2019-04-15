const QQMapWX = require('./utils/qqmap-wx-jssdk.js')
import { subkey } from './utils/data.js'
App({
  onLaunch: function () { 
  },
  onShow() { 
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
  },
  // 全局数据
  globalData: {
    userInfo: {
      address:"",
      age:0,
      brief:"",
      education:"",
      email:"",
      gender:0,
      major:"",
      name:"",
      school:"",
      tel:""
    }
  },
  // 获取当前地理位置
  getCurrentLocation(cb) {
    let qqmapsdk = new QQMapWX({ key: subkey })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            let address = addressRes.result.address_component.city
            wx.setStorage({
              key: 'address',
              data: address
            })
            cb(address)
          }
        })
      },
    })
  }
})