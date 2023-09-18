export const getBaseURLFromFullURL = (url) => {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}`;
}