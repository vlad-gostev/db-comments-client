/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './index'

type Comment = {
  id: string
  author: { id: string, name: string }
  description: string
  parent: string,
  children: Comment[]
}

interface CommentsState {
  list: Comment[]
  isLoading: boolean
  error?: string
}

const initialState: CommentsState = {
  list: [],
  isLoading: false,
  error: undefined,
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await fetch('http://localhost:3001/comments')
  const data = await response.json()

  return data
})

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // fetchList: (state, action: PayloadAction<any[]>) => {
    //   const { list } = state
    //   list = action.payload
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  },
})

// export const { fetchList } = commentsSlice.actions

export const getComments = (state: RootState) => state.comments
export const getCommentsList = (state: RootState) => getComments(state).list

export default commentsSlice.reducer
