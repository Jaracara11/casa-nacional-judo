import './upsertmember.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import { IMember } from '../../interfaces/IMember';
import { InputFormik } from '../../components/formik/inputFormik';
import { getMemberById, updateMember, createMember } from '../../services/members.service';
import { memberValidation } from '../../utils/validations';
import { Spinner } from '../../components/spinner/spinner';
import { NavigateBtn } from '../../components/buttons/navigateButton/navigateBtn';
import { Button } from 'react-bootstrap';

export const UpsertMember = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [member, setMember] = useState({} as IMember);
  const initialValues: IMember = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    bloodType: '',
    identification: '',
    address: '',
    phone1: '',
    phone2: '',
    email: '',
    belt: '',
    signUpDate: '',
    monthlyFee: 0,
    anualFee: 0,
    totalAmountDue: 0
  };

  useEffect(() => {
    const getMember = async () => {
      await getMemberById(params.id!)
        .then((response) => {
          console.log(response);
          setMember(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    params.id && getMember();
    setLoadingData(false);
  }, [params.id]);

  const handleSubmit = (values: IMember) => {
    const SwalObj = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-info m-3',
        cancelButton: 'btn btn-outline-dark'
      },
      buttonsStyling: false
    });

    SwalObj.fire({
      title: `${params.id ? 'Actualizar' : 'Crear'} Miembro`,
      html: `Esta seguro que desea ${params.id ? 'actualizar' : 'crear'} este miembro?`,
      icon: `${params.id ? 'warning' : 'info'}`,
      showCancelButton: true,
      confirmButtonText: 'GUARDAR',
      cancelButtonText: 'CANCELAR',
      focusCancel: true,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingData(true);
        try {
          if (params.id) {
            updateMember(values);
            SwalObj.fire({
              html: `Miembro Actualizado!`,
              icon: 'info',
              showConfirmButton: false
            });
          } else {
            createMember(values);
            SwalObj.fire({
              html: `Miembro Creado!`,
              icon: 'success',
              showConfirmButton: false
            }).then(() => {
              navigate('/');
            });
          }
        } catch (err: any) {
          SwalObj.fire({
            title: 'Error salvando datos!',
            html: `${err.response.data.title}`,
            icon: 'error',
            showConfirmButton: false
          });
        }
        setLoadingData(false);
      }
    });
  };

  return loadingData ? (
    <Spinner />
  ) : (
    <Formik initialValues={params.id ? member : initialValues} validationSchema={memberValidation} onSubmit={handleSubmit}>
      <Form>
        <h1>{params.id ? 'Editar' : 'Agregar'} Miembro</h1>
        <div className='form-control'>
          <div className='form-group'>
            <InputFormik control='input' type='text' label='Nombre:' name='firstName' />
          </div>
          {/* <div className='form-group'>
            <FormikControl control='input' type='text' label='Apellido:' name='lastName' />
          </div>
          <div className='form-group'>
            <FormikControl control='input' type='text' label='Fecha de nacimiento:' name='birthDate' />
          </div>
          <div className='form-group'>
            <FormikControl control='input' type='text' label='Tipo de sangre:' name='bloodType' />
          </div> */}
          <div className='form-group'>
            <NavigateBtn route={'/'} variant='btn btn-outline-dark btn-lg' text={'Back'} />
            <Button variant='btn btn-secondary btn-lg btn-block' type='submit'>
              Save
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
