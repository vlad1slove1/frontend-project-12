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
  Button,
  Container,
  Navbar,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ChatPage from '../pages/ChatPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import AuthContext from '../contexts/AuthContext.jsx';

import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';

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
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? <Button className="ms-auto p-2" variant="link" onClick={auth.logOut}>{t('navbar.logout')}</Button>
      : null
  );
};

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <DropdownButton className="p-2" variant="link" title={t('navbar.language')}>
      <Dropdown.Item onClick={() => handleChangeLanguage('ru')}>{t('navbar.ru')}</Dropdown.Item>
      <Dropdown.Item onClick={() => handleChangeLanguage('en')}>{t('navbar.en')}</Dropdown.Item>
    </DropdownButton>
  );
};

const SignupButton = () => {
  const auth = useAuth();
  // const location = useLocation();
  const { t } = useTranslation();

  const signupLink = (
    <div className="ms-auto p-2">
      <a href={routes.signupPagePath()}>{t('navbar.signup')}</a>
    </div>
  );

  return (
    auth.loggedIn
      ? null
      : signupLink
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Router>
        <Navbar bg="white" variant="light" expand="lg" className="shadow-sm d-flex">
          <Container>
            <Navbar.Brand as={Link} to={routes.chatPagePath()}>{t('navbar.title')}</Navbar.Brand>
            <AuthButton />
            <SignupButton />
            <LanguageDropdown />
          </Container>
        </Navbar>

        <Routes>
          <Route
            path={routes.chatPagePath()}
            element={(
              <ChatRoute>
                <ChatPage />
              </ChatRoute>
              )}
          />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SignupPage />} />
          <Route path={routes.errorPagePath()} element={<ErrorPage />} />
        </Routes>

      </Router>
    </AuthProvider>
  );
};

export default App;
