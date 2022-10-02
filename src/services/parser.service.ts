import { IMember } from '../interfaces/IMember';
import { firstCharToUpper } from '../utils/helper';

const parseNewMemberObject = (data: IMember) => {
    delete data.documentImage;
    data.totalAmountDue = data.monthlyFee;
    data.firstName = firstCharToUpper(data.firstName);
    data.lastName = firstCharToUpper(data.lastName);
    data.bloodType && (data.bloodType = firstCharToUpper(data.bloodType));
    data.address = firstCharToUpper(data.address);
    return data;
};

const parseUpdateMemberObject = (data: IMember, id: string) => {
    delete data.documentImage;
    data.id = id;
    return data;
};

export { parseNewMemberObject, parseUpdateMemberObject };
