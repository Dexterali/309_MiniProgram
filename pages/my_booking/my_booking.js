// pages/my_booking/my_booking.js
import { GET } from "../../utils/request";
import { formatTime } from "../../utils/date_util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        account: "",
        getInfo: [],
        // 从getinfo中获取的时间数据，用于美化显示
        cpTime: [],
        show: false,
    },

    showBookingInfo: function (event) {
        // console.log(event)
        const index = event.target.dataset.id;
        const that = this;
        wx.showModal({
            cancelColor: "black",
            confirmColor: "red",
            title: '你的密码',
            content: that.data.getInfo[index].password,
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
        const { account } = options;
        // 服务端返回数据格式如下
        /* 
            {
                "code": 200,
                "msg": "success",
                "data": [
                    {
                        "studentid": "201911081904",
                        "studentname": "李文举",
                        "phonenumber": "18801313238",
                        "bookdate": "2020-09-30T13:08:01.000Z",
                        "timelong": "3",
                        "isorder": 1,
                        "password": "SqVcVDfQWz"
                    }
                ]
            }
        */
        GET("https://api.huolihang.top:5001/", "user/myinfo", { account: account })
            .then(res => {
                console.log(res);
                const { data, code } = res.data;
                if (code === 200 && data.length !== 0) {
                    //存储返回的密码
                    that.setData({
                        getInfo: data,
                        show: true,
                    })
                }
                // 美化显示时间
                const cpTime = that.data.getInfo.map(item => formatTime(new Date(item.bookdate)));
                that.setData({
                    cpTime,
                })
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