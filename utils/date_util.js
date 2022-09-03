// 日期显示格式
const formater = { weekday: 'short', year: '2-digit', month: 'long', day: 'numeric' };
// 格式化日期: yyyy-MM-dd
function formatDate(date) {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
}

// 两位数自动补零
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 格式化日期: yyyy-MM-dd HH:MM:SS
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + " " + [hour, minute, second].map(formatNumber).join(':')
}

// 格式化日期: HH:MM
function formatMinutes(date) {
    var hour = date.getHours()
    var minute = date.getMinutes()
    return [hour, minute].map(formatNumber).join(':')
}

// 格式化日期: HH:MM:SS
function formatSecond(date) {
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [hour, minute, second].map(formatNumber).join(':')
}

export {
    formater,
    formatDate,
    formatTime,
    formatMinutes,
    formatSecond,
}
