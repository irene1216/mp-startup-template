//index.js
const app = getApp()
import event from '../../utils/event';
import T from '../../utils/i18n';

Page({
  data: {
    // tabbar data
    langIndex: 0,
    tabItems: 0,
    navBot:0,
    index: true,
    profile: false,

    // language
    language: {}
  },
  onLoad: function () {
    let that = this
    event.on('loadingDone', that, that.finishLoading);
    event.on('languageChanged', that, that.setLanguage);
    that.setLanguage()
    console.log(that.data)
  },

  onHide: function () {
    console.log("this.onHide")
    wx.setStorage({
      key: 'globalData',
      data: globalData
    })
  },

  onUnload: function() {
    console.log("this.unloadd")
  },

  changeLanguage(langIndex) {
    this.setData({
      langIndex: langIndex
    });
    wx.T.setLocaleByIndex(langIndex);
    event.emit('languageChanged');
  },

  setLanguage: function () {
    this.setData({
      langIndex: wx.T.getlangIndex(),
      language: wx.T.getLanguage(),
      tabItems: wx.T.setTabBarLang()
    });
  },

    toIndex: function () {
      this.setData({
        index: true,
        profile: false
      })
    },

    toProfile: function () {
      this.setData({
        profile: true,
        index: false
      })
    }
 
})
