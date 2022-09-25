import { useState } from 'react';
import { Spinner } from '../spinner/spinner';

export const ImagePreview = ({ file }: any) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>();
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    };

    return preview ? (
        <>
            <img src={preview?.toString()} alt='Preview' width='200px' height='200px' />
        </>
    ) : (
        <Spinner />
    );
};
