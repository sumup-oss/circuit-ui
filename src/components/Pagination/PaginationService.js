// @flow

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

export const calculatePages = (totalItems: number, perPage: number): number =>
  compose(ceil, divide(totalItems))(perPage);

export const createEmptyArrayFromNumber = (length: number): Array<any> =>
  Array.from({ length });

const availableSortsForPrevious = (
  page: number,
  totalPages: number
): number => {
  if (page === totalPages) {
    return 3;
  }

  return page + 1 === totalPages ? 2 : 1;
};

const availableSortsForNext = (page: number): number => {
  if (page === 1) {
    return 3;
  }

  return page === 2 ? 2 : 1;
};

export const arrayOfPreviousValues = (
  page: number,
  totalPages: number
): Array<number> => {
  if (page < 3) return [];

  const availableSorts = availableSortsForPrevious(page, totalPages);

  const pages = createEmptyArrayFromNumber(availableSorts).map(
    (item, index) => page - (index + 1)
  );

  return reverse(pages);
};

export const arrayOfNextValues = (
  page: number,
  totalPages: number
): Array<number> => {
  if (page > totalPages - 2) return [];

  const availableSorts = availableSortsForNext(page);

  return createEmptyArrayFromNumber(availableSorts).map(
    (item, index) => page + (index + 1)
  );
};

export const shouldHavePreviousDots = (
  previousValues: Array<number>
): boolean => {
  if (isEmpty(previousValues)) {
    return false;
  }

  return compose(gt(__, 1), subtract(__, 1), first, sortBy(identity))(
    previousValues
  );
};

export const shouldHaveNextDots = (
  nextValues: Array<number>,
  totalPages: number
): boolean => {
  if (isEmpty(nextValues)) {
    return false;
  }

  return compose(lt(__, totalPages), add(1), last, sortBy(identity))(
    nextValues
  );
};
