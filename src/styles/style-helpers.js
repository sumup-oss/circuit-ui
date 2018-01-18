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
