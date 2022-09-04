import './UpsertProduct.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import IMember from '../../interfaces/IMember';
import { getMemberById, updateMember, createMember } from '../../services/members.service';
import { memberValidation } from '../../utils/validations';
import { Spinner } from '../../components/spinner/spinner';

export const UpsertMember = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [member, setMember] = useState<IMember | undefined>(undefined);
  const validation = memberValidation;
  const initialValues: IMember = {
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    phone1: ''
  };

  useEffect(() => {
    const getMember = async () => {
      await getMemberById(params.id!)
        .then((response) => {
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
    <Formik initialValues={params.id ? product : initialValues} validationSchema={validation} onSubmit={postProduct}>
      <Form>
        <h1>{params.id ? 'Edit' : 'Add'} Product</h1>
        <div className='form-control'>
          <div className='form-group m-3'>
            <FormikControl control='input' type='text' label='Product Name:' name='productName' />
          </div>
          <div className='form-group m-3'>
            <FormikControl control='select' label='Product Category:' name='categoryId' options={categories} />
          </div>
          <div className='form-group m-3'>
            <FormikControl control='input' type='number' label='Product Cost:' name='productCost' />
          </div>
          <div className='form-group m-3'>
            <FormikControl control='input' type='number' label='Product Stock:' name='productStock' />
          </div>
          <div className='form-group m-3'>
            <FormikControl as='textarea' cols='2' rows='4' control='input' type='text' label='Product Description:' name='productDescription' />
          </div>
          <div className='form-group m-3'>
            <NavigateButton route={'/'} className='btn btn-outline-dark btn-lg' text={'Back'} />
            <button className='btn btn-secondary btn-lg btn-block' type='submit'>
              Save
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
