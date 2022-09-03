function POST(baseAPI, url, params) {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: baseAPI + url,
            data: params,
            header: {
                'content-type': 'application/json',
            },
            method: 'POST',
            success: (res) => {
                //接收返回的值
                resolve(res)
            },
            fail: (res) => {
                //拒绝返回的值
                reject(res)
            },
        })
    });
    return promise;
}

function GET(baseAPI, url, params) {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: baseAPI + url,
            data: params,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            method: 'GET',
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    });
    return promise
}
export {
    POST,
    GET,
}