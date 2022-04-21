import React, { useEffect } from 'react'
import {
  Col,
  Row,
  Stack,
} from 'react-bootstrap'

import CommentsItem from './CommentsItem'
import { fetchComments, getCommentsList } from '../store/comments'
import { useAppDispatch, useAppSelector } from '../store/hooks'

function CommentsList() {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(getCommentsList)

  useEffect(() => {
    dispatch(fetchComments())
  }, [])

  return (
    <Stack gap={3} className="my-3">
      {comments.map((comment) => (
        <>
          <CommentsItem key={comment?.id} item={comment} />
          {comment?.children && (
            <Row>
              <Col sm="auto">
                <div className="bg-primary h-100" style={{ width: 1 }} />
              </Col>
              <Col>
                <Stack gap={3}>
                  {comment.children.map((child) => (
                    <CommentsItem key={child?.id} item={child} />
                  ))}
                </Stack>
              </Col>
            </Row>
          )}
        </>
      ))}
    </Stack>
  )
}

export default CommentsList
