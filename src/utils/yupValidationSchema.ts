import * as Yup from 'yup';
import { SUPPORTED_FORMATS } from './helper';

const signInValidation = Yup.object({
    email: Yup.string().email().required('Campo obligatorio.'),
    password: Yup.string()
        .max(20, 'Contraseña no puede exceder 20 caracteres.')
        .min(6, 'Contraseña no puede tener menos de 6 caracteres.')
        .required('Campo obligatorio.')
});

const memberValidation = Yup.object({
    firstName: Yup.string()
        .max(20, 'Nombre no puede exceder de 20 caracteres.')
        .min(3, 'Nombre no puede tener menos de 3 caracteres.')
        .required('Campo requerido.'),
    lastName: Yup.string()
        .max(25, 'Apellido no puede exceder de 25 caracteres.')
        .min(3, 'Apellido no puede tener menos de 3 caracteres.')
        .required('Campo requerido.'),
    birthDate: Yup.string().required('Campo requerido.'),
    bloodType: Yup.string(),
    identification: Yup.string().max(11, 'Número de identificación no puede exceder de 11 caracteres.'),
    address: Yup.string().max(50, 'Dirección no puede exceder de 50 caracteres.').required('Campo requerido.'),
    phone1: Yup.string()
        .test('Número de teléfono no puede exceder de 10 caracteres.', (val) => val?.length === 10)
        .required('Campo requerido.'),
    phone2: Yup.string().test('Número de teléfono no puede exceder de 10 caracteres.', (val) => val?.length === 10),
    email: Yup.string().email(),
    belt: Yup.string(),
    signUpDate: Yup.string(),
    monthlyFee: Yup.number().positive(),
    anualFee: Yup.number().positive(),
    totalAmountDue: Yup.number(),
    documentImage: Yup.mixed()
        .nullable()
        .notRequired()
        .test('Formato invalido, favor subir imagen en .JPEG, .JPG o .PNG.', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
        .test('Tamaño de archivo, la imagen no debe exceder de 2MB', (value) => {
            return value && value[0].size < 100;
        })
});

export { signInValidation, memberValidation };
