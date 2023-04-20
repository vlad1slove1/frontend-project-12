import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const signupSchema = yup.object({
  username: yup.string()
    .min(4, 'Не менее 4 символов')
    .max(12, 'Не более 12 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .min(4, 'Не менее 4 символов')
    .required('Обязательное поле'),
});

const LoginPage = () => {
  const [authenticated, setAuthenticated] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const authUser = useAuth();
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        authUser.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthenticated(false);
          inputEl.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <Form.Group>
              <Form.Label htmlFor="username">Имя пользователя</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={!authenticated}
                required
                ref={inputEl}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={!authenticated}
                required
              />
              <Form.Control.Feedback type="invalid">Не правильное имя пользователя или пароль</Form.Control.Feedback>
            </Form.Group>

            <Button
              style={{ marginTop: '30px' }}
              type="submit"
              variant="outline-primary"
            >
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
