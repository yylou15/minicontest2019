// pages/rookie/recruit/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    question: function(e) {
        var url = "/pages/rookie/recruit/quesitionaire/question";
        wx.navigateTo({
            url: url
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            sid: options.sid,
            orgName: options.orgName
        })
        console.log(options.sid)
        wx.showLoading({
            title: '加载中...',
        })
        let that = this;
        wx.request({
            url: getApp().data.root + 'main/organizations/getOneSignInfo?sid=' + options.sid,
            success(res) {
                if (res.data.status) {
                    if(res.data.data.requirements){
                        res.data.data.requirements = res.data.data.requirements.split('@^') 
                    }
                    that.setData({
                        signInfo : res.data.data
                    })
                    console.log(that.data.signInfo)
                    wx.hideLoading()
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '网络异常',
                        icon:'none'
                    })
                }
            }
        })
        // 查询是否报名
        wx.request({
            url: getApp().data.root + 'main/user/ifSign',
            data:{
                sid : options.sid,
                uid : wx.getStorageSync('uid')
            },
            success(res){
                if(res.data == true){
                    that.setData({
                        hasSigned : true
                    })
                }
            }
        })
    },
    sign(){
        wx.showLoading({
            title: '提交中...',
        })
        let that = this
        wx.request({
            url: getApp().data.root + 'main/user/sign',
            data: {
                sid: this.data.sid,
                uid: wx.getStorageSync('uid')
            },
            success(res) {
                if (res.data.status == true) {
                    that.setData({
                        hasSigned: true
                    })
                    wx.hideLoading()
                    wx.showToast({
                        title: '成功！',
                    })
                }else{
                    wx.showToast({
                        title: '已超过该组织的最大报名数！',
                    })
                }
            }
        })
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