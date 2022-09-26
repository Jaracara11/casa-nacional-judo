import { storage } from '../utils/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { MEMBERS_PHOTOS_FOLDER } from '../utils/constants';

const imageRef = (fileName: string) => {
    return ref(storage, `${MEMBERS_PHOTOS_FOLDER}/${fileName}`);
};

const uploadImage = async (image: File, userId: string) => {
    await uploadBytes(imageRef(userId), image);

    return console.log('Image Uploaded!');
};

export { uploadImage };
