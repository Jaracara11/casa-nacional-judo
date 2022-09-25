import './upsertmember.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IMember } from '../../interfaces/IMember';
import { getMemberById, updateMember, createMember } from '../../services/members.service';
import { memberValidation } from '../../utils/yupValidationSchema';
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

    const handleFileChange = (event: any) => {
        setUploadedImage(event.target.files![0]);
        member.documentImage = event.target.files![0];
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

        member.documentImage = uploadedImage;
        params.id ? getMember() : setLoadingData(false);
    }, [params.id, uploadedImage]);

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
        <form>
            <h1>{params.id ? 'Editar' : 'Agregar'} Miembro</h1>
            <div className='form-control'>
                <label htmlFor='documentImage'>Foto de documento:</label>
                <input ref={fileRef} id='documentImage' type='file' accept='.jpg, .jpeg, .png' name='documentImage' onChange={handleFileChange} />
            </div>

            <div className='form-control'>
                <br />
                {uploadedImage && <ImagePreview file={uploadedImage} />}
            </div>

            <div className='form-group'>
                <NavigateBtn route={'/'} variant='btn btn-outline-dark btn-lg' text={'Back'} />
                <Button variant='btn btn-primary btn-lg btn-block' type='submit'>
                    Save
                </Button>
            </div>
        </form>
    );
};
