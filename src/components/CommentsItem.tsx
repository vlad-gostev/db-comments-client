import React, { useState } from 'react'
import {
  Col, Row, Badge, Button, Stack, Form,
} from 'react-bootstrap'

import DeleteCommentDialog from './DeleteCommentDialog'

interface CommentsItemProps {
  isOwn?: boolean
  item: any
}

function CommentsItem({
  isOwn = false,
  item,
}: CommentsItemProps) {
  const {
    // id,
    name,
    vote,
    description,
  } = item

  // const dispatch = useAppDispatch()
  const [enableReply, setEnableReply] = useState(false)
  const [enableEdit, setEnableEdit] = useState(false)
  const [descriptionValue, setDescriptionValue] = useState(description)
  const [replyValue, setReplyValue] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = () => {
    // dispatch(deleteComment(id))
    setShowDeleteDialog(false)
  }

  return (
    <Stack gap={1}>
      <Row className="bg-info rounded p-2">
        <Col sm="auto">
          <Badge className="bg-secondary px-1 py-0">
            <Stack>
              {!isOwn && <Button variant="secondary p-1">+</Button>}
              <div className="p-1">{vote}</div>
              {!isOwn && <Button variant="secondary p-1">-</Button>}
            </Stack>
          </Badge>
        </Col>
        <Col>
          <Row>
            <Col>
              <span>
                {name}
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
                ? <Form.Control as="textarea" value={descriptionValue} rows={3} style={{ resize: 'none' }} onChange={(e) => setDescriptionValue(e.target?.value)} />
                : <div>{descriptionValue}</div>}
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
