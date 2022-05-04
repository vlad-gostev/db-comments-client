import { getCachedToken } from './localStorage'

const UrlApi = 'https://db-comments.herokuapp.com/'

const convertParamsToQuery = (params: Record<string, string>) => Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')

export default {
  requestAPI: async (
    method: string,
    apiRoute: string,
    options: { body?: Record<string, any>, params?: Record<string, string> } = {},
  ) => {
    const token = getCachedToken()
    const preparedUrl = options.params
      ? `${UrlApi}${apiRoute}?${convertParamsToQuery(options.params)}`
      : `${UrlApi}${apiRoute}`
    const response = await fetch(preparedUrl, {
      method,
      body: options.body ? JSON.stringify(options.body) : null,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })

    const data = await response.json()
    return { data, response }
  },
}
