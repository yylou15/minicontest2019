// pages/admin/interviewManage/index.js
let app = getApp();
Page({
    data: {
        queueList: [],
        queueListInfo: [],
        isRecording: false,
        interviewId: '',
        remark: ''
    },
    onLoad: function(options){
        console.log(options)
        this.setData({
            interviewId: options.iid
        })
    },
    onShow: function(options) {
        // this.getQueue()
        this.openSocket()
        this.setData({
            recorderManager: wx.getRecorderManager()
        })
        // 录音配置
        let that = this;
        this.data.recorderManager.onStop((res) => {
            wx.uploadFile({
                url: app.data.root + 'main/interviews/uploadVoiceRecord',
                filePath: res.tempFilePath,
                name: 'voice',
                formData: {
                    interviewId: that.data.interviewId,
                    interviewee: that.data.nowInterviewee,
                    remark: that.data.remark
                },
                success(res) {
                    that.setData({
                        remark: ''
                    })
                    if (res.data.status == true) {
                        wx.sendSocketMessage({
                            data: JSON.stringify({
                                type: 'completeOne',
                                content: {
                                    interviewId: that.data.interviewId,
                                    interviewee: that.data.nowInterviewee
                                }
                            }),
                            success: function(res) {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '成功',
                                })
                            }
                        })
                    }
                }
            })
        })
        this.data.recorderManager.onFrameRecorded((res) => {
            const {
                frameBuffer
            } = res
        })

    },
    back() {
        wx.navigateBack({
            delta: -1
        })
    },
    getQueue() {
        let that = this;
        wx.request({
            url: app.data.root + 'main/interviews/getQueue',
            data: {
                // 这里要改
                interviewId: that.data.interviewId
            },
            success(res) {
                that.setData({
                    queueList: res.data
                })
                that.getList()
            }
        })
    },
    getList() {
        // getList
        let that = this;
        wx.request({
            url: app.data.root + 'main/user/getUsersInfoByUid',
            data: {
                uids: that.data.queueList.join(',')
            },
            success(res) {
                that.setData({
                    queueListInfo: res.data.data.reverse()
                })
                if (that.data.queueList.length) {
                    that.setData({
                        // 这个要改
                        nowInterviewee: that.data.queueListInfo[that.data.queueList.length - 1].uid
                    })
                }
            }
        })
    },
    startRecord() {
        this.setData({
            isRecording: true
        })

        this.data.recorderManager.start({
            format: 'mp3'
        })
    },
    comleteInterview() {
        let that = this;
        wx.showLoading({
            title: '加载中...',
        })
        if (this.data.isRecording) {
            this.setData({
                isRecording: false
            })
            this.data.recorderManager.stop()
        } else {
            wx.request({
                url: app.data.root + 'main/interviews/submitInterViewInfo',
                method: 'post',
                data: {
                    remark: that.data.remark,
                    interviewId: that.data.interviewId,
                    interviewee: that.data.nowInterviewee,
                },
                success(res) {
                    wx.sendSocketMessage({
                        data: JSON.stringify({
                            'type': 'leaveTroop',
                            'content': {
                                'interview_id': that.data.interviewId,
                                'uid': that.data.nowInterviewee
                            }
                        }),
                        success: function (res) {
                            wx.hideLoading()
                            wx.showToast({
                                title: '成功',
                            })

                        }
                    })
                }
            })
        }
    },
    openSocket() {
        let that = this;
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
        wx.onSocketMessage(function(res) {
            res = JSON.parse(res.data);
            if (res.type == 'troopList') {
                that.setData({
                    queueList: res.content.split(',')
                })
                if (that.data.queueList.length && that.data.queueList[0] == ''){
                    that.setData({
                        queueList : []
                    })
                }
                that.getList()
            }
        })
        wx.onSocketClose(function() {
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
    onUnload(){
        wx.closeShocket({
            
        })
    },
    textareaAInput(e) {
        this.setData({
            remark: e.detail.value
        })
    }
})