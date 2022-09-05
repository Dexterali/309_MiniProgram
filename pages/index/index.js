// index.js
import { formatDate } from "../../utils/date_util";

Page({
	data: {
		account: "",
		listInfo: {
			date: formatDate(new Date()),
		},
	},

	go_booking: function () {
		wx.navigateTo({
			url: `/pages/booking/booking?account=${this.data.account}`,
		})
	},

	go_bookingInfo: function () {
		wx.navigateTo({
			url: '/pages/booking_info/booking_info',
		})
	},

	go_myBooking: function () {
		wx.navigateTo({
			url: `/pages/my_booking/my_booking?account=${this.data.account}`,
		})
	},

	go_about: function () {
		wx.navigateTo({
			url: '/pages/about/about',
		})
	},

	go_update_pwd: function() {
		wx.navigateTo({
			url: `/pages/update/update?account=${this.data.account}`,
		})
	},

	onLoad(options) {
		const { account } = options;
		this.setData({
			account
		})
	}
})
