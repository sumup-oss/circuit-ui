export const parseDate = value => {
  const matches = (value || '').replace(/[^\d]/g, '').match(/.{1,2}/g) || [];
  const [month = '', partialYear = ''] = matches;
  // We don't expect this to still run in the next century
  const year = partialYear.length ? `20${partialYear}` : partialYear;
  return { month, year };
};

export const formatDate = ({ month, year }) =>
  year && year.length ? `${month}/${year}` : month;
