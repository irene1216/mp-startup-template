// pages/components/profile/profile.js
const globalData = getApp().globalData
const app = getApp()
import event from '../../../utils/event';

Component({
  properties: {
    profile: {
      type: Boolean,
      value: {}
    },
    langIndex: {
      type: Number,
      value: 0
    },
    language: {
      type: Object,
      value: {}
    },
    navHeight: {
      type: Number,
      value: 0
    }
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  ready: function() { 
      if (globalData.userInfo) {
        this.setData({
          userInfo: globalData.userInfo,
          hasUserInfo: true
        })
      } else {
        wx.getUserInfo({
          success: res => {
            event.emit('getInfo');
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
    }
  },

  detached: function() { 
    wx.setStorage({
      key: 'globalData',
      data: globalData
    });
  },
  methods: {
    getUserInfo: function (e) {
      event.emit('getInfo');
      globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })  
    },
  }
})
