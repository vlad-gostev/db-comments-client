/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import API from '../service/api'
import { createAuthAsyncThunk } from './auth'
import type { RootState } from './index'

export type Comment = {
  id?: string
  modificationDate?: string
  user?: { id: string, name: string }
  description: string
  parent?: string,
  children?: Comment[]
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

export const fetchComments = createAuthAsyncThunk<Comment[]>('comments/fetch', () => API.requestAPI('GET', 'comments'))

export const createComment = createAuthAsyncThunk<Comment, Comment>('comments/create', ({ description, parent }) => API.requestAPI('POST', 'comments', { body: { description, parent } }))

export const deleteComment = createAuthAsyncThunk<string, string>('comments/delete', (id) => API.requestAPI('DELETE', `comments/${id}`))

export const editComment = createAuthAsyncThunk<Comment, Comment>('comments/edit', ({ id, description }) => API.requestAPI('PATCH', `comments/${id}`, { body: { description } }))

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
      .addCase(createComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false

        const newComment = action.payload

        if (newComment.parent) {
          const parent = state.list.find((item) => item.id === newComment.parent)
          if (parent) {
            if (parent.children) {
              parent.children.push(newComment)
            } else {
              parent.children = [newComment]
            }
          }
        } else {
          state.list.push(newComment)
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false

        const deletedId = action.payload
        const deletedIndex = state.list.findIndex((item) => item.id === deletedId)
        state.list = [...state.list.slice(0, deletedIndex), ...state.list.slice(deletedIndex + 1)]
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(editComment.pending, (state) => {
        state.isLoading = true
      })
      // .addCase(editComment.fulfilled, (state, action) => {
      //   state.isLoading = false

      // })
      .addCase(editComment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  },
})

export const getComments = (state: RootState) => state.comments
export const getCommentsList = (state: RootState) => getComments(state).list

export default commentsSlice.reducer
