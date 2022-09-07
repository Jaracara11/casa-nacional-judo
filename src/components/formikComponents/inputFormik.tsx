import { Field, ErrorMessage } from 'formik';

export const InputFormik = ({ label, name, ...rest }: any) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field className='form-control' id={name} name={name} {...rest} />
      <ErrorMessage component='div' className='alert alert-danger mt-2' role='alert' name={name} />
    </>
  );
};
