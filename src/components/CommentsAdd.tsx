import React, { useState } from 'react'
import {
  Col, Row, Button, Form,
} from 'react-bootstrap'
import { createComment } from '../store/comments'
import { useAppDispatch } from '../store/hooks'

interface CommentsAddProps {
  parent?: string,
  userLabel?: string,
  onClose?: () => void
}

function CommentsAdd({ parent = '', onClose = () => {}, userLabel }: CommentsAddProps) {
  const dispatch = useAppDispatch()
  const [description, setDescription] = useState(userLabel ? `@${userLabel} ` : '')

  const handleAdd = () => {
    onClose()
    dispatch(createComment({ description, parent }))
  }

  return (
    <Row className="bg-info rounded p-2">
      <Col>
        <Form.Control as="textarea" value={description} rows={3} style={{ resize: 'none' }} onChange={(e) => setDescription(e.target?.value)} />
      </Col>
      <Col sm="auto">
        <Button onClick={handleAdd}>
          Send
        </Button>
      </Col>
    </Row>
  )
}

export default CommentsAdd
