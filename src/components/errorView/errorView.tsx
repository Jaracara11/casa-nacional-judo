import { FieldErrorsImpl } from 'react-hook-form';

export const ErrorView = ({ error }: FieldErrorsImpl) => {
  return (
    <>
      {error && (
        <p className='alert alert-danger' role='alert'>
          {error?.message?.toString()}
        </p>
      )}
    </>
  );
};
