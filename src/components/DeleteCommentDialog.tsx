import React from 'react'
import { Button, Modal } from 'react-bootstrap'

interface DeleteCommentDialogProps {
  show?: boolean
  onClose: () => void
  onDelete: () => void
}

function DeleteCommentDialog({
  onClose,
  show,
  onDelete,
}: DeleteCommentDialogProps) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete comment?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteCommentDialog
