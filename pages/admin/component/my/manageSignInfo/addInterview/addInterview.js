// pages/admin/component/my/manageSignInfo/addInterview/addInterview.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        time: (new Date).getHours() + ':' + ((new Date).getMinutes() <= 9 ? '0' + (new Date).getMinutes() : (new Date).getMinutes()),
        date: (new Date).getFullYear() + '-' + (new Date).getMonth() + '-' + (new Date).getDay(),

    },
    TimeChange(e) {
        this.setData({
            time: e.detail.value
        })
    },
    DateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },
    addInterview(e) {
        console.log(e.detail.value)
        e.detail.value.sid = this.data.sid;
        wx.request({
            url: getApp().data.root + 'main/interviews/create',
            method: "post",
            data: e.detail.value,
            success(res) {
                if(res.data.status){
                    wx.showToast({
                        title: '提交成功',
                        success(){
                            wx.navigateBack({
                                delta:-1
                            })
                        }
                    })
                }else{
                    wx.showToast({
                        title: "地点时间为必填项",
                        icon: 'none'
                    })
                }
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            sid: options.sid
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