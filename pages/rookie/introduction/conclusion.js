// pages/rookie/recruitConclusion/conclusion.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oid:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.setData({
            oid : options.oid
        })
        wx.showLoading({
            title: '加载中...',
        })
        let that = this;
        wx.request({
            url: getApp().data.root + 'main/organizations/getOneInfo?oid=' + options.oid,
            success(res) {
                if (res.data.status) {
                    that.setData({
                        orgInfo: res.data.data
                    })
                    wx.request({
                        url: getApp().data.root + 'main/organizations/getAvailableSignInfo?oid=' + options.oid,
                        success(res) {
                            if (res.data.status) {
                                that.setData({
                                    signInfo: res.data.data
                                })
                            }
                        }
                    })
                    wx.hideLoading()
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            }
        })
    },
    gotorecruitdetail: function(e) {
        console.log(e)
        var url = "/pages/rookie/recruit/detail/detail";
        wx.navigateTo({
            url: url + '?sid=' +  e.currentTarget.dataset.sid + '&orgName=' + this.data.orgInfo.name
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})