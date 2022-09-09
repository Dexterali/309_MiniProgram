// pages/booking_info/booking_info.js
import { formatDate, formatTime } from "../../utils/date_util";
import { GET } from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        listInfo: [],
        // 从listinfo中获得的时间数据，用于美化
        cpTime: [],
        show: false,
    },

    // date 格式为 yyyy-mm-dd
    getInfo: function (date) {
        const that = this;

        GET("http://172.24.33.99:3030/", "user/info", { date: date })
            .then(res => {
                console.log(res);
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
                            },
                            {
                                "studentid": "201911081906",
                                "studentname": "111",
                                "phonenumber": "18801313239",
                                "bookdate": "2020-09-30T13:08:01.000Z",
                                "timelong": "3",
                                "isorder": 1,
                                "password": null
                            },
                            {
                                "studentid": "201911081907",
                                "studentname": "2222",
                                "phonenumber": "18801313239",
                                "bookdate": "2020-09-30T13:08:01.000Z",
                                "timelong": "3",
                                "isorder": 0,
                                "password": null
                            },
                            {
                                "studentid": "201911081910",
                                "studentname": "小李",
                                "phonenumber": "18801313239",
                                "bookdate": "2020-09-30T13:08:01.000Z",
                                "timelong": "2",
                                "isorder": 1,
                                "password": "t67WW5toqG"
                            }
                        ]
                    }
                */
                const { data, code } = res.data;
                if (code === 200 && data.length !== 0) {
                    that.setData({
                        listInfo: data,
                        show: true,
                    })
                }
                // 美化显示时间
                const cpTime = that.data.listInfo.map(item => formatTime(new Date(item.bookdate)));
                that.setData({
                    cpTime,
                })
            });
    },

    //获取选择的日历数据
    onMyEvent: function (e) {
        // 获取数据之前先把旧数据置空
        this.setData({
            listInfo: [],
            cpTime: [],
            show: false,
        })
        console.log('选择的日期:', e.detail);
        const date = e.detail.data;
        const that = this;

        GET("http://172.24.33.99:3030/", "user/info", { date: date })
            .then(res => {
                console.log(res);
                const { data, code } = res.data;
                if (code === 200 && data.length !== 0) {
                    that.setData({
                        listInfo: data,
                        show: true,
                    })
                }
                // 美化显示时间
                const cpTime = that.data.listInfo.map(item => formatTime(new Date(item.bookdate)));
                that.setData({
                    cpTime,
                })
            });
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