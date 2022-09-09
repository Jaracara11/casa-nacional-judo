import './upsertmember.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import { IMember } from '../../interfaces/IMember';
import { InputFormik } from '../../components/formikComponents/inputFormik';
import { DropdownFormik } from '../../components/formikComponents/dropdownFormik';
import { getMemberById, updateMember, createMember } from '../../services/members.service';
import { memberValidation } from '../../utils/validationSchemas';
import { Spinner } from '../../components/spinner/spinner';
import { NavigateBtn } from '../../components/buttons/navigateButton/navigateBtn';
import { ImagePreview } from '../../components/imagePreview/imagePreview';
import { BELT_LIST } from '../../utils/helper';
import { Button } from 'react-bootstrap';

export const UpsertMember = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [member, setMember] = useState({} as IMember);
  const [uploadedImage, setUploadedImage] = useState<File>();
  const fileRef = useRef<any>(null);
  const initialValues: IMember = {
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    phone1: '',
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
          setMember(response);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoadingData(false);
    };
    params.id ? getMember() : setLoadingData(false);
  }, [params.id]);

  const handleSubmit = (values: IMember) => {
    console.log(uploadedImage);
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
            <InputFormik type='text' label='Nombre:' name='firstName' />
          </div>

          <div className='form-group'>
            <InputFormik type='text' label='Apellido:' name='lastName' />
          </div>

          <div className='form-group'>
            <InputFormik type='text' label='Fecha de nacimiento:' name='birthDate' />
          </div>

          <div className='form-group'>
            <InputFormik type='text' label='Tipo de sangre:' name='bloodType' />
          </div>

          <div className='form-group'>
            <InputFormik type='text' label='Número de identificación:' name='identification' />
          </div>

          <div className='form-group'>
            <InputFormik as='textarea' type='text' label='Dirección:' name='address' />
          </div>

          <div className='form-group'>
            <InputFormik type='text' label='Celular:' name='phone1' />
          </div>

          <div className='form-group'>
            <InputFormik type='text' label='Teléfono:' name='phone2' />
          </div>

          <div className='form-group'>
            <InputFormik type='email' label='Email:' name='email' />
          </div>

          <div className='form-group'>
            <DropdownFormik label='Grado:' name='belt' options={BELT_LIST} />
          </div>

          <div className='form-group'>
            <InputFormik type='text' label='Fecha de inscripción:' name='signUpDate' />
          </div>

          <div className='form-group'>
            <InputFormik type='number' label='Mensualidad:' name='monthlyFee' />
          </div>

          <div className='form-group'>
            <InputFormik type='number' label='Anualidad:' name='anualFee' />
          </div>

          <div className='form-group'>
            <InputFormik type='number' label='Monto total adeudado:' name='totalAmountDue' />
          </div>

          {/* //TODO: Format this form with css */}
          <div className='form-control mt-3 mb-3'>
            <label htmlFor='documentImage'>Foto de documento:</label>
            <br />
            <input
              hidden
              ref={fileRef}
              id='documentImage'
              type='file'
              accept='.jpg, .jpeg, .png'
              name='documentImage'
              onChange={(event) => {
                setUploadedImage(event.target.files![0]);
              }}
            />
          </div>

          <div className='form-control'>
            <Button
              variant='btn btn-success mb-1'
              onClick={() => {
                fileRef.current.click();
              }}>
              Subir Documento
            </Button>
            <br />
            {uploadedImage && <ImagePreview file={uploadedImage} />}
          </div>

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
