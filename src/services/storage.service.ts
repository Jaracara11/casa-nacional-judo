import { storage } from '../utils/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { MEMBER_PHOTOS_FOLDER } from '../utils/constants';

const imageRef = (fileName: string) => {
    return ref(storage, MEMBER_PHOTOS_FOLDER + fileName);
};

const uploadImage = async (image: File, userId: string) => {
    await uploadBytes(imageRef(userId), image);

    return console.log('Image Uploaded!');
};

export { uploadImage };
