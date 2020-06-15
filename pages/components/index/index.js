// pages/components/index/index.js
Component({
  properties: {
    langIndex: {
      type: Number,
      value: 0
    },
    language: {
      type: Object,
      value: {}
    },
    index: {
      type: Boolean,
      value: {}
    }
  },

  data: {

  },
  methods: {
    switchLang: function () {
      this.triggerEvent("switchLang")
    }
  }
})
