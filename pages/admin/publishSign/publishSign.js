// pages/admin/publishSign/publishSign.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: 0,
        // 步骤条
        numList: [{
            name: '基本信息'
        }, {
            name: '所需信息'
        }, {
            name: '完成发布'
        }, ],
        // 要求
        requirements: [
            '会XXXX'
        ],
        // showLoading: 'cuIcon-loading2',
        showLoading: '',
        isSelected1: false,
        isSelected2: false,
        isSelected3: false,
        isSelected4: false,
        isSelected5: false,
        isSelected6: false,
        isSelected7: false,
        isSelected8: false,
        isSelected9: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    // 下一步
    numSteps() {
        if (this.data.currentStep == 3) {
            return
        }
        this.setData({
            num: this.data.num == this.data.numList.length - 1 ? this.data.num : this.data.num + 1
        })
    },
    // 新增要求
    addReq() {
        let old = this.data.requirements;
        old.push('')
        this.setData({
            requirements: old
        })
    },

    // 新增要求
    delReq() {
        let old = this.data.requirements;
        if(!old.length)
            return
        old.pop()
        this.setData({
            requirements: old
        })
    },

    handleGridItemClick(e) {
        switch (e.currentTarget.dataset.itemid) {
            case 'name':
                this.setData({ isSelected1: !this.data.isSelected1 })
                break;
            case 'phone':
                this.setData({ isSelected2: !this.data.isSelected2 })
                break;
            case 'email':
                this.setData({ isSelected3: !this.data.isSelected3 })
                break;
            case 'CSUid':
                this.setData({ isSelected4: !this.data.isSelected4 })
                break;
            case 'sex':
                this.setData({ isSelected5: !this.data.isSelected5 })
                break;
            case 'major':
                this.setData({ isSelected6: !this.data.isSelected6 })
                break;
            case 'qq':
                this.setData({ isSelected7: !this.data.isSelected7 })
                break;
            case 'klass':
                this.setData({ isSelected8: !this.data.isSelected8 })
                break;
            case 'hometown':
                this.setData({ isSelected9: !this.data.isSelected9 })
                break;
        }
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