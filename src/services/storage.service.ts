import { storage } from '../utils/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { MEMBERS_PHOTOS_FOLDER } from '../utils/constants';

const saveImage = (file: File) => {
    const storageRef = ref(storage, MEMBERS_PHOTOS_FOLDER + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            return downloadURL;
        });
    });
};

export { saveImage };
