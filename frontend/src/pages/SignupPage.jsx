import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import SignupError from '../components/semiComponents/SignupError.jsx';
import SignupSuccess from '../components/semiComponents/SignupSuccess.jsx';

import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';
import showToast from '../toastify/showToast.js';

const SignupPage = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => setShowErrorModal(false);

  const authUser = useAuth();
  const inputEl = useRef();

  const signupSchema = yup.object({
    username: yup.string()
      .min(3, t('errors.username'))
      .max(20, t('errors.username'))
      .required(t('errors.required')),
    password: yup.string()
      .min(6, t('errors.password'))
      .required(t('errors.required')),
    confirmPass: yup.string()
      .test(
        'confirmPass',
        t('errors.confirmPass'),
        (password, context) => password === context.parent.password,
      ),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPass: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        if (filter.check(values.username)) {
          showToast(t('signupForm.toastError'), 'warning');
          return;
        }

        const response = await axios.post(routes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));

        authUser.logIn();
        setShowSuccessModal(true);
      } catch (error) {
        formik.setSubmitting(false);
        showToast(t('toastify.connectionError'), 'error');
        if (error.isAxiosError && error.response.status === 409) {
          setShowErrorModal(true);
        }
        throw error;
      }
    },
  });

  return (
    <div className="container-fluid" style={{ marginTop: '10vh' }}>
      <div className="row justify-content-center pt-4">
        <div className="col-sm-4" style={{ textAlign: 'center' }}>
          <h1 className="mb-3" style={{ margin: '0 auto' }}>{t('signupForm.title')}</h1>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group style={{ width: '400px', margin: '0 auto' }}>
              <Form.Label htmlFor="username" />
              <Form.Control
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                id="username"
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && formik.errors.username}
                size="lg"
                ref={inputEl}
                placeholder={t('signupForm.username')}
              />
              <Form.Control.Feedback type="invalid" className="invalid-feedback">
                {formik.errors.username || null}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group style={{ width: '400px', margin: '0 auto' }}>
              <Form.Label htmlFor="password" />
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                id="password"
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
                size="lg"
                placeholder={t('signupForm.password')}
              />
              <Form.Control.Feedback type="invalid" className="invalid-feedback">
                {formik.errors.password || null}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group style={{ width: '400px', margin: '0 auto' }}>
              <Form.Label htmlFor="confirmPass" />
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPass}
                name="confirmPass"
                id="confirmPass"
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.confirmPass && formik.errors.confirmPass}
                size="lg"
                placeholder={t('signupForm.confirmPass')}
              />
              <Form.Control.Feedback type="invalid" className="invalid-feedback">
                {formik.errors.confirmPass || null}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              style={{ marginTop: '20px', width: '400px' }}
              type="submit"
              variant="outline-primary"
            >
              {t('signupForm.submitButton')}
            </Button>
          </Form>
        </div>
        {showErrorModal
          ? <SignupError show={showErrorModal} handleClose={handleClose} />
          : null}
        {showSuccessModal
          ? <SignupSuccess show={showSuccessModal} handleClose={handleClose} />
          : null}
      </div>
    </div>
  );
};

export default SignupPage;
