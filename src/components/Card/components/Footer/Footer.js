import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { isEqual } from '../../../../util/fp';

const LEFT = 'left';
const RIGHT = 'right';
const ALIGMENT_TYPES = [LEFT, RIGHT];

const isRight = isEqual(RIGHT);

const alignmentStyles = ({ theme, align }) =>
  isRight(align) &&
  css`
    label: card__footer--right;
    ${theme.mq.kilo`
      justify-content: flex-end;
    `};
  `;

const baseStyles = ({ theme }) => css`
  label: card__footer;
  display: block;
  width: 100%;
  margin-top: ${theme.spacings.giga};

  ${theme.mq.kilo`
    align-items: center;
    display: flex;
    margin-top: ${theme.spacings.mega};
  `};
`;

/**
 * Footer used in the Card component. Used for styling and aligment
 * purposes only.
 */
const CardFooter = styled('footer')(baseStyles, alignmentStyles);

CardFooter.propTypes = {
  /**
   * Buttons wrapped in a ButtonGroup.
   */
  children: PropTypes.element,
  /**
   * Direction to align the content. Either left/right
   */
  align: PropTypes.oneOf(ALIGMENT_TYPES)
};

CardFooter.defaultProps = {
  align: 'right'
};

/**
 * @component
 */
export default CardFooter;
