// pages/index/adminRigister/adminregister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: [],
    organizationName: "",
    belongSchoolId: "",
    email: "",
    uid:"",
    num:"",

  },
  PickerChange(e) {
    console.log(e);
    var ind=e.detail.value;
    var sid = this.data.picker[ind]['sid'];
    this.setData({
      index: e.detail.value,
      belongSchoolId:sid
    })
    console.log(this.data.belongSchoolId);
  },
  orgnizeChange:function(e){
    console.log(e);
    this.setData({
      organizationName: e.detail.value
    })
    console.log(this.data.organizationName);
  },
  emailChange: function (e) {
    console.log(e);
    this.setData({
      email: e.detail.value
    })
    console.log(this.data.email);
  },
  registerSubmit:function(e){
    var alarm = "";
    var status = true;
    var uid=this.data.uid;
    var organizationName=this.data.organizationName;
    var email=this.data.email;
    var belongSchoolId = this.data.belongSchoolId;
    if (this.data.organizationName == "" || this.data.belongSchoolId == "" || this.data.email=="") {
      alarm += "请完善信息！";
      status = false;
    }
    if (status == false) {
      wx.showModal({
        content: "请完善信息",
        showCancel: false,
        success: function (res) {
          if (res.confirm) { }
        }
      });
    } else {
      wx.showModal({
        title: '确定提交',
        content: '请再次确认输入信息无误',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            wx.showToast({
              title: '正在提交中',
              icon: 'loading',
              duration: 3000
            });
            var url = getApp().data.root + '/main/user/registerAdminAccount';
            wx.request({
              url: url,
              method: "POST",
              data: {
                uid: uid,
                belongSchoolId:belongSchoolId,
                email:email,
                organizationName:organizationName
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (e) {
                console.log(e.data.status);
                console.log(e.data.data.code);
                var code=e.data.data.code;
                if (e.data.status == true) {
                  wx.showToast({
                    title: '注册成功',
                    icon: 'success',
                    duration: 1500,
                    success: function () {
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '/pages/index/logcode/code?code='+code,
                        });
                      }, 1500)
                    }
                  });
                } else {
                  wx.hideToast();
                  wx.showModal({
                    content: '注册失败了狗东西',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                      }
                    }
                  });
                }
              }
            })
          } else {
          }
        }
      });
    }
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

  }
})