import removeDiacritics from './removeDiacritics';

const normalizeString = (str) => removeDiacritics(str.toLowerCase());

export default normalizeString;
