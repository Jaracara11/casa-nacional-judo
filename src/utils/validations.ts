import * as Yup from 'yup';

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
    .max(25, 'Apellidos no pueden exceder de 25 caracteres.')
    .min(3, 'Apellidos no pueden tener menos de 3 caracteres.')
    .required('Campo requerido.'),
  birthDate: Yup.string().required('Campo requerido.'),
  bloodType: Yup.string(),
  identification: Yup.string().max(11, 'Número de identificación no puede exceder de 11 caracteres.'),
  address: Yup.string().max(50, 'Dirección no puede exceder de 50 caracteres.').required('Campo requerido.'),
  phone1: Yup.string()
    .test('Número de telefono no puede exceder de 10 caracteres.', (val) => val?.length === 10)
    .required('Campo requerido.'),
  phone2: Yup.string().test('Número de telefono no puede exceder de 10 caracteres.', (val) => val?.length === 10),
  email: Yup.string().email(),
  belt: Yup.string(),
  signUpDate: Yup.string(),
  monthlyFee: Yup.number().positive(),
  anualFee: Yup.number().positive(),
  totalAmountDue: Yup.number()
});

export { signInValidation, memberValidation };
