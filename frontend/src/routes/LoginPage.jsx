import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(6, 'Не менее 6 символов')
    .max(12, 'Не более 12 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
});

const LoginPage = () => (
  <div className="form-container">
    <h1>Войти в аккаунт</h1>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="username" />
          {touched.username && errors.username ? <div>{errors.username}</div> : null}

          <Field name="password" />
          {touched.password && errors.password ? <div>{errors.password}</div> : null}

          <button type="submit">Войти</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginPage;
