//app.js
const http = require('utils/http.js');
import locales from 'utils/locales';
import event from 'utils/event';
import T from 'utils/i18n';
const savedLangIdx = wx.getStorageSync('globalData').langIndex
const savedGlobalData = wx.getStorageSync('globalData');
T.registerLocale(locales);

if (savedLangIdx != null) {
  T.setLocaleByIndex(savedLangIdx);
  wx.T = T;
} else {
  wx.getSystemInfo({
    success: function (res) {
      if (res.language == 'en') {
        T.setLocaleByIndex(1);
        console.log("language", res.language)
        wx.T = T;
      } else {
        T.setLocaleByIndex(0);
        wx.T = T;
      }
    },
  })
}
App({
  onLaunch: function () {
    this.globalData = savedGlobalData || {
      screenSize: {},
      isIphoneX: false,
      header: {},
      navBarHeight: 0,
      menuRight: 0,
      menuButtom: 0,
      menuHeight: 0,
    };
    this.globalData.language = wx.T.getLanguage();
    this.globalData.finishLoading = false;
    this.globalData.url = wx.T.getUrl();
    this.globalData.uploadedFilePaths = [];
    this.globalData.imagePreviewPaths = [];

    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        const m = wx.getMenuButtonBoundingClientRect()
        that.globalData.navBarHeight = ((m.top - e.statusBarHeight)*2 + m.height + e.statusBarHeight)*2;
        that.globalData.menuTop = m.top
        that.globalData.menuLeft = e.screenWidth - m.left
        that.globalData.menuRight = e.screenWidth - m.right
        that.globalData.menuBottom = m.top - e.statusBarHeight
        that.globalData.menuHeight = m.height 
        that.globalData.dpr = e.devicePixelRatio
        // zh_CN or en
        let screenWidth = e.screenWidth
        let systemBarHeight = e.statusBarHeight
        that.globalData.screenSize = { width: e.windowWidth, height: e.windowHeight}

        var a = e.model;
        if (a.indexOf("iPhone") != -1 && a.indexOf("X") != -1) { 
          that.globalData.isIphoneX = true
        } else {
          that.globalData.isIphoneX = false
        }
        if ( savedLangIdx > 0 ){
          if (e.language == 'en') {
            console.log("e.language ==dsssss 'en", savedLangIdx)
            that.globalData.langIndex = 1
            event.emit('languageChanged');
          } else {
            that.globalData.langIndex = 0
            event.emit('languageChanged');
          }
        }
        event.on('getInfo', that, that.checkScope);
        event.on('languageChanged', that, that.setLanguage);
      }
    })
    
    // Login
    const token = wx.getStorageSync('header').authorization || []
    wx.login({
      success: res => {
        // http.noheaderAPI('login', 'POST', { code: res.code }).then(
        //   res=>{
        //     const newToken = res.data.token.token
        //     const userData = res.data.userInfo
        //     that.globalData.finishLoading = true
        //     event.emit('loadingDone');
        //     // To check if user is new or if token has expired
        //     if (token != newToken) {
        //       wx.setStorageSync('header', { authorization: newToken })
        //       wx.setStorageSync('userId', userData.id)
        //       wx.setStorageSync('railsHasUserInfo', userData.avatar_url == null ? false : true)
        //       this.globalData.header = { authorization: newToken }
        //       wx.pro.reLaunch({
        //         url: '/pages/index/index',
        //       })
        //     } 
        //   }
        // )
      }
    })
    this.checkScope()
  },

  checkScope: function() {
    let page = this
    wx.getSetting({
      success: res => {
        let auth = res.authSetting
        if (auth['scope.userInfo']) {
          console.log("i have userInfo")
          wx.getUserInfo({
            success: res => {
              page.globalData.hasUserInfo = true
              page.globalData.userInfo = res.userInfo
              page.sendUserInfo(res.userInfo)
            }
          })
        } else if (auth['scope.userInfo'] == false) {
          console.log("i dont have userInfo")
          page.globalData.hasUserInfo = false
        }
        wx.hideLoading()
      }
    })
  },

  sendUserInfo: function (e) {
    let body = {
      name: e.nickName,
      avatar_url: e.avatarUrl,
    }
    // http.apiCall(`users/${wx.getStorageSync('userId')}`, 'PUT', body).then(res => {
    //   wx.setStorageSync("userData", res.data)
    // }).then(res=>{
    // })
  },

  globalData: {
    userInfo: null
  }
})