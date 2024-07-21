export const isHttp = (url: string) => {
  return /^https?:\/\//.test(url)
}

export function isIframe() {
  return (window.top !== window.self)
}