const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
};

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
    return new Date(date).toLocaleDateString('es-ES', options);
};

const getAgeFromDate = (dateString: string) => {
    const birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
};

const firstCharToUpper = (str: string) => {
    const sentence = str.toLowerCase().split(' ');
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    sentence.join(' ');
    return sentence.toString().replaceAll(',', ' ');
};

export { firstCharToUpper, getCurrentDate, formatDate, getAgeFromDate };
