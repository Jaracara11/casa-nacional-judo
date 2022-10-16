import { GenericObject } from '../interfaces/GenericObject';

const MEMBERS_COLLECTION = 'members';

const MEMBER_PHOTOS_FOLDER = 'member-photos/';

const SUPPORTED_IMAGE_FORMATS: string[] = ['image/jpeg', 'image/jpg', 'image/png'];

const BELT_LIST: GenericObject[] = [
    { key: 'White', value: 'Blanco' },
    { key: 'Yellow', value: 'Amarillo' },
    { key: 'Orange', value: 'Naranja' },
    { key: 'Green', value: 'Verde' },
    { key: 'Blue', value: 'Azul' },
    { key: 'Brown', value: 'Marron' },
    { key: 'Black', value: 'Negro' }
];

const BLOOD_TYPES: string[] = ['', 'A+', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export { SUPPORTED_IMAGE_FORMATS, BELT_LIST, BLOOD_TYPES, MEMBERS_COLLECTION, MEMBER_PHOTOS_FOLDER };
