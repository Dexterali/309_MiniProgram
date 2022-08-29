// pages/my_booking/my_booking.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        getInfo: {
            password: "123",
            date: "2022-9-10",
            timeLong: "1",
        }
    },

    showBookingInfo: function () {
        const that = this;
        wx.showModal({
            cancelColor: "black",
            confirmColor: "red",
            title: '你的密码',
            content: that.data.getInfo.password,
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const that = this;
        wx.request({
            url: '#',
            method: 'GET',
            header: {
                'content-type': 'application/json',
            },
            success(res) {
                const { data, code } = res.data;
                if (code === 200) {
                    //存储返回的密码
                    that.setData({
                        getInfo: data,
                    })
                }
            },
            fail(err) {
                // 获取预约信息失败
                console.log(err);
            }
        });
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

    }
})