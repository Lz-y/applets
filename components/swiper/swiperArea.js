Component({
  options:{
  },
  // 组件的属性列表
  properties: {
    // 是否自动播放
    autoplay: {
      type: Boolean,
      value: true
    },
    // 间隔时长
    duration: {
      type: Number,
      value: 5000
    },
    // 是否为衔接滑动
    circular: {
      type: Boolean,
      value: true
    },
    // 选中是指示点的颜色
    activeColor: {
      type: String,
      value: '#eee'
    },
    // 是否显示指示点
    showDot: {
      type: Boolean,
      value: true
    },
    // 数据
    data: {
      type: Array,
      value: []
    }
  },
  data: {
    // 图片宽度为系统可用宽度
    width: wx.getSystemInfoSync().windowWidth,
    lazyLoad: true
  },
  // 组件的方法列表
  methods: {
  }
})
