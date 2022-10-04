const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
};

const firstCharToUpper = (str: string) => {
    const sentence = str.toLowerCase().split(' ');
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    sentence.join(' ');
    return sentence.toString().replaceAll(',', ' ');
};

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
    return new Date(date).toLocaleDateString('es-ES', options);
};

const mutationObserver = new MutationObserver((entries) => {
    console.log(entries);
    return entries;
});

export { firstCharToUpper, getCurrentDate, formatDate, mutationObserver };
