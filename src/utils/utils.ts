export const isHttp = (url: string) => {
  return /^https?:\/\//.test(url)
}

export function isIframe() {
  return (window.top !== window.self)
}

/**
 *
 * @param url 目标下载接口
 * @param query 查询参数
 * @param fileName 文件名称
 * @returns {*}
 */
export function downBlobFile(url: any, query: any, fileName: string) {
  return http.request('get',url,{
    responseType: 'blob',
    params: query,
  }).then((response) => {
    handleBlobFile(response, fileName);
  });
}

/**
 * blob 文件刘处理
 * @param response 响应结果
 * @returns
 */
export function handleBlobFile(response: any, fileName: string) {
  // 处理返回的文件流
  const blob = response;
  if (blob && blob.size === 0) {
    useMessage().error('内容为空，无法下载');
    return;
  }
  const link = document.createElement('a');

  // 兼容一下 入参不是 File Blob 类型情况
  var binaryData = [] as any;
  binaryData.push(response);
  link.href = window.URL.createObjectURL(new Blob(binaryData));
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  window.setTimeout(function () {
    // @ts-ignore
    URL.revokeObjectURL(blob);
    document.body.removeChild(link);
  }, 0);
}


/**
 *
 * @param str 驼峰转下划线
 * @returns 下划线
 */
export function toUnderline(str: string) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}