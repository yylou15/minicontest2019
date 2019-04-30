// pages/recruit/new_recruit/new_recruit.js
const { $Toast } = require('../../../dist/base/index');
let root = getApp().data.root;
Page({

    /**
     * 页面的初始数据
     */
    data: {
    //步骤条
        current:0,
        buttonText:'下一步',
        isLoading:false,
    //    部门信息
        departmentName:'',
        planAmount:'',
        abstract:'',
        requirement:[],
    //    表单信息
        selectedInfoItem:[],
        isSelected1:false,
        isSelected2:false,
        isSelected3:false,
        isSelected4:false,
        isSelected5:false,
        isSelected6:false,

    },
    onLoad(){

    },
    handleClick(){
        if(this.data.buttonText === '完成'){
        //    提交所有表单
        }else{
            // 部门信息验证
            if(this.data.current === 0){
                if(!this.data.departmentName){
                    $Toast({
                        content: '请输入部门名称',
                        type: 'error'
                    });
                    return
                }
                if(!this.data.planAmount){
                    $Toast({
                        content: '请输入预招人数',
                        type: 'error'
                    });
                    return
                }
                if(!this.data.abstract){
                    $Toast({
                        content: '请输入部门简介',
                        type: 'error'
                    });
                    return
                }
                if(this.data.requirement.indexOf("") > -1){
                    $Toast({
                        content: '请补全招收标准',
                        type: 'error'
                    })
                    return
                }
            }
            // else if(this.data.current === 1){

            // }
            this.setData({
                current:this.data.current + 1
            })
            if(this.data.current === 2){
                this.setData({
                    buttonText:'完成'
                })
            }
        }
    },
    //      部门信息
    handleAddClick(){
        let newRequirement = this.data.requirement;
        let length = this.data.requirement.length;
        length++;
        newRequirement.push('')
        this.setData({
            requirement:newRequirement
        })
    },
    handleDelClick(){
        let length = this.data.requirement.length;
        if(length>0){
            let newRequirement = this.data.requirement;
            console.log(newRequirement)
            newRequirement.splice(length-1,1)
            this.setData({
                requirement:newRequirement
            })
        }
    },
    handleRequireChange(e){
        var require = 'requirement['+ e.currentTarget.dataset.index +']';
        let oldRequirement = this.data.requirement;
        oldRequirement[e.currentTarget.dataset.index] = e.detail.detail.value;
        this.setData({
            require : oldRequirement
        })
    },
    handleFormChange(e){
        console.log(e.currentTarget.dataset.formitem)
        var target = e.currentTarget.dataset.formitem;
        var val = e.detail.detail.value;
        // this.setData({
        //     eval('target') : "124"
        // })
        switch (target) {
            case 'departmentName':
                this.setData({
                    departmentName : val
                })
                break;
            case 'planAmount':
                this.setData({
                    planAmount : val
                })
                break;
            case 'abstract':
                this.setData({
                    abstract : val
                })
                break;
        }
    },
    //      表单信息
    handleGridItemClick(e){
        switch (e.currentTarget.dataset.itemid) {
            case 'name':
                this.setData({ isSelected1 : !this.data.isSelected1})
                break;
            case 'phone':
                this.setData({ isSelected2 : !this.data.isSelected2})
                break;
            case 'email':
                this.setData({ isSelected3 : !this.data.isSelected3})
                break;
            case 'CSUid':
                this.setData({ isSelected4 : !this.data.isSelected4})
                break;
            case 'sex':
                this.setData({ isSelected5 : !this.data.isSelected5})
                break;
            case 'major':
                this.setData({ isSelected6 : !this.data.isSelected6})
                break;
        }
    },
    searchSchoolList(e){
        wx.request({
            url:root + "user/schools/getschools",
            method:"get",
            data:{
                keyword : e.detail.value
            },
            success(res){
                console.log(res.data)
            }
        })
    }
})
