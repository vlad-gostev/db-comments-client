/* eslint-disable no-param-reassign */
import {
  AsyncThunkPayloadCreator, createAction, createAsyncThunk, createReducer,
} from '@reduxjs/toolkit'

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

const InitialState: AuthState = {
  token: getCachedToken(),
  isLoading: false,
  error: undefined,
  currentUser: getCachedCurrentUser(),
}

const logout = createAction('auth/logout')

export const createAuthAsyncThunk = <Returned, ThunkArg = void>(
  typePrefix: string,
  callback: (actionPayload: ThunkArg) => Promise<{ response: Response, data: any }>,
) => {
  const payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg> = async (arg, thunkApi) => {
    const { response, data } = await callback(arg)

    if (response.status === 401 || response.status === 403) {
      thunkApi.dispatch(logout())
    }

    if (![200, 201].includes(response.status)) {
      throw new Error(data)
    }

    return data
  }

  return createAsyncThunk<Returned, ThunkArg>(typePrefix, payloadCreator)
}

export const register = createAuthAsyncThunk<any, User>('auth/register', ({ email, name, password }) => API.requestAPI('POST', 'auth/register', { body: { email, name, password } }))

export const login = createAuthAsyncThunk<any, User>('auth/login', ({ name, password }) => API.requestAPI('POST', 'auth/login', { body: { name, password } }))

export const auth = createAuthAsyncThunk<any>('auth/verification', () => API.requestAPI('POST', 'auth'))

const authReducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(logout, (state) => {
      state.token = null
      state.currentUser = null
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.currentUser = {
        name: action.payload.name,
        // eslint-disable-next-line no-underscore-dangle
        id: action.payload.id,
      }
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    .addCase(register.pending, (state) => {
      state.isLoading = true
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.currentUser = {
        name: action.payload.name,
        // eslint-disable-next-line no-underscore-dangle
        id: action.payload.id,
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
    .addCase(auth.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
})

export const getAuth = (state: RootState) => state.auth
export const getAuthToken = (state: RootState) => getAuth(state).token
export const getCurrentUser = (state: RootState) => getAuth(state).currentUser
export const getAuthError = (state: RootState) => getAuth(state).error

export default authReducer
