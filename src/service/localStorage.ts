export const getCachedCurrentUser = () => JSON.parse(localStorage.getItem('cachedCurrentUser') || '{}')
export const getCachedToken = () => localStorage.getItem('cachedToken') || ''
