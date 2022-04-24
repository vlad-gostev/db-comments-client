import React, { useState } from 'react'
import {
  Col, Row, Badge, Button, Stack, Form,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'

import CommentsAdd from './CommentsAdd'
import { getCurrentUser } from '../store/auth'
import DeleteCommentDialog from './DeleteCommentDialog'
import { Comment, deleteComment, editComment } from '../store/comments'
import { useAppDispatch } from '../store/hooks'

interface CommentsItemProps {
  item: Comment,
  isMain?: boolean
}

function CommentsItem({
  item,
  isMain,
}: CommentsItemProps) {
  const {
    modificationDate,
    id = '',
    user,
    description,
  } = item

  const dispatch = useAppDispatch()
  const currentUser = useSelector(getCurrentUser)
  const [enableReply, setEnableReply] = useState(false)
  const [enableEdit, setEnableEdit] = useState(false)
  const [descriptionValue, setDescriptionValue] = useState(description)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const isOwn = user?.id && (currentUser?.id === user?.id)

  const handleDelete = () => {
    dispatch(deleteComment(id))
    setShowDeleteDialog(false)
  }

  const handleEdit = () => {
    dispatch(editComment({ id, description: descriptionValue }))
    setEnableEdit(false)
  }

  return (
    <Stack gap={1}>
      <Row className="bg-info rounded py-3 px-2">
        <Col sm="auto">
          <Badge className="bg-secondary px-1 py-0">
            <Stack>
              {!isOwn && <Button variant="secondary p-1">+</Button>}
              <div className="p-1">{0}</div>
              {!isOwn && <Button variant="secondary p-1">-</Button>}
            </Stack>
          </Badge>
        </Col>
        <Col>
          <Row>
            <Col>
              <span>
                {user?.name}
              </span>
              {isOwn && <Badge className="m-2">You</Badge>}
              {modificationDate && (
                <span className="m-2 text-secondary">
                  {new Date(modificationDate).toDateString()}
                </span>
              )}
            </Col>
            <Col sm="auto">
              {isOwn && (
                <>
                  <Button variant="link" onClick={() => setShowDeleteDialog(true)}>
                    Delete
                  </Button>
                  <Button variant="link" onClick={() => setEnableEdit((prev) => !prev)}>
                    Edit
                  </Button>
                </>
              )}
              {!isOwn && isMain && (
                <Button variant="link" onClick={() => setEnableReply((prev) => !prev)}>
                  Reply
                </Button>
              )}
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              {isOwn && enableEdit
                ? (
                  <>
                    <Form.Control as="textarea" value={descriptionValue} rows={3} style={{ resize: 'none' }} onChange={(e) => setDescriptionValue(e.target?.value)} />
                    <Button className="mt-2" onClick={handleEdit}>
                      Edit
                    </Button>
                  </>
                )
                : <div>{descriptionValue}</div>}
            </Col>
          </Row>
        </Col>
      </Row>
      {!isOwn && enableReply && (
        <CommentsAdd parent={id} onClose={() => setEnableReply(false)} />
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
