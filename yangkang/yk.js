
let message =
    `
******* 杨康的油猴工具类已经生效,请尽情享用 *******
******* 版本号：yangkang3.2 *******
******* GM_request函数 封装了油猴 的GM_xmlhttpRequest方法, 可以在当前页面执行跨域请求,支持异步调用，返回 Promise *******
/**
 * GM_request
 * yangkang
 * groupBy
 * sleep
 * addCdnByLayui
 * loadCDNFile
 * addButton
 * addTable
 * sortBy
 * Axios_request
 * openOnWeb
 * 
*/

`

let style = '#TManays{z-index:99999; position:absolute; left:0px; top:0px; width:170px; height:auto; border:0; margin:0;}' +
    '#TMul{position:fixed; left:-156px; width:140px; background-color:#000; opacity:0.8; border:3px solid #146e10; list-style:none; margin:0; padding:5px;}' +
    '#TMul li{margin:0; padding:3px;} ' +
    '#TMul li a{font-size:15px; margin:0; padding:3px; color:white;} ' +
    '#TMGobtn{position:fixed; left:0; top:100px;cursor:pointer;outline:none; width:70px; height:40px; border-width:2px 4px 2px 0px; border-color:#ffff00; background-color:#ffff00; border-style:solid; font:12px "微软雅黑"; color:#ff0000; margin:0; padding:0;} ' +
    '#TMbtn{position:fixed; left:0; cursor:pointer;outline:none; width:20px; height:40px; border-width:2px 4px 2px 0px; border-color:#ffff00; background-color:#ffff00; border-style:solid; font:12px "微软雅黑"; color:#aaa; margin:0; padding:0;}'



console.log(message)
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


/**
 * 标记打印
 * @param {*} data
 */
function yangkang(data) {

    let da = `
    **************************


    ${data}


    **************************
    `

    console.log(da)

}


/**
 * 分组函数，根据键或键数组对输入数组进行分组，并可计算值的总和。
 * @param {Array} array 要分组的数组
 * @param {string|Array} keys 用于分组的键，可以是单个键的字符串，也可以是多个键的数组
 * @param {Array} sumKeys 需要计算总和的键的数组，默认为空数组
 * @returns {Array} 返回包含所有分组结果的数组
 */
async function groupBy(array, keys, sumKeys = [], join) {
    const grouped = {}; // 用于存储分组结果的对象
    for (const object of array) { // 遍历输入数组中的每个元素
        let key = ''; // 存储当前元素的键的变量
        if (Array.isArray(keys)) { // 如果传入的keys是数组
            for (const k of keys) { // 遍历keys数组
                key += object[k]; // 将每个键的值拼接起来作为当前元素的键
            }
        } else { // 如果传入的keys是单个键的字符串
            key = object[keys]; // 使用该键的值作为当前元素的键
        }
        if (!grouped.hasOwnProperty(key)) { // 如果当前键不存在于grouped对象中
            grouped[key] = { // 在grouped对象中新建一个以该键为名的属性
                values: [], // 存储属于该分组的所有元素
                group: key, // 当前分组的名称，用于作为返回结果中的一个属性
                total: 0, // 属于该分组的元素数量
                ...sumKeys.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}), // 对需要计算总和的键进行初始化，设置初始值为0
            };
        }
        sumKeys.forEach((k) => { // 遍历需要计算总和的键
            if (object[k]) { // 如果当前元素包含该键
                grouped[key][k] += parseFloat(object[k]); // 将该键的值加到该分组对应的属性上
            }
        });
        grouped[key].total++; // 增加属于该分组的元素数量
        grouped[key].values.push(object); // 将当前元素添加到属于该分组的所有元素数组中
        grouped[key].group = keys ? keys.map(k => object[k]).join(join) : key; // 更新分组名称（如果keys是一个数组，使用每个键的值拼接而成）
    }
    return Object.values(grouped); // 返回所有分组结果的数组
}

// 例如，如果使用以下数据调用该函数：
// const data = [
//     { name: 'Bob', city: 'New York', revenue: '100.50',a:30.6 },
//     { name: 'Bob', city: 'New York', revenue: '200.75' ,a:30.5 },
//     { name: 'Charlie', city: 'San Francisco', revenue: '150.25',a:30.4  },
//     { name: 'Dave', city: 'San Francisco', revenue: '75.00',a:30.3  },
//     { name: 'Eve', city: 'New York', revenue: '50.00',a:30.2  }
// ];
// const groupedData = groupBy(data, ['name','city'], 'revenue','a');
// console.log(groupedData);


// ----------------------------------


/**
 * 睡眠函数
 * @param {*} num
 */
async function sleep(num) {
    return new Promise((resolve, reject) => { // return / await 等待执行完
        setTimeout(() => {
            resolve('延迟')
        }, num)
    })
}
// console.log("123")
// await sleep(5000)
// console.log("456")


// -------------------


/**
 * layui注入
 * addCdnByLayui 在文件加载的时候，应该默认加载，后期直接调用
 */
function addCdnByLayui() {
    var link = document.createElement('link');
    link.href = "//unpkg.com/layui@2.6.8/dist/css/layui.css";
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
    var script = document.createElement('script');
    script.src = "//unpkg.com/layui@2.6.8/dist/layui.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    yangkang("layui@2.6.8 注入完成，可放心使用！")
}
// 直接调用
addCdnByLayui()




/**
 * 以下是一个使用 JavaScript 封装的 CDN 加载参数的示例代码，支持加载 CSS 和 JS 文件：
 * @param {*} filename 文件链接
 * @param {*} filetype 文件类型
 */
function loadCDNFile(filename, filetype) {
    if (filetype == "js") { // 如果是加载 JS 文件
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype == "css") { // 如果是加载 CSS 文件
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }

    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

// loadCDNFile("https://code.jquery.com/jquery-3.6.0.min.js", "js");



/**
 * 页面新增功能按钮
 * @param {*} title
 * @param {*} className
 * @param {*} onclick
 * @param {*} top
 */
function addButton(title, className, onclick, top) {
    let style =
        `
   position:absolute; 
   left:35px; top:100px;
   `
    let Container = document.createElement('div');
    Container.id = "sp-ac-container";
    Container.style.position = "fixed"
    Container.style.left = "220px"
    Container.style.top = `${top}`
    Container.style['z-index'] = "999999"
    Container.innerHTML = ` <button id="myCustomize" class="${className}" style="${style}" onclick="${onclick}">${title}</button>`
    document.body.appendChild(Container);
}





/**
 * 在页面上添加表格table
 * @param {*} theadDatas 表头数据
 * @param {*} tbodyDatas tbody数据
 * @param {*} box dom元素
 * @returns
 */
function addTable(theadDatas, tbodyDatas, box) {
    // 模拟数据
    // 表头数据
    // var theadDatas = ['姓名', '性别', '年龄'];
    // // tbody数据
    // var tbodyDatas = [
    //     { name: 'xm', sex: '男', age: 20 },
    //     { name: 'hh', sex: '女', age: 18 },
    //     { name: 'lh', sex: '男', age: 21 },
    //     { name: 'ghx', sex: '女', age: 23 }
    // ];
    // 创建table
    var table = document.createElement('table');
    table.border = '1px';
    table.style.textAlign = 'center';
    box.appendChild(table);
    // 创建thead
    var thead = document.createElement('thead');
    table.appendChild(thead);
    // 创建thead中的tr
    var tr = document.createElement('tr');
    tr.style.height = '40px';
    tr.style.backgroundColor = 'lightblue';
    thead.appendChild(tr);
    // 创建thead中的th
    for (var i = 0; i < theadDatas.length; i++) {
        var th = document.createElement('th');
        th.style.padding = '5px 20px';
        // th.innerText = theadDatas[i];
        // 使用common.js中的innerText兼容性处理函数
        setInnerText(th, theadDatas[i]);
        tr.appendChild(th);
    }
    // 创建tbody
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    // 创建tbody中的tr td
    for (var i = 0; i < tbodyDatas.length; i++) {
        // 创建tbody中的tr
        tr = document.createElement('tr');
        tbody.appendChild(tr);
        // 创建tbody中的td
        var tdData = tbodyDatas[i];
        for (var key in tdData) {
            var td = document.createElement('td');
            setInnerText(td, tdData[key]);
            tr.appendChild(td);
        }
        // 创建td中的删除链接
        // td = document.createElement('td');
        // tr.appendChild(td);
        // var link = document.createElement('a');
        // link.href = 'javascript:void(0)';
        // setInnerText(link, '删除');
        // td.appendChild(link);
        // link.onclick = removeTr;
    }
}



// common.js
// innerText textContent 兼容性处理
function setInnerText(element, content) {
    if (typeof element.innerText === 'string') {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}


/**
 * 根据该属性排序；rev：升序1或降序-1，不填则默认为1
 * @param {*} attr
 * @param {*} rev
 * @returns
 */
function sortBy(attr, rev) {
    if (rev == undefined) { rev = 1 } else { (rev) ? 1 : -1; }
    return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) { return rev * -1 }
        if (a > b) { return rev * 1 }
        return 0;
    }
}



/**
 * Axios请求封装
 * 以上代码中，request 函数接收三个参数，分别为请求方法、请求 URL 和配置项。配置项包括请求头部信息 headers、查询参数 params 和请求体数据 data。
 * 当请求方法为 get 时，将查询参数 params 添加到请求配置对象 config 中；否则将请求体数据 data 添加到 config 对象中，并且将请求方法改为 post，以便发送带有请求体的请求。
 * 最后，该函数返回一个 Promise，可以异步调用并处理请求结果。
 * 使用示例中分别演示了发起 GET 请求和 POST 请求的用法。GET 请求的查询参数使用了 { limit: 10, offset: 0 } 这个 JSON 对象，而 POST 请求的请求体数据使用了 { name: 'John Doe', age: 30 } 这个 JSON 对象，并且指定了请求头部信息 'Content-Type': 'application/json'。
 * @param {*} method
 * @param {*} url
 * @param {*} params
 * @returns
 */
async function Axios_request(method, url, { headers, params, data }) {
    const config = {
        method,
        url,
        headers,
    };

    if (method === 'get') {
        config.params = params;
    } else {
        config.data = data;
    }

    return axios(config);
}

//   // 使用示例：
//   request('get', '/api/users', { params: { limit: 10, offset: 0 } })
//     .then(response => console.log(response))
//     .catch(error => console.error(error));

//   request('post', '/api/users', { data: { name: 'John Doe', age: 30 }, headers: { 'Content-Type': 'application/json' } })
//     .then(response => console.log(response))
//     .catch(error => console.error(error));


/**
* 
* @param {*} title 标题
* @param {*} content 任意html内容
* @param {*} size 宽高数组
* @param {*} callback 回调函数
* @param {*} isclose 布尔值，是否关闭当前页面
* @param {*} maxmin 布尔值，是否显示全屏按钮
* @param {*} full 布尔值，是否默认全屏
*/
function openOnWeb(title, content, size, callback, isclose, maxmin, full) {
    layui.use(['layer'], function () {
        var layer = layui.layer;
        let _index = layer.open({
            type: 1,
            title: title,
            area: size,
            maxmin: maxmin,
            content: content,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                if (typeof callback === 'function') {
                    callback();
                }
                if (isclose) {
                    layer.close(index);
                }

            },
            btn2: function (index, layero) {
                layer.close(index);
            }
        });
        if (full) { layer.full(_index); }
    });
}



/**
 * 页面悬浮按钮
 */
function btnTg() {
    var btn = document.getElementById("TMbtn");
    var ul = document.getElementById("TMul");
    if (btn.style.left === "" || parseInt(btn.style.left) < 10) {
        btn.style.left = 156 + "px";
        ul.style.left = 0;
        btn.innerText = "◁";
    } else {
        btn.style.left = 0;
        ul.style.left = -156 + "px";
        btn.innerText = "▷";
    }
}


/**
 * 
 * @param {*} li  li标签字符串
 */
function flag(li) {
    var div = document.createElement("div");
    div.innerHTML = '<div id="TManays">' +
        '<ul id="TMul">' +
        li +
        '</ul>' +
        '<button id="TMbtn"> ▷</button>' +
        '</div>';
    document.body.appendChild(div);
    document.querySelector("#TMbtn").addEventListener("click", btnTg, false);

}
