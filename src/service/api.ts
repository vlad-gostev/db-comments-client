import { getCachedToken } from './localStorage'

const convertParamsToQuery = (params: Record<string, string>) => Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')

export default {
  requestAPI: async (
    method: string,
    url: RequestInfo,
    options?: { body?: Record<string, any>, params?: Record<string, string> },
  ) => {
    const token = getCachedToken()
    const preparedUrl = options?.params
      ? `${url}?${convertParamsToQuery(options.params)}`
      : url
    const response = await fetch(preparedUrl, {
      method,
      body: options?.body ? JSON.stringify(options.body) : null,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
    if (response.status === 401 || response.status === 403) {
      // dispatch(logout())
      throw new Error('Logout')
    }
    const data = await response.json()
    return data
  },
}
