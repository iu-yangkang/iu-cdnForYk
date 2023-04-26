
console.log("//******* 杨康的工具类已经生效,请尽情享用 *******\\")

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


/**
 * 这个函数接受一个url和一个options对象作为参数。options对象具有以下属性：
  data(可选)：请求数据，默认为空。
  method(可选)：请求方法，默认为GET。
  headers(可选)：请求头，默认为空对象。
  该函数会返回一个Promise对象，可以使用.then() .catch()链式调用处理成功和失败的操作。
  对于get请求，在url中添加查询参数，并将options.data设置为null即可。如果存在data，则按照json格式进行post请求，并且需要设置Content-Type为application/json。
示例：
// GET请求
GM_request('http://example.com/api', {
  data: { // 可选
    name: '张三',
    age: 25
  },
  method: 'GET', // 可选，默认为GET
  headers: { // 可选，默认为空对象
    Authorization: 'Bearer xxxxxxxx'
  }
}).then(response => {
  console.log(`请求成功：${response.responseText}`);
}).catch(error => {
  console.error(`请求失败：${error.message}`);
});

// POST请求
GM_request('http://example.com/api', {
  data: { // 必须
    name: '张三',
    age: 25
  },
  method: 'POST', // 可选，默认为GET
  headers: { // 可选，默认为空对象
    Authorization: 'Bearer xxxxxxxx'
  }
}).then(response => {
  console.log(`请求成功：${response.responseText}`);
}).catch(error => {
  console.error(`请求失败：${error.message}`);
});

*/
