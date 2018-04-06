import { pickBy, identity, keys } from '../../../../util/fp';

// The month won't change while this is running, unless you're signing
// up the night before your credit card expires, right before mindnight.
const CURRENT_DATE = new Date();

const CURRENT_MONTH = CURRENT_DATE.getMonth() + 1;
const CURRENT_YEAR = CURRENT_DATE.getFullYear();
const YEAR_PREFIX = `${CURRENT_YEAR}`.slice(0, 2);

export const parseDate = value => {
  const matches = (value || '').replace(/[^\d]/g, '').match(/.{1,2}/g) || [];
  const [month = '', partialYear = ''] = matches;
  // We don't expect this to still run in the next century
  const year = partialYear.length
    ? `${YEAR_PREFIX}${partialYear}`
    : partialYear;
  return { month, year };
};

export const formatDate = ({ month, year }) =>
  year && year.length ? `${month}/${year}` : month;

const validateIncompleteDate = ({ month, year }) =>
  month.length < 2 || year.length < 4;

const validatePastDate = ({ month, year }) => {
  const isPastMonth = parseInt(month, 10) < CURRENT_MONTH;
  const isPastYear = parseInt(year, 10) < CURRENT_YEAR;
  return isPastMonth || isPastYear;
};

export const validate = expiryDate => {
  const incomplete = validateIncompleteDate(expiryDate);
  const past = validatePastDate(expiryDate);
  const activeErrors = pickBy(identity, { incomplete, past });
  return keys(activeErrors).length === 0 ? null : activeErrors;
};
