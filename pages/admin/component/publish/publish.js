// pages/admin/publish/publish.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        addGlobalClass: true,
    },

    /**
     * 组件的初始数据
     */
    data: {
        num: 0,
        // 步骤条
        numList: [{
            name: '基本信息'
        }, {
            name: '完成发布'
        },],
        // 要求
        requirements: [
            '会XXXX'
        ],
        // showLoading: 'cuIcon-loading2',
        showLoading: '',
    },
    lifetimes:{
        attached() {
            let that = this
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
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 下一步
        publish(e){
            this.setData({
                showLoading: 'cuIcon-loading2'
            })
            let that = this
            console.log(e.detail.value)
            e.detail.value.oid = wx.getStorageSync('oid')
            wx.request({
                url: getApp().data.root + 'main/organizations/createSignUp',
                data:e.detail.value,
                method:"post",
                success(res){
                    console.log(res)

                    that.setData({
                        showLoading: ''
                    })
                    if(res.data.status == true){
                        that.numSteps()
                    }else{
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                }
            })
        },
        numSteps() {
            if (this.data.currentStep == 2) {
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
        setReq(e){
            let index = e.currentTarget.dataset.index
            let old = this.data.requirements;
            old[index] = e.detail.value
            this.setData({
                requirements: old
            })
        },
        // 新增要求
        delReq() {
            let old = this.data.requirements;
            if (!old.length)
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
    }
})
