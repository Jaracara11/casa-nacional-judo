import './auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { UserAuth } from '../../context/userContext';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signInValidation } from '../../utils/validations';
import Spinner from '../../components/spinner/spinner';
import InputFormik from '../../components/formik/inputFormik';
import Button from 'react-bootstrap/Button';
import IAuthUser from '../../interfaces/IAuthUser';

const Auth = () => {
  const SwalObj = Swal.mixin({});
  const { signIn } = UserAuth();
  const params = useParams();
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
      navigate(`/${params.site}/admin-panel`);
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
      <div className='form-container'>
        <h2>Login</h2>
        <Form className='form-control'>
          <InputFormik control='input' type='email' label='Email:' name='email' />
          <InputFormik control='input' type='password' label='Password:' name='password' />
          <Button variant='btn btn-secondary btn-lg login-btn' type='submit'>
            Login
          </Button>
        </Form>
      </div>
    </Formik>
  );
};

export default Auth;
