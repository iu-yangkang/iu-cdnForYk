
console.log("******* 杨康的油猴工具类已经生效,请尽情享用 *******")
console.log("******* 杨康的油猴工具类已经生效,请尽情享用 *******")
console.log("******* 杨康的油猴工具类已经生效,请尽情享用 *******")
console.log("******* 重要的事情说3遍！！！！！！！！！！ *******")
console.log("******* GM_request函数 封装了油猴 的GM_xmlhttpRequest方法, 可以在当前页面执行跨域请求,支持异步调用，返回 Promise *******")
/**
 * 封装GM_xmlhttpRequest方法
 * @param {string} url 请求URL
 * @param {Object} [options] 请求配置项
 * @param {Object} [options.data] 请求数据，默认为null
 * @param {string} [options.method='GET'] 请求方法，默认为GET
 * @param {Object} [options.headers] 请求头，默认为空对象
 * @returns {Promise} 返回Promise对象
 */
async function GM_request(url, options = {}) {
    return new Promise((resolve, reject) => {
        const method = options.method || 'GET';
        let xhrParams = {
            method,
            url,
            onload: function (response) {
                if (response.status >= 200 && response.status < 400) {
                    resolve(response);
                } else {
                    reject(new Error(`请求错误：${response.statusText}`));
                }
            },
            onerror: function (response) {
                reject(new Error('网络错误'));
            }
        };

        // 设置请求头
        if (options.headers) {
            xhrParams.headers = options.headers;
        }

        // 添加请求参数
        const hasData = options.data !== undefined && options.data !== null;
        if (method.toUpperCase() === 'GET' && hasData) {
            url = addUrlParam(url, options.data);
        } else if (hasData) {
            xhrParams.data = JSON.stringify(options.data);
            xhrParams.headers['Content-Type'] = 'application/json';
        }

        // 发起请求
        GM_xmlhttpRequest(xhrParams);

        /**
         * 在url中添加查询参数
         * @param {string} url 请求URL
         * @param {Object} params 查询参数对象
         * @returns {string} 添加参数后的URL
         */
        function addUrlParam(url, params) {
            const paramArr = [];
            for (let key in params) {
                if (params.hasOwnProperty(key)) {
                    paramArr.push(`${key}=${encodeURIComponent(params[key])}`);
                }
            }
            const paramString = paramArr.join('&');
            if (url.indexOf('?') > -1) {
                return `${url}&${paramString}`;
            } else {
                return `${url}?${paramString}`;
            }
        }
    });
}


//   GM_request 这个函数接受一个url和一个options对象作为参数。options对象具有以下属性：
//   data(可选)：请求数据，默认为空。
//   method(可选)：请求方法，默认为GET。
//   headers(可选)：请求头，默认为空对象。
//   该函数会返回一个Promise对象，可以使用.then() .catch()链式调用处理成功和失败的操作。
//   对于get请求，在url中添加查询参数，并将options.data设置为null即可。如果存在data，则按照json格式进行post请求，并且需要设置Content-Type为application/json。
// ***********************************************************************************************************************************************************
// GET请求示例
// GM_request('http://example.com/api', {
//     data: { // 可选
//         name: '张三',
//         age: 25
//     },
//     method: 'GET', // 可选，默认为GET
//     headers: { // 可选，默认为空对象
//         Authorization: 'Bearer xxxxxxxx'
//     }
// }).then(response => {
//     console.log(`请求成功：${response.responseText}`);
// }).catch(error => {
//     console.error(`请求失败：${error.message}`);
// });
// // POST请求
// GM_request('http://example.com/api', {
//     data: { // 必须
//         name: '张三',
//         age: 25
//     },
//     method: 'POST', // 可选，默认为GET
//     headers: { // 可选，默认为空对象
//         Authorization: 'Bearer xxxxxxxx'
//     }
// }).then(response => {
//     console.log(`请求成功：${response.responseText}`);
// }).catch(error => {
//     console.error(`请求失败：${error.message}`);
// });


function yangkang(data) {
    console.log("******* 杨康的油猴工具类嘿嘿，好用好用 *****" + data)
}


// 分组函数
// 这个函数接受三个参数：原始数组、用于分组的字段（可以是字符串或字符串数组），以及需要求和的字段（可选）。
// 它会遍历原始数组中的每个对象，并将其添加到对应的分组中。
// 如果指定了求和字段，则该字段的值将被累加到该分组的 “sum” 属性中，并且返回的分组对象将包含该属性。
function groupBy(array, keys, sumKey = null) {
    const grouped = {};
    for (const object of array) {
        let key = '';
        if (Array.isArray(keys)) {
            for (const k of keys) {
                key += object[k];
            }
        } else {
            key = object[keys];
        }
        if (!grouped.hasOwnProperty(key)) {
            grouped[key] = { sum: 0, values: [] };
        }
        if (sumKey && object[sumKey]) {
            grouped[key].sum += parseFloat(object[sumKey]);
        }
        grouped[key].values.push(object);
    }
    return Object.values(grouped);
}

// 例如，如果使用以下数据调用该函数：
// const data = [
//     { name: 'Alice', city: 'New York', revenue: '100.50' },
//     { name: 'Bob', city: 'New York', revenue: '200.75' },
//     { name: 'Charlie', city: 'San Francisco', revenue: '150.25' },
//     { name: 'Dave', city: 'San Francisco', revenue: '75.00' },
//     { name: 'Eve', city: 'New York', revenue: '50.00' }
// ];

// const groupedData = groupBy(data, ['city'], 'revenue');
// console.log(groupedData);
// 控制台打印结果
// [
//     { "sum": 351.25, "values": [
//       { "name": "Alice", "city": "New York", "revenue": "100.50" },
//       { "name": "Bob", "city": "New York", "revenue": "200.75" },
//       { "name": "Eve", "city": "New York", "revenue": "50.00" }
//     ]},
//     { "sum": 225.25, "values": [
//       { "name": "Charlie", "city": "San Francisco", "revenue": "150.25" },
//       { "name": "Dave", "city": "San Francisco", "revenue": "75.00" }
//     ]}
//   ]
