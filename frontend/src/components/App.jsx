/* eslint-disable react/jsx-no-constructed-context-values */

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Button, Container, Navbar,
} from 'react-bootstrap';

import ChatPage from '../pages/ChatPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button variant="outline-danger" onClick={auth.logOut}>Выйти из аккаунта</Button>
      : <Button variant="outline-success" as={Link} to="/login" state={{ from: location }}>Войти в аккаунт</Button>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Чат</Navbar.Brand>
          <AuthButton />
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={(
            <ChatRoute>
              <ChatPage />
            </ChatRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </Router>
  </AuthProvider>
);

export default App;
