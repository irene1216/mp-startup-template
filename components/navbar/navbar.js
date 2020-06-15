// components/navbar.js
const globalData = getApp().globalData

Component({
  properties: {
    langIndex: {
      type: Number,
      value: 0
    },
    navHeight: {
      type: Number,
      value: 0
    },
    language: {
      type: Object,
      value: {}
    },
    hasHome: {
      type: Boolean,
      value: true
    },
    whiteBack: {
      type: Boolean,
      value: true
    },
    hasHome: {
      type: Boolean,
      value: true
    },
    navTitle: {
      type: String,
      value: ''
    },
    navStyle: {
      type: String,
      value: '',
      observer: function(newVal) {
        if (newVal == 'transparent') {
          this.setData({
            transparent: true,
            white: false,
            hasHome: false,
            whiteBack: false,
          })
        } else if (newVal == 'white') {
          this.setData({
            white: true,
            transparent: false,
            hasHome: true,
            whiteBack: true
          })
        } else if (newVal == 'backArrow') {
          this.setData({
            transparent: true,
            backArrow: true
            
          })
        }
      }
    },
  },
  data: {
    navHeight: globalData.navBarHeight,
    menuLeft: globalData.menuLeft,
    menuTop: globalData.menuTop,
    menuRight: globalData.menuRight,
    menuBottom: globalData.menuBottom,
    menuHeight: globalData.menuHeight,
  },

  /**
   * Component methods
   */
  methods: {

  }
})
