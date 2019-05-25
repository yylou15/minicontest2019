// pages/rookie/messege/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-12-25',
    picker: [],
    organizationName: "",
    belongSchoolId: "",
    email: "",
    uid: "",
    num: "",
  },
  PickerChange(e) {
    console.log(e);
    var ind = e.detail.value;
    var sid = this.data.picker[ind]['sid'];
    this.setData({
      index: e.detail.value,
      belongSchoolId: sid
    })
    console.log(this.data.belongSchoolId);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '数据加载中',
      icon: 'loading'
    });
    wx.request({
      url: getApp().data.root + '/main/schools/getschools',
      data: {

      },
      success: function (res) {
        that.setData({
          picker: res.data,
          uid: wx.getStorageSync("uid")
        }

        )
        wx.hideLoading();

      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
})