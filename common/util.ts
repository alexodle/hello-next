export function buildURL(urlStr: string, params: { [key: string]: string }): URL {
  const url = new URL(urlStr)
  Object.keys(params).forEach(k => url.searchParams.append(k, params[k]))
  return url
}
