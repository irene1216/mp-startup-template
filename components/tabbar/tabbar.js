// components/tabbar/tabbar.js
Component({
  properties: {
    navBot: {
      type: Number,
      value: 0
    },
    tabItems: {
      type: Object,
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
  },

  data: {
    currentTab: 0
  },

  methods: {
    switchTab: function (e) {
      let that = this
      const currentTab = e.target.dataset.current
      if (currentTab==1) {
        wx.navigateTo({
          url: `/pages/upload/upload`,
        })
      } 
      else if (this.data.currentTab === currentTab) {
       return false;
        } else if (currentTab == 2){
          if (currentTab == 2) {
            this.triggerEvent("toProfile")
            wx.hideLoading()
          } 
      } else {
        this.triggerEvent("toIndex")
      }
      that.setData({
        currentTab: currentTab,
      })
    },
  }
})
