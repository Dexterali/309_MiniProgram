// pages/booking/booking.js
import { POST } from "../../utils/request";
import { formatDate, formatMinutes } from "../../utils/date_util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        booking: {
            name: '',
            ID: '',
            phoneNumber: "",
            // dateStart: new Date().toLocaleString("zh-CN", formater),
            dateStart: formatDate(new Date()),
            dateEnd: formatDate(new Date(new Date().getTime() + 7 * (1000 * 60 * 60 * 24))),
            // date: new Date().toLocaleString("zh-CN", formater),
            date: formatDate(new Date()),
            timeStart: '06:00',
            timeEnd: '22:00',
            time: formatMinutes(new Date()),

            // 解决预约过去的时间问题，页面加载时，获取当前时间，如果提交的预约时间小于当前时间，则提示出错
            nowTime: "",
        },
        getInfo: {
            password: "",
        }
    },

    selectDate: function (event) {
        console.log('picker发送选择改变，携带值为', event.detail)
        this.setData({
            // 'booking.date': new Date(event.detail.value).toLocaleString("zh-CN", formater)
            'booking.date': formatDate(new Date(event.detail.value))
        })
    },

    selectTime: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            'booking.time': e.detail.value
        })
    },

    submit(event) {
        const { detail } = event;
        console.log(detail);
        console.log(this.data.nowTime);
        const { values, errors, isValidate } = detail;

        const { bookName, bookPhoneNumber, bookDate, bookTime } = values;
        if (bookName === "" || bookPhoneNumber == "") {
            wx.showModal({
                cancelColor: "black",
                confirmColor: "red",
                title: '请填写完整',
                content: "姓名或联系方式未填写！",
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (Date.parse(bookDate + " " + bookTime + ":00") <= this.data.nowTime) {
            // 解决预约过去的时间问题，页面加载时，获取当前时间，如果提交的预约时间小于当前时间，则提示出错
            wx.showModal({
                cancelColor: "black",
                confirmColor: "red",
                title: '选择了错误的时间',
                content: "不可预约过去的时间！",
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            });
        } else {
            /* 
                detail 返回三个参数
                1、values: 各表单项的value值
                2、errors: 各表单项验证后的返回的错误信息数组
                3、isValidate: 表单是否验证通过的boolean值
                具体格式示例：
                detail = {
                    values: {
                        studentName: "",
                        studentAge: "",
                        studentAddress: ""
                    },
                    errors: {
                        studentName: [],
                        studentAge: [],
                        studentAddress: []
                    },
                    isValidate: true
                }
                values 就是我们提交到服务器的信息，等价于下面
                submitInfo: {
                    bookID: "",
                    bookName: "",
                    bookDate: "",
                    bookTime: "",
                    timeLong: "",
                }, 
            */
            const submitInfo = {
                bookID: this.data.ID,
                bookName: values.bookName,
                bookPhoneNumber: values.bookPhoneNumber,
                // // 格式化日期: yyyy-MM-dd HH:MM:SS
                bookDate: values.bookDate + " " + values.bookTime + ":00",
                timeLong: values.timeLong,
            };
            if (isValidate) {
                const that = this;
                console.log(submitInfo);
                POST("http://172.24.33.99:3030/", "user/order", submitInfo)
                    .then(res => {
                        // 服务端返回数据格式如下
                        /* 
                            {
                                "code": 200,
                                "msg": "success",
                                "data": {
                                    "fieldCount": 0,
                                    "affectedRows": 1,
                                    "insertId": 0,
                                    "serverStatus": 2,
                                    "warningCount": 0,
                                    "message": "",
                                    "protocol41": true,
                                    "changedRows": 0
                                },
                                "password": "i0Kfifb5No"
                            }
                        */
                        console.log(res);
                        const { password, code } = res.data;
                        if (code === 200) {
                            //存储返回的密码
                            that.setData({
                                'getInfo.password': password,
                            })

                            //提示用户预约成功
                            wx.showModal({
                                cancelColor: "black",
                                confirmColor: "red",
                                title: '提交成功-你的密码',
                                content: password,
                                success(res) {
                                    if (res.confirm) {
                                        // console.log('用户点击确定')
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    } else if (res.cancel) {
                                        // console.log('用户点击取消')
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }
                                }
                            })
                        } else {
                            //提示用户预约失败的原因：预约冲突和重复预约
                            const { msg } = res.data;
                            wx.showModal({
                                cancelColor: "black",
                                confirmColor: "red",
                                title: msg,
                                success(res) {
                                    if (res.confirm) {
                                        // console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        // console.log('用户点击取消')
                                    }
                                }
                            })
                        }
                    });
            } else {
                //验证表单失败
                console.log(errors);
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { account } = options;
        this.setData({
            nowTime: new Date().getTime(),
            ID: account,
        })
        console.log(this.data.ID)
        wx.lin.initValidateForm(this)
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