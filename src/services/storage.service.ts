import { storage } from '../utils/firebase';
import { ref, getDownloadURL, uploadBytesResumable, StorageReference, UploadTask } from 'firebase/storage';

const saveImage = (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snap) => {
        const progress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);

    });
};
