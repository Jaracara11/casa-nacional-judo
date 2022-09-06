import './auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { UserAuth } from '../../context/userContext';
import Swal from 'sweetalert2';
import { signInValidation } from '../../utils/validations';
import { Spinner } from '../../components/spinner/spinner';
import { InputFormik } from '../../components/formik/inputFormik';
import Button from 'react-bootstrap/Button';
import { IAuthUser } from '../../interfaces/IAuthUser';

export const Auth = () => {
  const SwalObj = Swal.mixin({});
  const { signIn } = UserAuth();
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const validation = signInValidation;
  const initialValues: IAuthUser = {
    email: '',
    password: ''
  };

  const handleOnAuth = async (values: IAuthUser) => {
    setLoadingData(true);
    try {
      await signIn(values.email, values.password);
      navigate('/');
    } catch (err) {
      console.log(err);
      SwalObj.fire({
        html: `<strong>${err}</strong>`,
        icon: 'error',
        showConfirmButton: false
      });
    }
    setLoadingData(false);
  };

  return loadingData ? (
    <Spinner />
  ) : (
    <Formik initialValues={initialValues} validationSchema={validation} onSubmit={handleOnAuth}>
      <div className='login-container'>
        <h1>Bienvenido</h1>
        <Form className='form-control'>
          <InputFormik control='input' type='email' label='Email:' name='email' />
          <InputFormik control='input' type='password' label='Password:' name='password' />
          <Button variant='btn btn-primary btn-lg login-btn' type='submit'>
            Acceder
          </Button>
        </Form>
      </div>
    </Formik>
  );
};
