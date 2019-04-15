import api from '../../utils/api.js'
import { subkey} from '../../utils/data.js'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
const app = getApp()
Page({
  data: {
    subkey,
    latitude: 0,
    longitude: 0,
    markers: [{
      id: 0,
      latitude: 0,
      longitude: 0,
      iconPath: '../../images/end.png',
      width: 30,
      height: 35,
      title: "",
      callout: {
        content: '所在地',
        color: '#ffffff',
        fontSize: 16,
        borderRadius: 6,
        borderWidth: 10,
        borderColor: '#FF0000DD',
        bgColor: '#FF0000DD',
        display: 'ALWAYS'
      }
    }],
    scale: 16,
    compass: !0,
    location: !0
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    const self = this;
    const address = options.cur;
    const mapsdk = new QQMapWX({key: subkey})
    mapsdk.geocoder({
      address: address,
      success(res) {
        let {result: {location}} = res
        self.setData({
          latitude: location.lat,
          longitude: location.lng,
          'markers[0].latitude': location.lat,
          'markers[0].longitude': location.lng
        })
      },
      fail() {
        wx.showModal({
          title: '定位失败',
          content: 'none'
        })
      }
    })
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () { },
  // 生命周期函数--监听页面显示
  onShow: function () { },
  // 生命周期函数--监听页面隐藏
  onHide: function () { },
  // 生命周期函数--监听页面卸载
  onUnload: function () { }
})