import React, { useState } from 'react'
import {
  Col, Row, Badge, Button, Stack, Form,
} from 'react-bootstrap'

import DeleteCommentDialog from './DeleteCommentDialog'

interface CommentsItemProps {
  isOwn?: boolean
}

function CommentsItem({
  isOwn = true,
}: CommentsItemProps) {
  const [enableReply, setEnableReply] = useState(false)
  const [enableEdit, setEnableEdit] = useState(false)
  const [commentValue, setCommentValue] = useState('12312312')
  const [replyValue, setReplyValue] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = () => {
    console.log('delete')
    setShowDeleteDialog(false)
  }

  return (
    <Stack gap={1}>
      <Row className="bg-info rounded p-2">
        <Col sm="auto">
          <Badge className="bg-secondary px-1 py-0">
            <Stack>
              {!isOwn && <Button variant="secondary p-1">+</Button>}
              <div className="p-1">0</div>
              {!isOwn && <Button variant="secondary p-1">-</Button>}
            </Stack>
          </Badge>
        </Col>
        <Col>
          <Row>
            <Col>
              <span>
                author
              </span>
              {isOwn && <Badge className="m-2">You</Badge>}
              <span className="m-2 text-secondary">
                1 month ago
              </span>
            </Col>
            <Col sm="auto">
              {isOwn
                ? (
                  <>
                    <Button variant="link" onClick={() => setShowDeleteDialog(true)}>
                      Delete
                    </Button>
                    <Button variant="link" onClick={() => setEnableEdit((prev) => !prev)}>
                      Edit
                    </Button>
                  </>
                )
                : (
                  <Button variant="link" onClick={() => setEnableReply((prev) => !prev)}>
                    Reply
                  </Button>
                )}
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              {isOwn && enableEdit
                ? <Form.Control as="textarea" value={commentValue} rows={3} style={{ resize: 'none' }} onChange={(e) => setCommentValue(e.target?.value)} />
                : <div>123213</div>}
            </Col>
          </Row>
        </Col>
      </Row>
      {!isOwn && enableReply && (
        <Row className="bg-info rounded p-2">
          <Col>
            <Form.Control as="textarea" value={replyValue} rows={3} style={{ resize: 'none' }} onChange={(e) => setReplyValue(e.target?.value)} />
          </Col>
          <Col sm="auto">
            <Button>
              Send
            </Button>
          </Col>
        </Row>
      )}
      <DeleteCommentDialog
        show={showDeleteDialog}
        onDelete={handleDelete}
        onClose={() => setShowDeleteDialog(false)}
      />
    </Stack>
  )
}

export default CommentsItem
