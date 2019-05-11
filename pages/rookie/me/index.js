// pages/rookie/me/index.js
Component({

 
  data: {

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() { 
      wx.setNavigationBarTitle({
        title: '我的'  //修改title
      })
    },
    moved() { },
    detached() { },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {
      this.startAnimation();
     },
    hide() { },
    resize() { },
  },
  methods: {
    startAnimation: function () {
      let next = true;
      setInterval(function () {
        if (next) {
          //导出动画数据传递给组件的animation属性。
          this.setData({
            waveAnimation: wx.createAnimation({
              duration: 2000,
              timingFunction: "linear",
              delay: 0,
              transformOrigin: "50% 50%",
            }).scale(2).opacity(0).step().export(),
          })
          next = !next;
        } else {
          //导出动画数据传递给组件的animation属性。
          this.setData({
            waveAnimation: wx.createAnimation({
              duration: 1,
              timingFunction: "linear",
              delay: 0,
              transformOrigin: "50% 50%",
            }).scale(1).opacity(1).step().export(),
          })
          next = !next;
        }
      }.bind(this), 2000)
    }

    
  },

})