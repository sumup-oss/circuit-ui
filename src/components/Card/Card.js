import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import {
  shadowSingle,
  shadowDouble,
  shadowTriple
} from '../../styles/style-helpers';

const SINGLE = 'single';
const DOUBLE = 'double';
const TRIPLE = 'triple';

const KILO = 'kilo';
const MEGA = 'mega';

const baseStyles = ({ theme }) => css`
  label: card;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 400px;
`;

const shadowStyles = ({ theme, shadow }) => {
  const shadows = {
    [SINGLE]: shadowSingle({ theme }),
    [DOUBLE]: shadowDouble({ theme }),
    [TRIPLE]: shadowTriple({ theme })
  };
  return css`
    label: card--shadow-${shadow};
    ${shadows[shadow]};
  `;
};

const spacingStyles = ({ theme, spacing }) => {
  const spacings = {
    [KILO]: `
      ${theme.spacings.mega} ${theme.spacings.mega}
    `,
    [MEGA]: `
      ${theme.spacings.mega} ${theme.spacings.giga}
    `
  };
  return css`
    label: card--spacing-${spacing};
    padding: ${spacings[spacing]};
  `;
};

/**
 * Card component that is used for displaying content on a grid.
 */
const Card = styled('div')`
  ${baseStyles} ${shadowStyles} ${spacingStyles};
`;

Card.SINGLE = SINGLE;
Card.DOUBLE = DOUBLE;
Card.TRIPLE = TRIPLE;

Card.KILO = KILO;
Card.MEGA = MEGA;

Card.propTypes = {
  /**
   * Depth
   */
  shadow: PropTypes.oneOf([Card.SINGLE, Card.DOUBLE, Card.TRIPLE]),
  /**
   * Spacing
   */
  spacing: PropTypes.oneOf([Card.KILO, Card.MEGA]),
  /**
   * Content to be rendered inside the Card.
   */
  children: childrenPropType
};

Card.defaultProps = {
  spacing: Card.MEGA,
  shadow: Card.SINGLE
};

/**
 * @component
 */
export default Card;
