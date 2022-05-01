/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import API from '../service/api'
import { deepDeleteItem, deepUpdateItem } from '../utils'
import { createAuthAsyncThunk, User } from './auth'
import type { RootState } from './index'

export type Comment = {
  _id?: string
  modificationDate?: string
  user?: User
  description: string
  parent?: string,
  children?: Comment[]
  vote?: number
}

export type Vote = {
  _id?: string
  comment: string
  user: string
  type: string
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

export const deleteComment = createAuthAsyncThunk<string, string>('comments/delete', (_id) => API.requestAPI('DELETE', `comments/${_id}`))

export const updateComment = createAuthAsyncThunk<Comment, Comment>('comments/update', ({ _id, description, modificationDate }) => API.requestAPI('PATCH', `comments/${_id}`, { body: { description, modificationDate } }))

export const commentVoteIncrease = createAuthAsyncThunk<Comment, string>('comments/vote/increase', (id) => API.requestAPI('POST', `comments/${id}/vote/increase`))

export const commentVoteDecrease = createAuthAsyncThunk<Comment, string>('comments/vote/decrease', (id) => API.requestAPI('POST', `comments/${id}/vote/decrease`))

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
          const parent = state.list.find((item) => item._id === newComment.parent)
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
        state.list = deepDeleteItem(state.list, deletedId)
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false

        state.list = deepUpdateItem<Comment>(state.list, action.payload)
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(commentVoteIncrease.pending, (state) => {
        state.isLoading = true
      })
      .addCase(commentVoteIncrease.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = deepUpdateItem<Comment>(state.list, action.payload)
      })
      .addCase(commentVoteIncrease.rejected, (state, action) => {
        state.isLoading = true
        state.error = action.error.message
      })
      .addCase(commentVoteDecrease.pending, (state) => {
        state.isLoading = true
      })
      .addCase(commentVoteDecrease.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = deepUpdateItem<Comment>(state.list, action.payload)
      })
      .addCase(commentVoteDecrease.rejected, (state, action) => {
        state.isLoading = true
        state.error = action.error.message
      })
  },
})

export const getComments = (state: RootState) => state.comments
export const getCommentsList = (state: RootState) => getComments(state).list

export default commentsSlice.reducer
