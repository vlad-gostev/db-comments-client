import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import CommentsList from './components/CommentsList'
import AuthDialog from './components/AuthDialog'
import useAuth from './hooks/useAuth'

function App() {
  const [showAuthDialog, setShowAuthDialog] = useState(true)

  useAuth()

  return (
    <Container>
      <CommentsList />
      <AuthDialog show={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </Container>
  )
}

export default App
