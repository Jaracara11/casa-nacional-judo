import './upsertmember.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
        console.log('1 Render');
        console.log(documentImage);
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
                        updateMember(values);
                        SwalObj.fire({
                            html: `<strong>Miembro Actualizado!</strong>`,
                            icon: 'info',
                            showConfirmButton: false
                        });
                    } else {
                        createMember(values);
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
            <form className='form-control'>
                <h1>{params.id ? 'Editar' : 'Agregar'} Miembro</h1>
                <div className='form-control'>
                    <label htmlFor='documentImage'>Foto de documento:</label>
                    <input
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        name='documentImage'
                        onChange={(e: any) => {
                            setDocumentImage(e.target.files[0]);
                        }}
                    />
                </div>

                {documentImage && <ImagePreview file={documentImage} />}

                <div className='form-group'>
                    <NavigateBtn route={'/'} variant='btn btn-outline-dark btn-lg' text={'Back'} />
                    <Button variant='btn btn-primary btn-lg btn-block' onClick={submitUserData}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};
