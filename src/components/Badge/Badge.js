import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import { values } from '../../util/fp';
import { subHeadingKilo } from '../../styles/style-helpers';
import { colorNames } from '../../styles/constants';

const getColorStyles = (theme, colorName) => {
  const colorMap = {
    [colorNames.SUCCESS]: `
      background-color: ${theme.colors.g500};
      color: ${theme.colors.white};

      &:hover {
        background-color: ${theme.colors.g700};
      }

      &:active {
        background-color: ${theme.colors.y900};
      }
    `,
    [colorNames.WARNING]: `
      background-color: ${theme.colors.y500};
      color: ${theme.colors.dark};

      &:hover {
        background-color: ${theme.colors.y700};
      }

      &:active {
        background-color: ${theme.colors.y900};
      }
    `,
    [colorNames.DANGER]: `
      background-color: ${theme.colors.r500};
      color: ${theme.colors.white};

      &:hover {
        background-color: ${theme.colors.r700};
      }

      &:active {
        background-color: ${theme.colors.y900};
      }
    `,
    [colorNames.PRIMARY]: `
      background-color: ${theme.colors.b500};
      color: ${theme.colors.white};

      &:hover {
        background-color: ${theme.colors.b700};
      }

      &:active {
        background-color: ${theme.colors.y900};
      }
    `,
    [colorNames.NEUTRAL]: `
      background-color: ${theme.colors.n300};
      color: ${theme.colors.dark};

      &:hover {
        background-color: ${theme.colors.n500};
      }

      &:active {
        background-color: ${theme.colors.n700};
      }
  `
  };

  const colorStyles = colorMap[colorName] || colorMap[colorNames.NEUTRAL];

  return css(colorStyles);
};

const colorStyles = ({ theme, color }) => {
  if (color === colorNames.NEUTRAL) {
    return null;
  }

  return css`
    label: badge--${color};
    ${getColorStyles(theme, color)};
  `;
};

const baseStyles = ({ theme }) => css`
  label: badge;
  border-radius: 100px;
  cursor: default;
  padding: 0 ${theme.spacings.byte};
  ${subHeadingKilo({ theme })};
  text-transform: uppercase;
  user-select: none;
  ${getColorStyles(theme, colorNames.NEUTRAL)};
`;

const circleStyles = ({ circle }) =>
  circle &&
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    ${size(24)};
  `;

/**
 * A badge for displaying update notifications etc.
 */
const Badge = styled('div')`
  ${baseStyles};
  ${colorStyles};
  ${circleStyles};
`;

Badge.propTypes = {
  /**
   * Callback for the click event.
   */
  onClick: PropTypes.func,
  /**
   * Ensures text is centered and the badge looks like a circle.
   */
  circle: PropTypes.bool,
  color: PropTypes.oneOf(values(colorNames))
};

Badge.NEUTRAL = colorNames.NEUTRAL;
Badge.PRIMARY = colorNames.PRIMARY;
Badge.SUCCESS = colorNames.SUCCESS;
Badge.WARNING = colorNames.WARNING;
Badge.DANGER = colorNames.DANGER;

Badge.defaultProps = {
  onClick: () => {},
  circle: false,
  color: Badge.NEUTRAL
};

/**
 * @component
 */
export default Badge;
