export interface IMember {
    id?: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    bloodType?: string;
    weight: string;
    identification?: string;
    address: string;
    phone1: string;
    phone2?: string;
    email?: string;
    belt?: string;
    signUpDate: string;
    monthlyFee: number;
    anualFee: number;
    totalAmountDue: number;
    hasPhoto: boolean;
    photo?: any;
    photoURL?: string;
}
