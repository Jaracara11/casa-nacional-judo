import './upsertmember.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BELT_LIST } from '../../utils/constants';
import { getCurrentDate } from '../../utils/helper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IMember } from '../../interfaces/IMember';
import { getMemberById, updateMember, createMember } from '../../services/members.service';
import { uploadImage } from '../../services/storage.service';
import { memberValidation } from '../../utils/yupValidationSchema';
import { Spinner } from '../../components/spinner/spinner';
import { ErrorView } from '../../components/errorView/errorView';
import { NavigateBtn } from '../../components/buttons/navigateButton/navigateBtn';
import { ImagePreview } from '../../components/imagePreview/imagePreview';
import { Button } from 'react-bootstrap';

export const UpsertMember = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const [member, setMember] = useState({} as IMember);
    const [documentImage, setDocumentImage] = useState<File>();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(memberValidation)
    });

    useEffect(() => {
        const getMember = async () => {
            setLoadingData(true);
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
    }, [params.id, documentImage]);

    const submitUserData: any = (values: IMember) => {
        const SwalObj = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-outline-info m-3',
                cancelButton: 'btn btn-outline-dark'
            },
            buttonsStyling: false
        });

        SwalObj.fire({
            title: `${params.id ? 'Actualizar' : 'Crear'} Miembro`,
            html: `Esta seguro que desea ${params.id ? 'actualizar este miembro?' : 'agregar este nuevo miembro?'}`,
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
                        console.log(values);
                        //updateMember(values);
                        SwalObj.fire({
                            html: `<strong>Miembro Actualizado!</strong>`,
                            icon: 'info',
                            showConfirmButton: false
                        });
                    } else {
                        console.log(values);
                        //createMember(values);
                        SwalObj.fire({
                            html: `<strong>Nuevo miembro Agregado!</strong>`,
                            icon: 'success',
                            showConfirmButton: false
                        }).then(() => {
                            //navigate('/');
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

                uploadImage(documentImage!, 'imagen de prueba');
                setLoadingData(false);
            }
        });
    };

    return loadingData ? (
        <Spinner />
    ) : (
        <div className='upsert-container'>
            <form className='form-control' onSubmit={handleSubmit(submitUserData)}>
                <h1>{params.id ? 'Editar' : 'Agregar'} Miembro</h1>
                <div className='form-control'>
                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='firstName'>
                            Nombres:
                        </label>
                        <input className='form-control' {...register('firstName')} type='text' name='firstName' />
                        <ErrorView error={errors.firstName} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='lastName'>
                            Apellidos:
                        </label>
                        <input className='form-control' {...register('lastName')} type='text' name='lastName' />
                        <ErrorView error={errors.lastName} />
                    </div>

                    <div className='form-control mt-3 input-date'>
                        <label className='text-muted' htmlFor='birthDate'>
                            Fecha de nacimiento:
                        </label>
                        <input className='form-control' {...register('birthDate')} type='date' name='birthDate' />
                        <ErrorView error={errors.birthDate} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='bloodType'>
                            Tipo de sangre:
                        </label>
                        <input className='form-control' {...register('bloodType')} type='text' name='bloodType' />
                        <ErrorView error={errors.bloodType} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='identification'>
                            Cédula:
                        </label>
                        <input className='form-control' {...register('identification')} type='text' name='identification' />
                        <ErrorView error={errors.identification} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='address'>
                            Dirección:
                        </label>
                        <textarea className='form-control' {...register('address')} name='address' />
                        <ErrorView error={errors.address} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='phone1'>
                            Teléfono 1:
                        </label>
                        <input className='form-control' {...register('phone1')} type='text' name='phone1' />
                        <ErrorView error={errors.phone1} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='phone1'>
                            Teléfono 2:
                        </label>
                        <input className='form-control' {...register('phone2')} type='text' name='phone2' />
                        <ErrorView error={errors.phone2} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='email'>
                            Email:
                        </label>
                        <input className='form-control' {...register('email')} type='email' name='email' />
                        <ErrorView error={errors.email} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='email'>
                            Cinturón:
                        </label>
                        <select className='form-select'>
                            {BELT_LIST.map((belt) => (
                                <option key={belt.key} value={belt.key}>
                                    {belt.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='form-control mt-3 input-date'>
                        <label className='text-muted' htmlFor='birthDate'>
                            Fecha de inscripción:
                        </label>
                        <input className='form-control' {...register('signUpDate')} type='date' name='signUpDate' />
                        <ErrorView error={errors.signUpDate} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='monthlyFee'>
                            Mensualidad:
                        </label>
                        <input className='form-control' {...register('monthlyFee')} type='number' name='monthlyFee' />
                        <ErrorView error={errors.monthlyFee} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='anualFee'>
                            Anualidad:
                        </label>
                        <input className='form-control' {...register('anualFee')} type='number' name='anualFee' />
                        <ErrorView error={errors.anualFee} />
                    </div>

                    <div className='form-control mt-3'>
                        <label className='text-muted' htmlFor='documentImage'>
                            Foto de documento:
                        </label>
                        <input
                            className='form-control'
                            type='file'
                            accept='.jpg, .jpeg, .png'
                            name='documentImage'
                            onChange={(e: any) => {
                                setDocumentImage(e.target.files[0]);
                            }}
                        />
                        {documentImage && <ImagePreview file={documentImage} />}
                    </div>
                </div>

                <div className='form-group mt-3'>
                    <NavigateBtn route={'/'} variant='btn btn-outline-dark btn-lg' text={'Back'} />
                    <Button variant='btn btn-primary btn-lg btn-block' type='submit'>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};
