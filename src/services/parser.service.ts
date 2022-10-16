import { Member } from '../interfaces/Member';
import { firstCharToUpper } from '../utils/helper';

const parseNewMemberObject = (data: Member) => {
    data.photo!.length > 0 ? (data.hasPhoto = true) : (data.hasPhoto = false);
    delete data.photo;
    data.email?.length === 0 && delete data.email;
    data.identification?.length === 0 && delete data.identification;
    data.bloodType?.length === 0 && delete data.bloodType;
    data.phone2?.length === 0 && delete data.phone2;
    data.totalAmountDue = data.monthlyFee;
    data.firstName = firstCharToUpper(data.firstName);
    data.lastName = firstCharToUpper(data.lastName);
    data.address = firstCharToUpper(data.address);
    return data;
};

const parseUpdateMemberObject = (data: Member) => {
    data.photo!.length > 0 && (data.hasPhoto = true);
    delete data.photo;
    delete data.photoURL;
    return data;
};

export { parseNewMemberObject, parseUpdateMemberObject };
