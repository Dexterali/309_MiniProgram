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

export {
    formater,
    formatDate,
}