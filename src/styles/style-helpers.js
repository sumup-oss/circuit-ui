import { transparentize } from 'polished';

/**
 * Shadows
 */

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

export const headingKilo = createTypeHelper('heading', 'kilo');
export const headingMega = createTypeHelper('heading', 'mega');
export const headingGiga = createTypeHelper('heading', 'giga');
export const headingTera = createTypeHelper('heading', 'tera');
export const headingPeta = createTypeHelper('heading', 'peta');
export const headingExa = createTypeHelper('heading', 'exa');
export const headingZetta = createTypeHelper('heading', 'zetta');

export const subHeadingKilo = createTypeHelper('subHeading', 'exa');
export const subHeadingZetta = createTypeHelper('subHeading', 'zetta');

export const textKilo = createTypeHelper('text', 'kilo');
export const textMega = createTypeHelper('text', 'mega');
export const textGiga = createTypeHelper('text', 'giga');

/**
 * Utilities
 */

export const disableVisually = () => `
  opacity: 0.5;
  pointer-events: none;
`;
