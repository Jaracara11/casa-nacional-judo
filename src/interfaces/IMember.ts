import { Timestamp } from 'firebase/firestore/lite';
interface IMember {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  bloodType?: string;
  identification?: string;
  address: string;
  phone1: string;
  phone2?: string;
  email?: string;
  belt?: string;
  signUpDate?: Timestamp;
  monthlyFee?: number;
  anualFee?: number;
  totalAmountDue?: number;
}

export default IMember;
