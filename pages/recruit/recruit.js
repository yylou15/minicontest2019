// pages/recruit/recruit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 单选
      current:'我是部长',
      options: [
        { id: 1, name: '我是部长' },
        { id: 2, name: '我是萌新' },
      ],
      isLoading:false,
      buttonText:"发起招新"
  },
  handleRadioChange({ detail = {} }) {
      this.setData({
          buttonText:this.data.current === '我是部长'?'参与招新':'发起招新',
          current: detail.value
      });
  },
  handleButtonClick(){
      var that = this;
      this.setData({
          isLoading:true
      })
      wx.navigateTo({
        url: 'new_recruit/new_recruit'
      })

      setTimeout(function () {
          that.setData({
              isLoading:false
          })
      },1000)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})
