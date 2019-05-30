// pages/rookie/signup/signup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.fetchData()
    },
    cancelSign(e) {
        let that = this
        wx.showModal({
            title: '取消',
            content: '确定取消报名吗？',
            success(res){
                if(res.confirm){
                    wx.showLoading({
                        title: '加载中'
                    })

                    wx.request({
                        url: getApp().data.root + '/main/user/cancelSign',
                        method: 'POST',
                        data:{
                            uid : wx.getStorageSync('uid'),
                            sid : e.currentTarget.dataset.sid
                        },
                        success(res){
                            console.log(res.data)
                            if(res.data.status){
                                that.fetchData()
                            }
                        },complete(){
                            wx.hideLoading()
                        }
                    })
                }
            }
        })
    },
    fetchData(){
        wx.showLoading({
            title: '加载中',
        })
        let that = this;
        wx.request({
            url: getApp().data.root + '/main/user/getSignList',
            data: {
                uid: wx.getStorageSync("uid")
            },
            success(res) {
                that.setData({
                    signList: res.data
                })
                wx.hideLoading()
                console.log(res.data)
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