// pages/admin/component/my/updateOrgInfo/updateOrgInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orgInfo:{},
        oid: wx.getStorageSync('oid')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrgInfo();
    },
    update(e){
        if (!e.detail.value.code || !e.detail.value.name){
            wx.showToast({
                title: '组织名称和登录码为必填项！',
                icon: 'none'
            })
            return
        }
        e.detail.value.oid = wx.getStorageSync('oid')
        wx.request({
            url: getApp().data.root + 'main/organizations/updateInfo',
            method:"post",
            data:e.detail.value,
            success(res){
                wx.showToast({
                    title: '修改成功！',
                })
                wx.navigateBack({
                    delta: -1
                })
            }
        })
    },
    getOrgInfo() {
        let that = this;
        wx.request({
            url: getApp().data.root + 'main/organizations/getOneInfo',
            data: {
                oid: wx.getStorageSync("oid")
            }, success(res) {
                that.setData({
                    orgInfo: res.data.data
                })
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