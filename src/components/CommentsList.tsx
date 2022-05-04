import React, { useEffect } from 'react'
import {
  Col,
  Row,
  Stack,
} from 'react-bootstrap'

import CommentsItem from './CommentsItem'
import { fetchComments, getCommentsList } from '../store/comments'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import CommentsAdd from './CommentsAdd'
import { getAuthToken } from '../store/auth'

function CommentsList() {
  const dispatch = useAppDispatch()

  const token = useAppSelector(getAuthToken)
  const comments = useAppSelector(getCommentsList)

  useEffect(() => {
    dispatch(fetchComments())
  }, [])

  return (
    <Stack gap={3} className="my-3">
      {comments.map((comment) => (
        <div key={comment?._id}>
          <CommentsItem item={comment} />
          {comment?.children && (
            <Row className="mt-3">
              <Col sm="auto">
                <div className="bg-primary h-100" style={{ width: 1 }} />
              </Col>
              <Col>
                <Stack gap={3}>
                  {comment.children.map((child) => (
                    <CommentsItem isChild key={child?._id} item={child} />
                  ))}
                </Stack>
              </Col>
            </Row>
          )}
        </div>
      ))}
      {token && <CommentsAdd />}
    </Stack>
  )
}

export default CommentsList
