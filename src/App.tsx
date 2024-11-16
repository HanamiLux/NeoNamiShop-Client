import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import AuthModal from './components/AuthModal';
import AppRoutes from './Routes';

const App: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
      <Router>
        <NavigationBar />
        <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
        <Container>
          <AppRoutes />
        </Container>
      </Router>
  );
};

export default App;
