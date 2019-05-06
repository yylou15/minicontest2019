// pages/rookie/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'  //修改title
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.startAnimation();
  },
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

})