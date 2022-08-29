// index.js
import {formatDate} from "../../utils/date_util";

Page({
    data: {
        listInfo: {
            date: formatDate(new Date()),
        },
    },

    go_booking: function () {
        wx.navigateTo({
          url: '/pages/booking/booking',
        })
    },

    go_bookingInfo: function () {
        wx.navigateTo({
          url: '/pages/booking_info/booking_info',
        })
    },

    go_myBooking: function () {
        wx.navigateTo({
          url: '/pages/my_booking/my_booking',
        })
    },

    go_about: function () {
        wx.navigateTo({
          url: '/pages/about/about',
        })
    },
})
