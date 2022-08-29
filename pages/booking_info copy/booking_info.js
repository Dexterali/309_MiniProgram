// pages/booking_info/booking_info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateList: [],
        // 页面总高度将会放在这里
        windowHeight: 0,
        calendarWeekHeight: 0,
        // scroll-view的高度
        scrollViewHeight: 0,

        hour_titles: Array.from({ length: 18 }).map(function (value, index) {
            let hour = (index + 6) % 24;
            return ((hour < 10) ? "0" : "") + hour + ":00";
        }),
        bar_item_sizes: Array.from({ length: 18 }).map(function () {
            return {
                width: 1,
                height: 1
            }
        }),

        testData: [
            { "key": "测试1", "top": 1, "height": 1 },
            { "key": "测试2", "top": 2, "height": 2 },
            { "key": "测试3", "top": 2, "height": 3 },
            { "key": "测试5", "top": 10, "height": 4 },
            { "key": "测试6", "top": 1, "height": 4 },
            { "key": "测试7", "top": 30, "height": 5 },
            { "key": "测试4", "top": 5, "height": 10 },
        ],
    },

    // 获取这周从周日到周六的日期
    calculateDay() {
        let dateList = [];
        for (let index = 0; index < 7; index++) {
            let date = new Date(new Date().getTime() + index * (1000 * 60 * 60 * 24));
            let weekday = date.getDay();
            let day = date.getDate();
            dateList.push({
                weekday,
                day,
            })
        }
        return dateList;
    },

    //获取选择的日历数据
    onMyEvent: function (e) {
        console.log('选择的日期:', e.detail);
    },

    //获取组件高度
    getHeader: function (e) {
        console.log('获取日历组件的高度:', e.detail);
        let calendarWeekHeight = e.detail;
        wx.getSystemInfo({
            success: res => {
                this.data.windowHeight = res.windowHeight;
            }
        });

        let scrollViewHeight = this.data.windowHeight - calendarWeekHeight;
        console.log("scrollViewHeight = ", scrollViewHeight);
        // 算出来之后存到data对象里面
        this.setData({
            scrollViewHeight: scrollViewHeight
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const dateList = this.calculateDay();
        this.setData({
            dateList
        })
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