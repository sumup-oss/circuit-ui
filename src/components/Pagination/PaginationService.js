import {
  ceil,
  compose,
  divide,
  isEmpty,
  first,
  last,
  gt,
  add,
  subtract,
  lt,
  __,
  sortBy,
  identity,
  reverse
} from 'lodash/fp';

export const calculatePages = (totalItems, perPage) =>
  compose(ceil, divide(totalItems))(perPage);

export const createEmptyArrayFromNumber = length => Array.from({ length });

const availableSortsForPrevious = (page, totalPages) => {
  if (page === totalPages) {
    return 3;
  }

  return page + 1 === totalPages ? 2 : 1;
};

const availableSortsForNext = page => {
  if (page === 1) {
    return 3;
  }

  return page === 2 ? 2 : 1;
};

export const arrayOfPreviousValues = (page, totalPages) => {
  if (page < 3) return [];

  const availableSorts = availableSortsForPrevious(page, totalPages);

  const pages = createEmptyArrayFromNumber(availableSorts).map(
    (item, index) => page - (index + 1)
  );

  return reverse(pages);
};

export const arrayOfNextValues = (page, totalPages) => {
  if (page > totalPages - 2) return [];

  const availableSorts = availableSortsForNext(page);

  return createEmptyArrayFromNumber(availableSorts).map(
    (item, index) => page + (index + 1)
  );
};

export const hasOmittedPreviousPages = previousValues => {
  if (isEmpty(previousValues)) {
    return false;
  }

  return compose(gt(__, 1), subtract(__, 1), first, sortBy(identity))(
    previousValues
  );
};

export const hasOmittedNextPages = (nextValues, totalPages) => {
  if (isEmpty(nextValues)) {
    return false;
  }

  return compose(lt(__, totalPages), add(1), last, sortBy(identity))(
    nextValues
  );
};
