import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { directions } from '../../../../styles/constants';

const ALIGMENT_TYPES = [directions.LEFT, directions.RIGHT];

const alignmentStyles = ({ theme, align }) =>
  align === directions.RIGHT &&
  css`
    label: card__footer--right;
    ${theme.mq.kilo} {
      justify-content: flex-end;
    }
  `;

const baseStyles = ({ theme }) => css`
  label: card__footer;
  display: block;
  width: 100%;
  margin-top: ${theme.spacings.giga};

  ${theme.mq.kilo} {
    align-items: center;
    display: flex;
    margin-top: ${theme.spacings.mega};
  }
`;

/**
 * Footer used in the Card component. Used for styling and aligment
 * purposes only.
 */
const CardFooter = styled('footer')(baseStyles, alignmentStyles);

CardFooter.LEFT = directions.LEFT;
CardFooter.RIGHT = directions.RIGHT;

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
  align: CardFooter.RIGHT
};

/**
 * @component
 */
export default CardFooter;
