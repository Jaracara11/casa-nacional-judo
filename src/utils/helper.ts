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

const mutationObserver = (docElement: string) => {
    const elementToObserve: any = document.querySelector(docElement);
    let mutation: boolean = false;
    const observer = new MutationObserver((entries) => {
        entries.length > 0 && (mutation = true);
        console.log(entries.length);
        console.log(mutation);
    });
    observer.observe(elementToObserve, { childList: true });
    return mutation;
};

export { firstCharToUpper, getCurrentDate, formatDate, mutationObserver };
