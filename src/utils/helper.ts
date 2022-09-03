import { Timestamp } from 'firebase/firestore/lite';

const formatTimeStamp = (timeStamp: Timestamp) => {
  return new Date(timeStamp.seconds * 1000);
};

const firstCharToUpper = (str: string) => {
  const sentence = str.toLowerCase().split(' ');
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  sentence.join(' ');
  return sentence.toString().replaceAll(',', ' ');
};

export { formatTimeStamp, firstCharToUpper };
