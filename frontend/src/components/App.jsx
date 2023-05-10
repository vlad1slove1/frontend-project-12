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
import AuthContext from '../contexts/AuthContext.jsx';

import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import ChatProvider from '../contexts/ChatContext.jsx';

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
    auth.loggedIn ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button variant="outline-danger" onClick={auth.logOut}>Выйти из аккаунта</Button>
      : <Button variant="outline-success" as={Link} to={routes.loginPagePath()} state={{ from: location }}>Войти в аккаунт</Button>
  );
};

const App = ({ socket }) => (
  <AuthProvider>
    <Router>
      <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to={routes.chatPagePath()}>Чат</Navbar.Brand>
          <AuthButton />
        </Container>
      </Navbar>

      <Routes>
        <Route
          path={routes.chatPagePath()}
          element={(
            <ChatProvider socket={socket}>
              <ChatRoute>
                <ChatPage />
              </ChatRoute>
            </ChatProvider>
          )}
        />
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path={routes.errorPagePath()} element={<ErrorPage />} />
      </Routes>

    </Router>
  </AuthProvider>
);

export default App;
