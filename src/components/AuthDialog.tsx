import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

enum AuthScreens {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
}

interface AuthDialogProps {
  show?: boolean
  onClose: () => void
//   onLogin: () => void
}

function AuthDialog({
  onClose,
  show,
}: AuthDialogProps) {
  const [screen, setScreen] = useState(AuthScreens.LOGIN)

  const FormConfig = {
    [AuthScreens.REGISTER]: [
      {
        label: 'Email address',
        type: 'email',
        id: 'formBasicEmail',
      },
      {
        label: 'Name',
        type: 'text',
        id: 'formBasicName',
      },
      {
        label: 'Password',
        type: 'password',
        id: 'formBasicPassword',
      },
    ],
    [AuthScreens.LOGIN]: [
      {
        label: 'Email address',
        type: 'email',
        id: 'formBasicEmail',
      },
      {
        label: 'Password',
        type: 'password',
        id: 'formBasicPassword',
      },
    ],
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`Authentication(${screen})`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => {
          event.preventDefault()
          const { target } = event
          FormConfig[screen].forEach(({ id }) =>
            console.log((target as unknown as Record<string, { value: any }>)[id].value))
        }}
        >
          {FormConfig[screen].map(({ label, type, id }) => (
            <Form.Group className="mb-3" controlId={id}>
              <Form.Label>{label}</Form.Label>
              <Form.Control type={type} />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {screen === AuthScreens.LOGIN
          ? (
            <Button variant="secondary" onClick={() => setScreen(AuthScreens.REGISTER)}>
              Go to Register
            </Button>
          )
          : (
            <Button variant="secondary" onClick={() => setScreen(AuthScreens.LOGIN)}>
              Go to Login
            </Button>
          )}
      </Modal.Footer>
    </Modal>
  )
}

export default AuthDialog
