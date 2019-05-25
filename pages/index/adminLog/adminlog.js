// pages/index/adminLog/adminlog.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        code: ""
    },
    register: function(e) {
        var url = "/pages/index/adminRigister/adminregister";
        wx.navigateTo({
            url: url
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    getCode: function(e) {
        var that = this;
        var val = e.detail.value;
        that.setData({
            code: val
        });
    },
    login: function(e) {
        var code = this.data.code;
        var url = getApp().data.root + "/main/user/logInAdminAccount";
        wx.request({
            url: url,
            method: "POST",
            data: {
                code: code
            },
            success: function(e) {
                console.log(e.data.status);
                if (e.data.status == true) {
                    wx.showToast({
                        title: "登录成功",
                        icon: "success",
                        duration: 1500,
                        success: function () {
                            wx.setStorageSync("oid", e.data.oid);
                            wx.setStorageSync("code", code);
                            wx.redirectTo({
                                url: '/pages/admin/index',
                            });
                        }
                    });
                } else {
                    wx.hideToast();
                    wx.showToast({
                        title: e.data.msg
                    })
                }
            }
        });
    },
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var that = this;
        var a = wx.getStorageSync("code");
        if (a) {
            that.setData({
                code: a
            });
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});