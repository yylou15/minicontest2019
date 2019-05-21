// pages/rookie/interviewDetail/queue/index.js
let interviewId;
let uid = wx.getStorageSync('uid');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ifQueuing: false,
        troopLength: 0,
        uid: wx.getStorageSync('uid')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(this.data.uid)
        interviewId = 1;
        this.connetWs();
    },
    // ws部分
    connetWs: function() {
        let that = this;
        wx.connectSocket({
            url: getApp().data.ws_root,
            header: {
                'content-type': 'application/json'
            },
            // protocols: ['protocol1'],
            // method: 'GET'
        })
        wx.onSocketMessage(function(res) {
            console.log(res.data)
            res = JSON.parse(res.data);
            switch (res.type) {
                case 'troopLength':
                    that.setData({
                        troopLength: res.content
                    });
                    break;
                case 'troopLength_join':
                    that.setData({
                        troopLength: res.content,
                        // left: res.content - 1
                    });
                    wx.sendSocketMessage({
                        data: JSON.stringify({
                            'type': 'getLeft',
                            'content': {
                                'interview_id': 1,
                                'uid': wx.getStorageSync('uid')
                            }
                        }),
                    });
                    break;
                case 'troopLength_leave':
                    that.setData({
                        troopLength: res.content
                    });
                    if (that.data.ifQueuing) {
                        wx.sendSocketMessage({
                            data: JSON.stringify({
                                'type': 'getLeft',
                                'content': {
                                    'interview_id': 1,
                                    'uid': wx.getStorageSync('uid')
                                }
                            }),
                        })
                    }
                    break;
                case 'getLeft':
                    that.setData({
                        left: res.content
                    });
                    break;

                case 'troopList':
                    if (that.data.troopList != res.content) {
                        that.setData({
                            troopList: res.content
                        })
                        wx.showLoading({
                            title: '获取排队信息...',
                        })
                        wx.request({
                            url: getApp().data.root + 'main/user/getInfoList',
                            data:{
                                userList: res.content
                            },
                            success:function(res){
                                that.setData({
                                    userList : res.data
                                })
                                wx.hideLoading()
                            }
                        })
                    }
                    
                    break;
            }
        })
        wx.onSocketOpen(function() {
            setInterval(function() {
                wx.sendSocketMessage({
                    data: JSON.stringify({
                        'type': 'ping'
                    })
                })
            }, 2000)
            wx.sendSocketMessage({
                data: JSON.stringify({
                    'type': 'getTroopLength',
                    'content': {
                        'interview_id': 1,
                        'uid': wx.getStorageSync('uid')
                    }
                })
            })

            wx.sendSocketMessage({
                data: JSON.stringify({
                    'type': 'setUid',
                    'content': {
                        'interview_id': 1,
                        'uid': wx.getStorageSync('uid')
                    }
                })
            })
        })

        wx.onSocketClose(function () {
            wx.connectSocket({
                url: getApp().data.ws_root,
                header: {
                    'content-type': 'application/json'
                },
                success() {
                    that.getQueue()
                }
                // protocols: ['protocol1'],
                // method: 'GET'
            })
        })
    },
    startQueuing: function() {
        this.setData({
            ifQueuing: true
        })
        wx.sendSocketMessage({
            data: JSON.stringify({
                'type': 'joinTroop',
                'content': {
                    'interview_id': 1,
                    'uid': wx.getStorageSync('uid')
                }
            }),
        })
    },
    cancelQueuing: function() {
        this.setData({
            ifQueuing: false
        })
        wx.sendSocketMessage({
            data: JSON.stringify({
                'type': 'leaveTroop',
                'content': {
                    'interview_id': 1,
                    'uid': wx.getStorageSync('uid')
                }
            }),
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
    onUnload: function() {
        wx.closeSocket({
            url: getApp().data.ws_root
        })
    }
})