import { IMember } from '../interfaces/IMember';
import { firstCharToUpper } from '../utils/helper';

const parseNewMemberObject = (data: IMember) => {
    data.documentImage && delete data.documentImage;
    data.totalAmountDue = data.monthlyFee;
    data.firstName = firstCharToUpper(data.firstName);
    data.lastName = firstCharToUpper(data.lastName);
    data.bloodType && (data.bloodType = firstCharToUpper(data.bloodType));
    data.address = firstCharToUpper(data.address);
    console.log(data);

    return data;
};

export { parseNewMemberObject };