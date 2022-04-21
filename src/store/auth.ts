/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import API from '../service/api'
import { getCachedCurrentUser, getCachedToken } from '../service/localStorage'
import type { RootState } from './index'

type User = {
  id?: string
  email?: string
  name: string
  password?: string
}

interface AuthState {
  token: string | null
  isLoading: boolean
  error?: string
  currentUser: User | null
}

const initialState: AuthState = {
  token: getCachedToken(),
  isLoading: false,
  error: undefined,
  currentUser: getCachedCurrentUser(),
}

export const register = createAsyncThunk<any, User>('auth/register', ({ email, name, password }) => API.requestAPI('POST', 'http://localhost:3001/auth/register', { body: { email, name, password } }))
export const auth = createAsyncThunk<any>('auth/verification', () => API.requestAPI('POST', 'http://localhost:3001/auth'))

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.token = null
    //   state.currentUser = null
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
        state.currentUser = {
          name: action.payload.name,
          // eslint-disable-next-line no-underscore-dangle
          id: action.payload._id,
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      .addCase(auth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUser = {
          name: action.payload.name,
          // eslint-disable-next-line no-underscore-dangle
          id: action.payload.userId,
        }
      })
      .addCase(auth.rejected, (state) => {
        state.isLoading = false
        // state.error = action.error.message
        state.token = null
        state.currentUser = null
      })
  },
})

// export const { logout } = authSlice.actions

export const getAuth = (state: RootState) => state.auth
export const getAuthToken = (state: RootState) => getAuth(state).token
export const getCurrentUser = (state: RootState) => getAuth(state).currentUser

export default authSlice.reducer
