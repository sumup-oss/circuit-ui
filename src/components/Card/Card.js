import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import {
  shadowSingle,
  shadowDouble,
  shadowTriple
} from '../../styles/style-helpers';
import { sizes, shadows } from '../../styles/constants';

const { MEGA, GIGA } = sizes;
const { SINGLE, DOUBLE, TRIPLE } = shadows;

const baseStyles = ({ theme }) => css`
  label: card;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 98%;
  width: calc(100% - ${theme.spacings.mega});

  ${theme.mq.kilo`
    width: auto;
  `};
`;

const shadowStyles = ({ theme, shadow }) => {
  const shadowOptions = {
    [SINGLE]: shadowSingle,
    [DOUBLE]: shadowDouble,
    [TRIPLE]: shadowTriple
  };
  return css`
    label: card--shadow-${shadow};
    ${shadowOptions[shadow]({ theme })};
  `;
};

const spacingStyles = ({ theme, spacing }) => {
  const spacings = {
    [MEGA]: `
      ${theme.spacings.mega} ${theme.spacings.mega}
    `,
    [GIGA]: `
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

Card.MEGA = MEGA;
Card.GIGA = GIGA;

Card.propTypes = {
  /**
   * The shadow depth of the Card.
   */
  shadow: PropTypes.oneOf([Card.SINGLE, Card.DOUBLE, Card.TRIPLE]),
  /**
   * The padding of the Card.
   */
  spacing: PropTypes.oneOf([Card.MEGA, Card.GIGA]),
  /**
   * Content to be rendered inside the Card.
   */
  children: childrenPropType
};

Card.defaultProps = {
  spacing: Card.GIGA,
  shadow: Card.SINGLE
};

/**
 * @component
 */
export default Card;
