import * as Yup from 'yup';
import { SUPPORTED_IMAGE_FORMATS } from './constants';

let result: boolean;

const signInValidation = Yup.object({
    email: Yup.string().email().required('Campo obligatorio.'),
    password: Yup.string()
        .max(20, 'Contraseña no puede exceder 20 caracteres.')
        .min(6, 'Contraseña no puede tener menos de 6 caracteres.')
        .required('Campo obligatorio.')
});

const memberValidation = Yup.object({
    firstName: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Nombre no puede tener menos de 3 caracteres.')
        .max(20, 'Nombre no puede exceder de 20 caracteres.'),
    lastName: Yup.string()
        .required('Campo requerido.')
        .min(3, 'Apellido no puede tener menos de 3 caracteres.')
        .max(25, 'Apellido no puede exceder de 25 caracteres.'),
    birthDate: Yup.string().required('Campo requerido.'),
    bloodType: Yup.string().max(2, 'Tipo de sangre no puede exceder de 2 caracteres.'),
    weight: Yup.number().required('Campo requerido.').moreThan(0, 'Favor indicar el peso en kilogramos.'),
    identification: Yup.string().max(11, 'Número de identificación no puede exceder de 11 caracteres.'),
    address: Yup.string().max(80, 'Dirección no puede exceder de 80 caracteres.').required('Campo requerido.'),
    phone1: Yup.string().required('Campo requerido.').length(10, 'Número de teléfono debe tener 10 caracteres.'),
    phone2: Yup.string(),
    email: Yup.string().email(),
    belt: Yup.string(),
    signUpDate: Yup.string().required('Campo requerido.'),
    monthlyFee: Yup.number().positive('Mensualidad debe ser mayor a Cero.').required('Campo requerido.'),
    anualFee: Yup.number().positive('Anualidad debe ser mayor a Cero.').required('Campo requerido.'),
    totalAmountDue: Yup.number(),
    photo: Yup.mixed()
        .test('fileSize', 'El tamaño de la imagen no debe exceder los 2MB.', (file): any => {
            file.length && file[0].size > 2000000 ? (result = false) : (result = true);
            return result;
        })
        .test('fileType', 'Favor subir una imagen en formato .JPEG, .JPG o .PNG.', (file): any => {
            file.length && !SUPPORTED_IMAGE_FORMATS.includes(file[0].type) ? (result = false) : (result = true);
            return result;
        })
});

export { signInValidation, memberValidation };
