import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { register } from '../store/auth'

import { useAppDispatch } from '../store/hooks'

enum AuthScreens {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
}

type FormField = {
  label: string
  type: string
  id: string
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
  const dispatch = useAppDispatch()
  const [screen, setScreen] = useState(AuthScreens.LOGIN)

  const FormConfig: Record<AuthScreens, FormField[]> = {
    [AuthScreens.REGISTER]: [
      {
        label: 'Email address',
        type: 'email',
        id: 'email',
      },
      {
        label: 'Name',
        type: 'text',
        id: 'name',
      },
      {
        label: 'Password',
        type: 'password',
        id: 'password',
      },
    ],
    [AuthScreens.LOGIN]: [
      {
        label: 'Email address',
        type: 'email',
        id: 'email',
      },
      {
        label: 'Password',
        type: 'password',
        id: 'password',
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
          const {
            email,
            name,
            password,
          } = event.target as EventTarget & Record<string, { value: string }>

          const authData = {
            email: email.value,
            name: name.value,
            password: password.value,
          }

          dispatch(register(authData))
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
