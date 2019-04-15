function request(url, method, { data = {}, header = {}, responseType = 'text'} = {}) {
  if (arguments.length === 3) data = arguments[2]
  const token = wx.getStorageSync('token') || ''
  if (!!token) header['Authorization'] = token
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://localhost:3000' + url,
      data: JSON.stringify(data),
      method,
      header,
      responseType,
      success: res => {
        resolve(res)
      },
      fail: f => {
        reject(f)
      }, 
      complete (r) {
        if (r.statusCode === 401) {
          wx.showToast({
            title: '请您先登录',
            icon: 'none',
            success () {
              wx.navigateTo({url: '../login/login'})
            }
          })
        }
      }
    })
  })
}

//get请求
function Get(url, options = {}) {
  return request(url, 'GET', options);
}

//post请求
function Post(url, options = {}) {
  return request(url, 'POST', options);
}

module.exports = {
  Post,
  Get
};