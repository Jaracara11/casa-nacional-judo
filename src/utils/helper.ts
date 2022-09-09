import { IGenericObject } from '../interfaces/IGenericObject';

const BELT_LIST: IGenericObject[] = [
  { key: 'White', value: 'Blanco' },
  { key: 'Yellow', value: 'Amarillo' },
  { key: 'Orange', value: 'Naranja' },
  { key: 'Green', value: 'Verde' },
  { key: 'Blue', value: 'Azul' },
  { key: 'Brown', value: 'Marron' },
  { key: 'Black', value: 'Negro' }
];

const SUPPORTED_FORMATS: string[] = ['image/jpeg', 'image/jpg', 'image/png'];

const firstCharToUpper = (str: string) => {
  const sentence = str.toLowerCase().split(' ');
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  sentence.join(' ');
  return sentence.toString().replaceAll(',', ' ');
};

export { firstCharToUpper, BELT_LIST, SUPPORTED_FORMATS };
