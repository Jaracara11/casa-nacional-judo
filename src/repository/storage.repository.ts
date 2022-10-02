import { storage } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MEMBER_PHOTOS_FOLDER } from '../utils/constants';

const imageRef = (fileName: string) => {
    return ref(storage, MEMBER_PHOTOS_FOLDER + fileName);
};

const uploadImage = async (image: File, userId: string) => {
    await uploadBytes(imageRef(userId), image);
};

const downloadImage = async (fileName: string) => {
    getDownloadURL(ref(imageRef(fileName))).then((url) => {
        return url;
    });
};

export { uploadImage, downloadImage };
