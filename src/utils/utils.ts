export const isHttp = (url: string) => {
  return /^https?:\/\//.test(url)
}