//index.js
const app = getApp()
import event from '../../utils/event';
import T from '../../utils/i18n';

Page({
  data: {
    // tabbar data
    currentTab: 0,
    langIndex: 0,
    tabItems: 0,
    navBot:0,

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

  changeLanguage(langIndex) {
  
    this.setData({
      langIndex: langIndex
    });
    wx.T.setLocaleByIndex(langIndex);
    event.emit('languageChanged');
  },

  setLanguage() {
    this.setData({
      langIndex: wx.T.getlangIndex(),
      language: wx.T.getLanguage(),
    });
  },
 
})
