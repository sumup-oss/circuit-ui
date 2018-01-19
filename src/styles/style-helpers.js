import { transparentize } from 'polished';
import { css } from 'react-emotion';

/**
 * Shadows
 */

export const shadowGround = ({ theme }) => css`
  box-shadow: 0 0 0 2px ${transparentize(theme.colors.shadow, 0.97)};
`;

export const shadowSingle = ({ theme }) => css`
  box-shadow: 0 0 0 1px ${transparentize(theme.colors.shadow, 0.98)},
    0 0 1px 0 ${transparentize(theme.colors.shadow, 0.94)},
    0 2px 2px 0 ${transparentize(theme.colors.shadow, 0.94)};
`;

export const shadowDouble = ({ theme }) => css`
  box-shadow: 0 0 0 1px ${transparentize(theme.colors.shadow, 0.98)},
    0 2px 2px 0 ${transparentize(theme.colors.shadow, 0.94)},
    0 4px 4px 0 ${transparentize(theme.colors.shadow, 0.94)};
`;

export const shadowTripe = ({ theme }) => css`
  box-shadow: 0 0 0 1px ${transparentize(theme.colors.shadow, 0.98)},
    0 4px 4px 0 ${transparentize(theme.colors.shadow, 0.94)},
    0 8px 8px 0 ${transparentize(theme.colors.shadow, 0.94)};
`;

/**
 * Typography
 */

const createTypeHelper = (type, name) => ({ theme }) => {
  const { fontSize, lineHeight } = theme.type[type][name];
  return css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const headingKilo = createTypeHelper('heading', 'kilo');
export const headingMega = createTypeHelper('heading', 'mega');
export const headingGiga = createTypeHelper('heading', 'giga');
export const headingTera = createTypeHelper('heading', 'tera');
export const headingPeta = createTypeHelper('heading', 'peta');
export const headingExa = createTypeHelper('heading', 'exa');
export const headingZetta = createTypeHelper('heading', 'zetta');

export const subHeadingKilo = createTypeHelper('subHeading', 'exa');
export const subHeadingZetta = createTypeHelper('subHeading', 'zetta');

export const bodyKilo = createTypeHelper('body', 'kilo');
export const bodyMega = createTypeHelper('body', 'mega');
export const bodyGiga = createTypeHelper('body', 'giga');
