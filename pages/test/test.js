// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '2016-09-01',
        time: '12:01',
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },

        // 获取每日一句
        get_yiju: function () {
            const that = this;
            wx.request({
                url: 'https://saying.api.azwcl.com/saying/get', //词霸接口地址
                // data: {
                //   x: '',
                //   y: ''
                // },
                header: {
                    'content-type': 'application/json', // 默认值
                },
                success(res) {
                    // console.log(res.data)
                    const { data, code } = res.data;
                    if (code === 200) {
                        that.setData({
                            showInfo: {
                                foryoo: {
                                    author: data.author,
                                    content: data.content,
                                }
                            }
                        })
                    }
                },
                fail(err) {
                    console.log(err);
                }
            });
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

    }
})