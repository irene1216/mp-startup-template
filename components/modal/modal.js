// components/modal/modal.js
Component({
  /**
   * Component properties
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    height: {
      type: String,
      value: '80%'
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    clickMask() {
      // this.setData({show: false})
    },
    cancel() {
      this.setData({ show: false })
      this.triggerEvent('cancel')
    },
    confirm() {
      this.setData({ show: false })
      this.triggerEvent('confirm')
    }
  }
})
