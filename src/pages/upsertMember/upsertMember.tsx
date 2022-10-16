import './upsertmember.css';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BELT_LIST, BLOOD_TYPES } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IMember } from '../../interfaces/IMember';
import { updateMember, createMember } from '../../repository/members.repository';
import { uploadImage } from '../../repository/storage.repository';
import { memberValidation } from '../../utils/yupValidationSchema';
import { Spinner } from '../../components/spinner/spinner';
import { ErrorView } from '../../components/errorView/errorView';
import { NavigateBtn } from '../../components/buttons/navigateButton/navigateBtn';
import { ImagePreview } from '../../components/imagePreview/imagePreview';
import { Button } from 'react-bootstrap';
import { parseNewMemberObject, parseUpdateMemberObject } from '../../services/parser.service';

export const UpsertMember = () => {
    const location = useLocation() as any;
    const navigate = useNavigate();

    const [loadingData, setLoadingData] = useState(true);
    const [member, setMember] = useState({} as IMember);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(memberValidation)
    });

    useEffect(() => {
        location.state && setMember(location.state.member);
        location.state && reset(location.state.member);
        setLoadingData(false);
    }, []);

    const submitUserData: any = (values: IMember) => {
        const SwalObj = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-outline-info m-3',
                cancelButton: 'btn btn-outline-dark'
            },
            buttonsStyling: false
        });

        SwalObj.fire({
            title: `${location.state ? 'Actualizar' : 'Crear'} Miembro`,
            html: `Esta seguro que desea ${location.state ? 'actualizar este miembro?' : 'agregar este nuevo miembro?'}`,
            icon: `${location.state ? 'warning' : 'info'}`,
            showCancelButton: true,
            confirmButtonText: 'GUARDAR',
            cancelButtonText: 'CANCELAR',
            focusCancel: true,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                setLoadingData(true);
                try {
                    if (location.state) {
                        values.photo.length > 0 && uploadImage(values.photo[0], member.id!);
                        updateMember(parseUpdateMemberObject(values));

                        SwalObj.fire({
                            html: `<strong>Miembro Actualizado!</strong>`,
                            icon: 'info',
                            showConfirmButton: false
                        }).then(() => {
                            navigate('/');
                        });
                    } else {
                        let photoToUpload: File | null = null;
                        values.photo.length > 0 && (photoToUpload = values.photo[0]);
                        createMember(parseNewMemberObject(values)).then((response) => {
                            photoToUpload && uploadImage(photoToUpload, response.id);
                        });

                        SwalObj.fire({
                            html: `<strong>Nuevo miembro Agregado!</strong>`,
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
                    }).finally(() => {
                        setLoadingData(false);
                    });
                }
            }
        });
    };

    return loadingData ? (
        <Spinner />
    ) : (
        <div className='upsert-container'>
            <form onSubmit={handleSubmit(submitUserData)}>
                <h1>{location.state ? 'Editar' : 'Agregar'} Miembro</h1>
                <div className='form-control'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <label className='text-muted required' htmlFor='firstName'>
                                Nombres:
                            </label>
                            <input className='form-control' {...register('firstName')} type='text' name='firstName' minLength={3} maxLength={20} />
                            <ErrorView error={errors.firstName} />
                        </div>
                        <div className='col-sm-6'>
                            <label className='text-muted required' htmlFor='lastName'>
                                Apellidos:
                            </label>
                            <input className='form-control' {...register('lastName')} type='text' name='lastName' minLength={3} maxLength={25} />
                            <ErrorView error={errors.lastName} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <label className='text-muted' htmlFor='identification'>
                                Cédula:
                            </label>
                            <input className='form-control' {...register('identification')} type='text' name='identification' maxLength={11} />
                            <ErrorView error={errors.identification} />
                        </div>
                        <div className='col-sm-6'>
                            <label className='text-muted' htmlFor='email'>
                                Email:
                            </label>
                            <input className='form-control' {...register('email')} type='email' name='email' />
                            <ErrorView error={errors.email} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <label className='text-muted required' htmlFor='phone1'>
                                Teléfono 1:
                            </label>
                            <input className='form-control' {...register('phone1')} type='text' name='phone1' minLength={10} maxLength={10} />
                            <ErrorView error={errors.phone1} />
                        </div>
                        <div className='col-sm-6'>
                            <label className='text-muted' htmlFor='phone2'>
                                Teléfono 2:
                            </label>
                            <input className='form-control' {...register('phone2')} type='text' name='phone2' minLength={10} maxLength={10} />
                            <ErrorView error={errors.phone2} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-4'>
                            <label className='text-muted' htmlFor='email'>
                                Cinturón:
                            </label>
                            <select className='form-select' {...register('belt')}>
                                {BELT_LIST.map((belt) => (
                                    <option key={belt.key} value={belt.value}>
                                        {belt.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='col-sm-4'>
                            <label className='text-muted' htmlFor='bloodType'>
                                Tipo de sangre:
                            </label>
                            <select className='form-select' {...register('bloodType')}>
                                {BLOOD_TYPES.map((bloodType) => (
                                    <option key={bloodType} value={bloodType}>
                                        {bloodType}
                                    </option>
                                ))}
                            </select>
                            <ErrorView error={errors.bloodType} />
                        </div>
                        <div className='col-sm-4'>
                            <label className='text-muted required' htmlFor='weight'>
                                Peso (kg):
                            </label>
                            <input className='form-control' {...register('weight')} type='number' name='weight' defaultValue={0} />
                            <ErrorView error={errors.weight} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label className='text-muted required' htmlFor='birthDate'>
                                Fecha de nacimiento:
                            </label>
                            <input className='form-control' {...register('birthDate')} type='date' name='birthDate' />
                            <ErrorView error={errors.birthDate} />
                        </div>
                        <div className='col'>
                            <label className='text-muted required' htmlFor='birthDate'>
                                Fecha de inscripción:
                            </label>
                            <input className='form-control' {...register('signUpDate')} type='date' name='signUpDate' />
                            <ErrorView error={errors.signUpDate} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'></div>
                        <div className='col'></div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label className='text-muted required' htmlFor='monthlyFee'>
                                Mensualidad:
                            </label>
                            <input className='form-control' {...register('monthlyFee')} type='number' name='monthlyFee' defaultValue={0} />
                            <ErrorView error={errors.monthlyFee} />
                        </div>
                        <div className='col'>
                            <label className='text-muted required' htmlFor='anualFee'>
                                Anualidad:
                            </label>
                            <input className='form-control' {...register('anualFee')} type='number' name='anualFee' defaultValue={0} />
                            <ErrorView error={errors.anualFee} />
                        </div>
                    </div>

                    <label className='text-muted required' htmlFor='address'>
                        Dirección:
                    </label>
                    <textarea className='form-control' {...register('address')} name='address' maxLength={80} />
                    <ErrorView error={errors.address} />

                    <div className='row'>
                        <div className='col'>
                            <label className='text-muted' htmlFor='photo'>
                                Foto de documento:
                            </label>
                            <input
                                className='form-control'
                                type='file'
                                accept='.jpg, .jpeg, .png'
                                {...register('photo')}
                                name='photo'
                                onChange={(e: any) => {
                                    setMember(() => ({ ...member, photo: e.target.files[0] }));
                                }}
                            />
                            <ErrorView error={errors.photo} />
                            {member.photo && <ImagePreview file={member.photo} />}
                            {member.photoURL && !member.photo && <img className='img-preview' src={member.photoURL} alt='Preview' />}
                        </div>
                    </div>
                </div>

                <div className='form-group mt-3'>
                    <div className='row'>
                        <div className='col-6'>
                            <NavigateBtn route={'/'} variant='btn btn-outline-dark btn-lg' text={'Atrás'} />
                        </div>
                        <div className='col-6'>
                            <Button variant='btn btn-primary btn-lg btn-block' type='submit'>
                                Guardar
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
