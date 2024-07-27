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

export function getQueryString(url: string, paraName: string) {
    const arrObj = url.split('?');
    if (arrObj.length > 1) {
        const arrPara = arrObj[1].split('&');
        let arr;
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=');
            // eslint-disable-next-line eqeqeq
            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return '';
    } else {
        return '';
    }
}