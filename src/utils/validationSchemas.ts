import { object, string, number, mixed } from 'yup';

const signInValidation = object({
  email: string().email().required('Campo obligatorio.'),
  password: string()
    .max(20, 'Contraseña no puede exceder 20 caracteres.')
    .min(6, 'Contraseña no puede tener menos de 6 caracteres.')
    .required('Campo obligatorio.')
});

const memberValidation = object({
  firstName: string()
    .max(20, 'Nombre no puede exceder de 20 caracteres.')
    .min(3, 'Nombre no puede tener menos de 3 caracteres.')
    .required('Campo requerido.'),
  lastName: string()
    .max(25, 'Apellido no puede exceder de 25 caracteres.')
    .min(3, 'Apellido no puede tener menos de 3 caracteres.')
    .required('Campo requerido.'),
  birthDate: string().required('Campo requerido.'),
  bloodType: string(),
  identification: string().max(11, 'Número de identificación no puede exceder de 11 caracteres.'),
  address: string().max(50, 'Dirección no puede exceder de 50 caracteres.').required('Campo requerido.'),
  phone1: string()
    .test('Número de teléfono no puede exceder de 10 caracteres.', (val) => val?.length === 10)
    .required('Campo requerido.'),
  phone2: string().test('Número de teléfono no puede exceder de 10 caracteres.', (val) => val?.length === 10),
  email: string().email(),
  belt: string(),
  signUpDate: string(),
  monthlyFee: number().positive(),
  anualFee: number().positive(),
  totalAmountDue: number(),
  attachment: mixed().test('fileSize', 'The file is too large', (value) => {
    if (!value.length) return true; // attachment is optional
    return value[0].size <= 2000000;
  })
});

export { signInValidation, memberValidation };
