const app = getApp()

const apiCall = function (route, method, body) {
  const app = getApp()
  console.log("http", app.globalData.url, route, method, body)
  return wx.pro.request({
      url: `${app.globalData.url}` + route,
      header: wx.getStorageSync('header'),
      method: method,
      data: body,
  }).then(res => {
    console.log("http apiCall", route, method, body, "respond", res)
      if (res.statusCode == 401) {
        wx.reLaunch()
      } else {
        return res
        }
      }).catch(err => {
      }).finally(() => {
      })
}

const noheaderAPI = function (route, method, body) {
  const app = getApp()
  return wx.pro.request({
    url: `${app.globalData.url}` + route,
    method: method,
    data: body,
  }).then(res => {
    return res
  }).catch(err => {
    // console.log(err)
  }).finally(() => {
    // wx.pro.hideLoading()
  })
}

module.exports = {
  apiCall: apiCall,
  noheaderAPI: noheaderAPI,
}
