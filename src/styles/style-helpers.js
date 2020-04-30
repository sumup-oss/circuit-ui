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

import { css } from '@emotion/core';
import { stripUnit, transparentize } from 'polished';

import { mapValues } from '../util/fp';
import { sizes } from './constants';

const { KILO, MEGA, GIGA } = sizes;

/**
 * Shadows
 */

export const shadowBorder = (color, borderSize = '1px') => `
  box-shadow: 0px 0px 0px ${borderSize} ${color};
`;

export const shadowGround = ({ theme }) => `
  box-shadow: 0 0 0 2px ${transparentize(0.97, theme.colors.shadow)};
`;

export const shadowSingle = ({ theme }) => `
  box-shadow: 0 0 0 1px ${transparentize(0.98, theme.colors.shadow)},
    0 0 1px 0 ${transparentize(0.94, theme.colors.shadow)},
    0 2px 2px 0 ${transparentize(0.94, theme.colors.shadow)};
`;

export const shadowDouble = ({ theme }) => `
  box-shadow: 0 0 0 1px ${transparentize(0.98, theme.colors.shadow)},
    0 2px 2px 0 ${transparentize(0.94, theme.colors.shadow)},
    0 4px 4px 0 ${transparentize(0.94, theme.colors.shadow)};
`;

export const shadowTriple = ({ theme }) => `
  box-shadow: 0 0 0 1px ${transparentize(0.98, theme.colors.shadow)},
    0 4px 4px 0 ${transparentize(0.94, theme.colors.shadow)},
    0 8px 8px 0 ${transparentize(0.94, theme.colors.shadow)};
`;

/**
 * Typography
 */

const createTypeHelper = (type, name) => ({ theme }) => {
  const { fontSize, lineHeight } = theme.typography[type][name];
  return `
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const headingKilo = createTypeHelper('headings', 'kilo');
export const headingMega = createTypeHelper('headings', 'mega');
export const headingGiga = createTypeHelper('headings', 'giga');
export const headingTera = createTypeHelper('headings', 'tera');
export const headingPeta = createTypeHelper('headings', 'peta');
export const headingExa = createTypeHelper('headings', 'exa');
export const headingZetta = createTypeHelper('headings', 'zetta');

export const subHeadingKilo = createTypeHelper('subHeadings', 'kilo');
export const subHeadingMega = createTypeHelper('subHeadings', 'mega');

export const textKilo = createTypeHelper('text', 'kilo');
export const textMega = createTypeHelper('text', 'mega');
export const textGiga = createTypeHelper('text', 'giga');
export const textTera = createTypeHelper('text', 'tera');

/**
 * Utilities
 */

export const disableVisually = () => `
  opacity: 0.5;
  pointer-events: none;
  box-shadow: none;
`;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const transformUnit = (values, transform, allowMultipleUnits = true) => {
  const getUnit = (value, otherUnit) => {
    const [unit] = /[a-zA-Z]+/.exec(value) || [];

    const multipleValuesWithUnit = !allowMultipleUnits && unit && otherUnit;
    if (multipleValuesWithUnit) {
      // eslint-disable-next-line no-console
      console.warn(`You cannot ${transform.name} multiple values with a unit.`);
      return 'undefined';
    }

    const valuesWithDifferentUnits = unit && otherUnit && unit !== otherUnit;
    if (valuesWithDifferentUnits) {
      // eslint-disable-next-line no-console
      console.warn(`You cannot ${transform.name} values with different units.`);
      return 'undefined';
    }
    return unit;
  };
  const transformedValue = values.reduce((result, value) => {
    const { amount, unit } = result;
    const newAmount = stripUnit(value);
    const newUnit = getUnit(value, unit);
    return {
      amount: amount ? transform(amount, newAmount) : newAmount,
      unit: newUnit || unit
    };
  }, {});
  return `${transformedValue.amount}${transformedValue.unit}`;
};

export const addUnit = (...args) => transformUnit(args, add);
export const subtractUnit = (...args) => transformUnit(args, subtract);
export const multiplyUnit = (...args) => transformUnit(args, multiply, false);
export const divideUnit = (...args) => transformUnit(args, divide, false);

export const clearfix = css`
  /*
 * For modern browsers
 * 1. The space content is one way to avoid an Opera bug when the
 *  contenteditable attribute is included anywhere else in the document.
 *  Otherwise it causes space to appear at the top and bottom of elements
 *  that are clearfixed.
 * 2. The use of table rather than "block" is only necessary if using
 * ":before" to contain the top-margins of child elements.
 */
  &::before,
  &::after {
    content: ' '; /* 1 */
    display: table; /* 2 */
  }
  &::after {
    clear: both;
  }
`;

export const calculatePadding = ({ theme, size: buttonSize }) => (
  diff = '0px'
) => {
  const sizeMap = {
    /* eslint-disable max-len */
    [KILO]: `calc(${theme.spacings.bit} - ${diff}) calc(${theme.spacings.mega} - ${diff})`,
    [MEGA]: `calc(${theme.spacings.byte} - ${diff}) calc(${theme.spacings.giga} - ${diff})`,
    [GIGA]: `calc(${theme.spacings.kilo} - ${diff}) calc(${theme.spacings.tera} - ${diff})`
    /* eslint-enable max-len */
  };

  if (!sizeMap[buttonSize] && buttonSize) {
    return null;
  }

  return sizeMap[buttonSize] || sizeMap.mega;
};
