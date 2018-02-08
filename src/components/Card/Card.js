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

const baseStyles = ({ theme }) => css`
  label: card;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 460px;
  padding: ${theme.spacings.mega} ${theme.spacings.giga};
`;

const shadowStyles = ({ theme, shadow }) => css`
  label: card--shadow-${shadow};
  ${shadow === SINGLE && shadowSingle({ theme })};
  ${shadow === DOUBLE && shadowDouble({ theme })};
  ${shadow === TRIPLE && shadowTriple({ theme })};
`;

/**
 * Card component that is used for displaying content on a grid.
 */
const Card = styled('div')`
  ${baseStyles} ${shadowStyles};
`;

Card.SINGLE = SINGLE;
Card.DOUBLE = DOUBLE;
Card.TRIPLE = TRIPLE;

Card.propTypes = {
  /**
   * Depth
   */
  shadow: PropTypes.oneOf([Card.SINGLE, Card.DOUBLE, Card.TRIPLE]),
  /**
   * Content to be rendered inside the Card.
   */
  children: childrenPropType
};

Card.defaultProps = {
  depth: Card.SINGLE
};

/**
 * @component
 */
export default Card;
