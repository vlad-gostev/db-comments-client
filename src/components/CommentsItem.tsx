/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react'
import {
  Col, Row, Badge, Button, Stack, Form,
} from 'react-bootstrap'

import CommentsAdd from './CommentsAdd'
import { getAuthToken, getCurrentUser } from '../store/auth'
import DeleteCommentDialog from './DeleteCommentDialog'
import {
  Comment, commentVoteDecrease, commentVoteIncrease, deleteComment, updateComment,
} from '../store/comments'
import { useAppDispatch, useAppSelector } from '../store/hooks'

interface CommentsItemProps {
  item: Comment,
  isChild?: boolean
}

function CommentsItem({
  item,
  isChild,
}: CommentsItemProps) {
  const {
    modificationDate,
    _id = '',
    user,
    description,
    vote,
    parent,
  } = item

  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(getCurrentUser)
  const token = useAppSelector(getAuthToken)
  const [enableReply, setEnableReply] = useState(false)
  const [enableEdit, setEnableEdit] = useState(false)
  const [descriptionValue, setDescriptionValue] = useState(description)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const commentUser = user
  const isOwn = commentUser?._id && (currentUser?._id === commentUser._id)

  const handleDelete = () => {
    dispatch(deleteComment(_id))
    setShowDeleteDialog(false)
  }

  const handleEdit = () => {
    dispatch(updateComment({ _id, description: descriptionValue, modificationDate }))
    setEnableEdit(false)
  }

  const handleVoteIncrease = () => {
    dispatch(commentVoteIncrease(_id))
  }

  const handleVoteDecrease = () => {
    dispatch(commentVoteDecrease(_id))
  }

  return (
    <Stack gap={1}>
      <Row className="bg-info rounded py-3 px-2">
        <Col sm="auto">
          <Badge className="bg-secondary px-1 py-0">
            <Stack>
              {!isOwn && <Button variant="secondary p-1" onClick={handleVoteIncrease}>+</Button>}
              <div className="p-1">{vote}</div>
              {!isOwn && <Button variant="secondary p-1" onClick={handleVoteDecrease}>-</Button>}
            </Stack>
          </Badge>
        </Col>
        <Col>
          <Row>
            <Col>
              <span>
                {commentUser?.name}
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
              {!isOwn && token && (
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
        <CommentsAdd
          userLabel={commentUser?.name}
          parent={isChild ? parent : _id}
          onClose={() => setEnableReply(false)}
        />
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
