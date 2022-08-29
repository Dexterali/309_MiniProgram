// pages/login/login.js
Page({
    data: {
        account: '123',
        password: '123',
        getInfo: {
            account: "123",
            password: "123",
            authorization: "true"
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


    get_user_info: function () {
        // 获取服务器端用户信息
        /* 
            服务端用户信息包括：
            account 账户
            password 密码
            authorization 是否授权
        */
    },

    // 登录 
    login: function () {
        if (this.data.account.length == 0 || this.data.password.length == 0) {
            wx.showToast({
                title: '账号或密码不能为空',
                icon: 'none',
                duration: 2000
            })
        } else if (this.data.getInfo && this.data.account === this.data.getInfo.account && this.data.password == this.data.getInfo.password) {
            // 这里修改成跳转的页面 
            wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
            })
            // 跳转至管理视频页面
            wx.b=wx.navigateTo({
                url: '/pages/index/index'
            });
        } else {
            console.log("密码错误", this.data)
            wx.showToast({
                title: '账号或密码错误',
                icon: 'error',
                duration: 2000
            })
        }
    },











    wx_login: function () {
        wx.getUserProfile({
            desc: '获取用户的信息', //获取用户的信息
            success: res => { //用户成功授权
                this.setData({
                    nickName: res.userInfo.nickName,
                    touxian: res.userInfo.avatarUrl
                })
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                })
                // 跳转至index页面
                wx.redirectTo({
                    url: '../index/index'
                })
            },
            fail: res => {
                wx.showToast({
                    title: '登录失败',
                    icon: 'error',
                    duration: 2000
                })
            }
        })
    }
})