/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  compose(
    ceil,
    divide(totalItems)
  )(perPage);

const availablePreviousPages = (page, totalPages) => {
  if (page === totalPages) {
    return 3;
  }

  return page + 1 === totalPages ? 2 : 1;
};

const availableNextPages = page => {
  if (page === 1) {
    return 3;
  }

  return page === 2 ? 2 : 1;
};

export const arrayOfPreviousValues = (page, totalPages) => {
  if (page < 3) {
    return [];
  }

  const availablePages = availablePreviousPages(page, totalPages);

  const pages = Array.from({ length: availablePages }).map(
    (item, index) => page - (index + 1)
  );

  return reverse(pages);
};

export const arrayOfNextValues = (page, totalPages) => {
  if (page > totalPages - 2) {
    return [];
  }

  const availablePages = availableNextPages(page);

  return Array.from({ length: availablePages }).map(
    (item, index) => page + (index + 1)
  );
};

export const hasOmittedPreviousPages = previousValues => {
  if (isEmpty(previousValues)) {
    return false;
  }

  return compose(
    gt(__, 1),
    subtract(__, 1),
    first,
    sortBy(identity)
  )(previousValues);
};

export const hasOmittedNextPages = (nextValues, totalPages) => {
  if (isEmpty(nextValues)) {
    return false;
  }

  return compose(
    lt(__, totalPages),
    add(1),
    last,
    sortBy(identity)
  )(nextValues);
};
