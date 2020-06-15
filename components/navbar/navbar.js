// components/navbar.js
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
    navStyle: {
      type: String,
      value: '',
      observer: function(newVal) {
        if (newVal == 'transparent') {
          this.setData({
            transparent: true
          })
        }
      }
    },
  },
  data: {
    // navHeight: globalData.navBarHeight,
    // menuLeft: globalData.menuLeft,
    // menuTop: globalData.menuTop,
    // menuRight: globalData.menuRight,
    // menuBottom: globalData.menuBottom,
    // menuHeight: globalData.menuHeight,
  },

  /**
   * Component methods
   */
  methods: {

  }
})
