//index.js
const globalData = getApp().globalData
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
    language: {},

    //navbar data
    navStyle: 'transparent'
  },
  onLoad: function () {
    let that = this
    event.on('loadingDone', that, that.finishLoading);
    event.on('languageChanged', that, that.setLanguage);
    that.setLanguage()
    let h = globalData.screenSize.height
    if (h>=800){
      that.setData({
        navHeight: globalData.navBarHeight,
        navBot: 10
      }) 
    } else if (h>600 && h <800){
      that.setData({
        navHeight: globalData.navBarHeight,
        navBot: 10,
        // for mask
      })
    } else if (h<=600){
      that.setData({
        navHeight: globalData.navBarHeight,
        navBot: 10
        // for mask
      })
    }
  },

  switchLang() {
    console.log("old lang", this.data.langIndex)
    if (this.data.language.langIndex == 0) {
      this.changeLanguage(1)
    } else {
      this.changeLanguage(0)
    }
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
