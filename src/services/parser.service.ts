import { IMember } from '../interfaces/IMember';
import { firstCharToUpper } from '../utils/helper';

const parseNewMemberObject = (data: IMember) => {
    data.photo!.length > 0 ? (data.hasPhoto = true) : (data.hasPhoto = false);
    delete data.photo;
    data.totalAmountDue = data.monthlyFee;
    data.firstName = firstCharToUpper(data.firstName);
    data.lastName = firstCharToUpper(data.lastName);
    data.address = firstCharToUpper(data.address);
    return data;
};

const parseUpdateMemberObject = (data: IMember) => {
    data.photo!.length > 0 && (data.hasPhoto = true);
    delete data.photo;
    delete data.photoURL;
    return data;
};

export { parseNewMemberObject, parseUpdateMemberObject };
