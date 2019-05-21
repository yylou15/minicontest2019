// pages/index/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (!wx.getStorageSync("isGetUserInfo")) {
            this.setData({
                showModal: "show"
            });
        }
        if(wx.getStorageSync("oid")){
            wx.redirectTo({
                url: '/pages/admin/index',
            })
        }
    },
    modalAccept: function(e) {
        console.log(e.detail.userInfo);
        let that = this;
        wx.request({
            url: getApp().data.root + "main/user/updateUserInfo",
            method: "post",
            data: {
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl,
                uid: wx.getStorageSync("uid")
            },
            success: function(res) {
                console.log(res);
                if (res.data.status === true) {
                    that.setData({
                        showModal: ""
                    });
                    wx.setStorageSync("isGetUserInfo", true);
                } else {
                    wx.showToast({
                        title: "服务器异常！"
                    });
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

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
    onShareAppMessage: function() {},
    /**
     * 部长跳转
     */
    isadmin: function(e) {
          var url = "/pages/index/adminLog/adminlog";
        // var url = "/pages/admin/publishSign/publishSign";
        // var url = "/pages/admin/interviewManage/index";
        
        wx.navigateTo({
            url: url
        });
    },
    isrookie(e) {
        var url = "/pages/rookie/index/index";
        wx.switchTab({
            url: url
        });
    },
    goto: function(e) {
        wx.redirectTo({
            url: "/pages/rookie/interviewDetail/queue/index"
        });
    }
});