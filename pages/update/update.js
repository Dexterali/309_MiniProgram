// pages/update/update.js
import { POST } from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        account: "",
    },

    submit(event) {
        const { detail } = event;
        const { values, errors, isValidate } = detail;

        const submitInfo = {
            account: this.data.account,
            newPwd: values.infoPwd,
        };
        if (isValidate) {
            const that = this;
            console.log(submitInfo);
            POST("http://172.24.33.99:3030/", "user/updatepwd", submitInfo)
                .then(res => {
                    console.log(res);
                    const { code } = res.data;
                    if (code === 200) {
                        wx.showModal({
                            cancelColor: "black",
                            confirmColor: "red",
                            title: '修改成功！',
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
                        wx.showModal({
                            cancelColor: "black",
                            confirmColor: "red",
                            title: "修改失败！",
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

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { account } = options;
        this.setData({
            account: account,
        })
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