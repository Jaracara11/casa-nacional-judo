import * as Yup from 'yup';
import { SUPPORTED_IMAGE_FORMATS } from './constants';

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
    identification: Yup.string().max(11, 'Número de identificación no puede exceder de 11 caracteres.'),
    address: Yup.string().max(60, 'Dirección no puede exceder de 60 caracteres.').required('Campo requerido.'),
    phone1: Yup.string().required('Campo requerido.').length(10, 'Número de teléfono debe tener 10 caracteres.'),
    phone2: Yup.string(),
    email: Yup.string().email(),
    belt: Yup.string(),
    signUpDate: Yup.string(),
    monthlyFee: Yup.number().positive('Mensualidad debe ser mayor a Cero.').required('Campo requerido.'),
    anualFee: Yup.number().positive('Anualidad debe ser mayor a Cero.').required('Campo requerido.'),
    totalAmountDue: Yup.number(),
    documentImage: Yup.mixed()
        .test(
            'Formato invalido, favor subir imagen en .JPEG, .JPG o .PNG.',
            (value) => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))
        )
        .test('Tamaño de archivo, la imagen no debe exceder de 2MB', (value) => {
            return value && value[0].size < 100;
        })
});

export { signInValidation, memberValidation };
