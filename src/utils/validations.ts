import * as Yup from 'yup';

const signInValidation = Yup.object({
  email: Yup.string().email().required('Campo obligatorio!'),
  password: Yup.string()
    .max(20, 'Contraseña no puede exceder 20 caracteres.')
    .min(6, 'Contraseña no puede tener menos de 6 caracteres.')
    .required('Campo obligatorio!')
});

export { signInValidation };
