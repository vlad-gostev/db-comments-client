import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import CommentsList from './components/CommentsList'
import AuthDialog from './components/AuthDialog'
import useAuth from './hooks/useAuth'
import { getAuthToken } from './store/auth'
import Header from './components/Header'

function App() {
  const token = useSelector(getAuthToken)
  const [showAuthDialog, setShowAuthDialog] = useState(true)

  useAuth()

  return (
    <Container>
      <Header />
      <CommentsList />
      <AuthDialog show={!token && showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </Container>
  )
}

export default App
