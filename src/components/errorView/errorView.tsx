import { FieldErrorsImpl } from 'react-hook-form';

export const ErrorView = ({ error }: FieldErrorsImpl) => {
    return (
        <>
            {error && (
                <p className='alert alert-danger mt-1' role='alert'>
                    {error?.message?.toString()}
                </p>
            )}
        </>
    );
};
