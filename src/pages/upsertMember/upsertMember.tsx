import './upsertmember.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IMember } from '../../interfaces/IMember';
import { getMemberById, updateMember, createMember } from '../../services/members.service';
import { memberValidation } from '../../utils/yupValidationSchema';
import { Spinner } from '../../components/spinner/spinner';
import { ErrorView } from '../../components/errorView/errorView';
import { NavigateBtn } from '../../components/buttons/navigateButton/navigateBtn';
import { ImagePreview } from '../../components/imagePreview/imagePreview';
import { Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

////////////////////////////////////////////////////////////////////////////////
import { storage } from '../../utils/firebase';
import { ref, getDownloadURL, uploadBytesResumable, StorageReference, UploadTask } from 'firebase/storage';

export const UpsertMember = () => {
    ////////////////////////////////////////////////////////////////////////////////

    const navigate = useNavigate();
    const params = useParams();
    const [loadingData, setLoadingData] = useState(false);
    const [member, setMember] = useState({} as IMember);
    const [uploadedImage, setUploadedImage] = useState<File>();
    const [imgURL, setImgURL] = useState<string>('');
    const [progressPercent, setProgressPercent] = useState(0);
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

    const saveImage = (file: File) => {
        const storageRef = ref(storage, `members-photos/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('url' + downloadURL);
                    setImgURL(downloadURL);
                });
            }
        );
    };

    const handleFileChange = (event: any) => {
        setImgURL('');
        setUploadedImage(event.target.files![0]);
        member.documentImage = event.target.files![0];
        console.log(member.documentImage);
        saveImage(member.documentImage!);
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
        console.log('1 Render');
        params.id ? getMember() : setLoadingData(false);
    }, [params.id, uploadedImage, imgURL]);

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
                            html: `Miembro Actualizado!`,
                            icon: 'info',
                            showConfirmButton: false
                        });
                    } else {
                        createMember(values);
                        SwalObj.fire({
                            html: `Nuevo miembro Agregado!`,
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

                console.log('docImg' + member.documentImage);
                member.documentImage && saveImage(member.documentImage);
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
                    <input type='file' accept='.jpg, .jpeg, .png' name='documentImage' onChange={handleFileChange} />
                </div>

                {!imgURL && <ProgressBar now={progressPercent} label={`${progressPercent}%`} />}
                {imgURL && <img src={imgURL} alt='uploaded file' height={200} width={200} />}

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
