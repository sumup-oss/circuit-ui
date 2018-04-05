export const parseDate = (value = '') => {
  if (!value || (value && !value.length)) {
    return { month: '', year: '' };
  }

  const cleanValue = value
    .replace(/(?![\d/])/g, '')
    .match(/(0[1-9]|1[0-2]|[1-9])\/?([0-9]{1,2})?/g)
    .join('');
  const containsSlash = /\//.test(cleanValue);
  const [month, partialYear] = containsSlash
    ? cleanValue.split('/')
    : [cleanValue.slice(0, 2), cleanValue.slice(2)];
  const partialYearNeedsPadding = partialYear && partialYear.length < 2;
  const twoDigitYear = partialYearNeedsPadding
    ? `${partialYear}0`
    : partialYear;
  const year = partialYear && `20${twoDigitYear}`;
  return { month, year };
};

export const formatDate = ({ month, year }) => {};
