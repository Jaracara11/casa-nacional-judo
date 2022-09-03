interface IMember {
  memberId?: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  bloodType?: string;
  identification?: string;
  address: string;
  phone1: string;
  phone2?: string;
  email?: string;
  belt?: string;
  signUpDate?: Date;
  monthlyFee?: number;
  anualFee?: number;
  totalAmountDue?: number;
}

export default IMember;
