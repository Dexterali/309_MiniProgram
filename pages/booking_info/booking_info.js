// pages/booking_info/booking_info.js
import {formatDate} from "../../utils/date_util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        listInfo: [
            {
                user: "李文举",
                time: "12:00",
                timeLong: "0.5"
            },
            {
                user: "李文举",
                time: "12:00",
                timeLong: "0.5"
            },
            {
                user: "李文举",
                time: "12:00",
                timeLong: "0.5"
            },
            {
                user: "李文举",
                time: "12:00",
                timeLong: "0.5"
            }
        ]
    },

    // date 格式为 yyyy-mm-dd
    getInfo: function (date) {
        const that = this;
        wx.request({
            url: '#',
            method: 'GET',
            header: {
                'content-type': 'application/json',
            },
            data: {
                date
            },
            //获取当日预约信息
            success(res) {
                const { data, code } = res.data;
                if (code === 200) {
                    that.setData({
                        listInfo: data,
                    })
                }
            },
            // 获取预约信息失败
            fail(err) {
                console.log(err);
            }
        });
    },

    //获取选择的日历数据
    onMyEvent: function (e) {
        console.log('选择的日期:', e.detail);
        const date = e.detail.date;
        this.getInfo(date);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getInfo(formatDate(new Date()))
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