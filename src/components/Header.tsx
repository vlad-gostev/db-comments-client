import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { getAuthToken, logout } from '../store/auth'
import { useAppDispatch, useAppSelector } from '../store/hooks'

function Header() {
  const dispatch = useAppDispatch()

  const token = useAppSelector(getAuthToken)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Row>
      {token && (
        <Col>
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default Header
