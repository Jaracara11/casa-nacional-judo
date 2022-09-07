import { Field, ErrorMessage } from 'formik';
import { IGenericObject } from '../../interfaces/IGenericObject';

export const DropdownFormik = ({ label, name, options, ...rest }: any) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field as='select' className='form-control' id={name} name={name} {...rest}>
        {options.map((x: IGenericObject) => {
          return (
            <option key={x.key} value={x.key}>
              {x.value}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component='div' className='alert alert-danger mt-2' role='alert' name={name} />
    </>
  );
};
