import React from 'react'
import {
  Col,
  Row,
  Stack,
} from 'react-bootstrap'

import CommentsItem from './CommentsItem'

function CommentsList() {
  return (
    <Stack gap={3} className="my-3">
      <CommentsItem />
      <Row>
        <Col sm="auto">
          <div className="bg-primary h-100" style={{ width: 1 }} />
        </Col>
        <Col>
          <Stack gap={3}>
            <CommentsItem />
            <CommentsItem />
          </Stack>
        </Col>
      </Row>
    </Stack>
  )
}

export default CommentsList
