import { InputFormik } from './inputFormik';

export const FormikControl = ({ control, ...rest }: any) => {
  switch (control) {
    case 'input':
      return <InputFormik {...rest} />;
    default:
      return null;
  }
};
