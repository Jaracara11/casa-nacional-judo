import './auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/userContext';
import { signInValidation } from '../../utils/yupValidationSchema';
import { Spinner } from '../../components/spinner/spinner';
import { ErrorView } from '../../components/errorView/errorView';
import { IAuthUser } from '../../interfaces/IAuthUser';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';

export const Auth = () => {
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const SwalObj = Swal.mixin({});
  const { signIn } = UserAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInValidation)
  });

  const submitAuth: any = async (userData: IAuthUser) => {
    console.log(userData);
    setLoadingData(true);
    try {
      await signIn(userData.email, userData.password);
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
    <div className='login-container'>
      <h1>Bienvenido</h1>
      <form className='form-control' onSubmit={handleSubmit(submitAuth)}>
        <input className='form-control' {...register('email')} type='email' placeholder='Email...' name='email' />
        <ErrorView error={errors.email} />
        <input className='form-control' {...register('password')} type='password' placeholder='Contraseña' name='password' />
        <ErrorView error={errors.password} />
        <Button variant='btn btn-primary btn-lg login-btn' type='submit'>
          Acceder
        </Button>
      </form>
    </div>
  );
};
