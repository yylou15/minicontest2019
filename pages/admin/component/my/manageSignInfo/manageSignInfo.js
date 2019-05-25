// pages/admin/component/my/manageSignInfo/manageSignInfo.js
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
        // this.getSignList()
    },
    getSignList() {
        wx.showLoading({
            title: '加载中',
        })
        let that = this;
        wx.request({
            url: getApp().data.root + 'main/organizations/getAllSignInfo',
            data: {
                oid: wx.getStorageSync('oid')
            },
            success(res) {
                that.setData({
                    signList:res.data.data
                })
                wx.hideLoading()
            }
        })
    },
    delSign(e){
        let that = this;
        let list = this.data.signList;
        let index = e.currentTarget.dataset.index;
        wx.showModal({
            title: '删除报名',
            content: '确认删除吗？确认后无法恢复',
            success(res){
                if(res.confirm){
                    wx.request({
                        url: getApp().data.root + 'main/organizations/delSign',
                        method: "post",
                        data: {
                            sid: list[e.currentTarget.dataset.index].sid
                        }, success(res) {
                            if (res.data.status) {
                                that.getSignList()
                            }
                        }
                    })
                }
            }
        })
    },
    gotoAdd(e) {
        wx.navigateTo({
            url: 'addInterview/addInterview?sid=' + this.data.signList[e.currentTarget.dataset.index].sid,
        })
    },
    gotoStart(e){
        let iid = e.currentTarget.dataset.iid;
        console.log(iid)
        wx.navigateTo({
            url: '/pages/admin/interviewManage/index?iid=' + iid,
        })
    },
    startSign(e) {
        let that = this;
        let list = this.data.signList;
        let index = e.currentTarget.dataset.index;
        wx.request({
            url: getApp().data.root + 'main/organizations/startSignUp',
            method: "post",
            data: {
                sid: list[index].sid
            }, success(res) {
                if (res.data.status) {
                    that.getSignList()
                }
            }
        })
    },
    stopSign(e) {
        let that = this;
        let list = this.data.signList;
        let index = e.currentTarget.dataset.index;
        wx.request({
            url: getApp().data.root + 'main/organizations/endSignUp',
            method: "post",
            data: {
                sid: list[index].sid
            }, success(res) {
                if (res.data.status) {
                    that.getSignList()
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
        this.getSignList()
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