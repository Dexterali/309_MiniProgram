// pages/booking/booking.js
import { formatDate, formater } from "../../utils/date_util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        booking: {
            name: '',
            ID: '',
            // dateStart: new Date().toLocaleString("zh-CN", formater),
            dateStart: formatDate(new Date()),
            dateEnd: formatDate(new Date(new Date().getTime() + 7 * (1000 * 60 * 60 * 24))),
            // date: new Date().toLocaleString("zh-CN", formater),
            date: formatDate(new Date()),
            timeStart: '09:01',
            timeEnd: '24:00',
            time: '12:01',
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

    writeDate: function (event) {
        console.log("aaaaaaaa", event);
    },

    submit(event) {
        const { detail } = event;
        console.log(detail);
        const { values, errors, isValidate } = detail;

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

        if (isValidate) {
            const that = this;
            wx.request({
                url: '#',
                method: 'POST',
                header: {
                    'content-type': 'application/json',
                },
                data: values,
                success(res) {
                    const { data, code } = res.data;
                    if (code === 200) {
                        //存储返回的密码
                        that.setData({
                            'getInfo.password': data.password,
                        })

                        //提示用户预约成功
                        wx.showModal({
                            cancelColor: "black",
                            confirmColor: "red",
                            title: '提交成功-你的密码',
                            content: data.password,
                            success(res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                },
                fail(err) {
                    // 预约失败
                    console.log(err);
                }
            });
        } else {
            //验证表单失败
            console.log(errors);
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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