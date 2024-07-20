// 解析url地址栏参数包含hash
export function parseUrlSearch(url) {
    let nurl = url;
    const obj = {};

    if (url.includes('?')) {
        const search = url.split('?')[1];
        const searchArr = search.split('&');
        searchArr.forEach((item) => {
            const [key, value] = item.split('=');
            obj[key] = value;
        });

        const urlArr = url.split('?');
        urlArr.pop();
        nurl = urlArr.join('?');
    }

    return {
        url: nurl,
        query: obj,
    };
}
