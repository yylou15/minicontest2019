// pages/admin/my/my.js
Component({
    /**
     * 组件的属性列表
     */
    options:{
        addGlobalClass:true
    },
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        orgInfo:{},
        
    },
    lifetimes:{
        attached() {
            // 水波纹动画
            let next = true;
            setInterval(
                    function () {
                        if (next) {
                            //导出动画数据传递给组件的animation属性。
                            this.setData({
                                waveAnimation: wx
                                    .createAnimation({
                                        duration: 2000,
                                        timingFunction: "linear",
                                        delay: 0,
                                        transformOrigin: "50% 50%"
                                    })
                                    .scale(2)
                                    .opacity(0)
                                    .step()
                                    .export()
                            });
                            next = !next;
                        } else {
                            //导出动画数据传递给组件的animation属性。
                            this.setData({
                                waveAnimation: wx
                                    .createAnimation({
                                        duration: 1,
                                        timingFunction: "linear",
                                        delay: 0,
                                        transformOrigin: "50% 50%"
                                    })
                                    .scale(1)
                                    .opacity(1)
                                    .step()
                                    .export()
                            });
                            next = !next;
                        }
                    }.bind(this),
                    2000
            );

            this.getOrgInfo()
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getOrgInfo(){
            let that = this;
            this.setData({
                orgInfo: {}
            })
            wx.request({
                url: getApp().data.root + 'main/organizations/getOneInfo',
                data:{
                    oid : wx.getStorageSync("oid")
                },success(res){
                    that.setData({
                        orgInfo: res.data.data
                    })
                }
            })
        },
        updataOrgInfo(){
            wx.navigateTo({
                url: 'component/my/updateOrgInfo/updateOrgInfo',
            })
        },
        uploadOrgBanner(){
            let that = this;
            wx.chooseImage({
                count:1,
                success: function (res) {
                    wx.showLoading({
                        title: '上传中...',
                    })
                    wx.uploadFile({
                        url: getApp().data.root + 'main/organizations/uploadBanner',
                        filePath: res.tempFilePaths[0],
                        name: 'banner',
                        formData:{
                            oid : wx.getStorageSync('oid')
                        },
                        success(res){
                            if(JSON.parse(res.data).status == true){
                                wx.showToast({
                                    title: '上传成功',
                                })
                                that.getOrgInfo()
                                wx.hideLoading()
                            }else{
                                wx.showToast({
                                    title: res.data.msg,
                                })
                                wx.hideLoading()
                            }
                        }
                    })
                },
            })
        },
        gotoManage(){
            wx.navigateTo({
                url: 'component/my/manageSignInfo/manageSignInfo',
            })
        }
    }
})
