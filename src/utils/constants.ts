import { IGenericObject } from '../interfaces/IGenericObject';

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

export { SUPPORTED_IMAGE_FORMATS, BELT_LIST };
