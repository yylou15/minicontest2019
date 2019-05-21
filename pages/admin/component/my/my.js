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
        orgInfo:{}
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
            console.log(111)
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
        }
    }
})
