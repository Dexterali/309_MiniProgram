// 时间格式转换 yyyy－mm－dd
function formatTime2(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-')
}

// 时间格式转换 yyyy/mm/dd
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 两位数自动补零
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 计算变化多少天后的日期
function DateAddDay(d, days) {
    var d = new Date(d);
    return new Date(d.setDate(d.getDate() + days));
}

// 获得本周周日的日期
function FirstDayInThisWeek(d) {
    var d = new Date(d);
    return DateAddDay(d, 0 - d.getDay());
}

module.exports = {
    formatTime,
    formatTime2,
    DateAddDay,
    addZero: formatNumber,
    FirstDayInThisWeek
}