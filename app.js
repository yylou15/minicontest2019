//app.js
App({
    data:{
      root:'https://mini.lou-yy.com/',
      ws_root:'wss://mini.lou-yy.com/wss'
    },
    onLaunch: function () {
      // 展示本地存储能力
      // var logs = wx.getStorageSync('logs') || []
      // logs.unshift(Date.now())
      // wx.setStorageSync('logs', logs)
        if(!wx.getStorageSync('uid')){
            // 登录
            wx.login({
                success:res=>{

                    wx.request({
                        url: this.data.root + 'api/wx/login',
                        method: 'post',
                        data: {
                            code: res.code
                        },
                        success: res => {
                            if (res.data.status === true) {
                                wx.setStorageSync('uid', res.data.uid);
                            } else {

                            }
                        }
                    })
                    }
            })
        }
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                  console.log(res)
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    },
    globalData: {
      userInfo: null
    },
})
