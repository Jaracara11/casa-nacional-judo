import { IGenericObject } from '../interfaces/IGenericObject';

const MEMBERS_COLLECTION = 'members';

const MEMBERS_PHOTOS_FOLDER = 'members-photos/';

const SUPPORTED_IMAGE_FORMATS: string[] = ['image/jpeg', 'image/jpg', 'image/png'];

const BELT_LIST: IGenericObject[] = [
    { key: 'White', value: 'Blanco' },
    { key: 'Yellow', value: 'Amarillo' },
    { key: 'Orange', value: 'Naranja' },
    { key: 'Green', value: 'Verde' },
    { key: 'Blue', value: 'Azul' },
    { key: 'Brown', value: 'Marron' },
    { key: 'Black', value: 'Negro' }
];

export { SUPPORTED_IMAGE_FORMATS, BELT_LIST, MEMBERS_COLLECTION, MEMBERS_PHOTOS_FOLDER };
