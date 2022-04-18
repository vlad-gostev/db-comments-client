import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import CommentsList from './components/CommentsList'
import AuthDialog from './components/AuthDialog'

function App() {
  const [showAuthDialog, setShowAuthDialog] = useState(true)
  return (
    <Container>
      <CommentsList />
      <AuthDialog show={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </Container>
  )
}

export default App
