// pages/login/login.js
import { GET } from "../../utils/request";

Page({
    data: {
        account: '',
        password: '',
        getInfo: {
            account: "",
            password: "",
            authorization: 0
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    // 获取输入账号 
    accountInput: function (e) {
        this.setData({
            account: e.detail.value
        })
    },

    // 获取输入密码 
    passwordInput: function (e) {
        this.setData({
            password: e.detail.value
        })
    },

    // 登录 
    login: async function () {

        // 获取服务器端用户信息
        /* 
            服务端用户信息包括：
            account 账户
            password 密码
            authorization 是否授权
        
            服务端返回数据格式如下
         
            {
                "code": 200,
                "msg": "success",
                "data": [
                    {
                        "account": "201911081904",
                        "password": "123",
                        "authorization": 1
                    }
                ]
            }
        */
        GET("https://api.huolihang.top:5001/", "user/login", { account: this.data.account })
            .then(res => {
                // 如果服务端出现错误！
                if (res.data.code === 500) {
                    wx.showModal({
                        cancelColor: "black",
                        confirmColor: "red",
                        title: "网络错误！",
                        content: "请联系管理员：18801313238",
                        success(res) {
                            if (res.confirm) {
                                // console.log('用户点击确定')
                            } else if (res.cancel) {
                                // console.log('用户点击取消')
                            }
                        }
                    })
                }
                this.setData({
                    getInfo: res.data.data[0],
                })
                if (this.data.account.length == 0 || this.data.password.length == 0) {
                    wx.showToast({
                        title: '账号或密码不能为空',
                        icon: 'none',
                        duration: 2000
                    })
                } else if (this.data.getInfo.authorization === 1 && this.data.account === this.data.getInfo.account && this.data.password == this.data.getInfo.password) {
                    // 这里修改成跳转的页面 
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    })
                    // 跳转至管理视频页面
                    wx.navigateTo({
                        url: `/pages/index/index?account=${this.data.account}`
                    });
                } else {
                    console.log("密码错误", this.data)
                    wx.showToast({
                        title: '账号或密码错误',
                        icon: 'error',
                        duration: 2000
                    })
                }
            })
    },
})