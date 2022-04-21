import { useEffect, useRef } from 'react'

import { getCurrentUser, getAuthToken, auth } from '../store/auth'
import { useAppSelector, useAppDispatch } from '../store/hooks'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(getCurrentUser)
  const token = useAppSelector(getAuthToken)

  const firstUpdate = useRef(true)

  useEffect(() => {
    if (token) {
      dispatch(auth())
    }
  }, [])

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    localStorage.setItem('cachedCurrentUser', JSON.stringify(currentUser))
    localStorage.setItem('cachedToken', token || '')
  }, [currentUser])

  return { currentUser }
}

export default useAuth
