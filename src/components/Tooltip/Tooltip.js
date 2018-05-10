import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { includes } from 'lodash';

import { textKilo, shadowSingle } from '../../styles/style-helpers';
import { directions } from '../../styles/constants';

const baseStyles = ({ theme }) => css`
  label: tooltip;
  display: inline-block;
  width: 100%;
  max-width: 280px;
  min-width: 120px;
  background-color: ${theme.colors.n900};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  position: absolute;
  z-index: ${theme.zIndex.tooltip};
  transition: opacity 0.3s;
  ${textKilo({ theme })};
  ${shadowSingle({ theme })};

  &::after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border: ${theme.spacings.byte} solid transparent;
  }
`;

const positionMap = {
  [directions.TOP]: 'bottom',
  [directions.RIGHT]: 'left',
  [directions.BOTTOM]: 'top',
  [directions.LEFT]: 'right'
};

const getPositionStyles = ({ theme, position }) => {
  const absolutePosition = positionMap[position];
  return `
    ${absolutePosition}: 100%; ${'' /* Fallback  */}
    ${absolutePosition}: calc(100% + ${theme.spacings.kilo});

    &::after {
      ${position}: 100%;
      border-${position}-color: ${theme.colors.n900};
    }
  `;
};

const getAlignmentStyles = ({ theme, position, align }) => {
  const isHorizontal = includes([directions.TOP, directions.BOTTOM], position);

  if (
    isHorizontal &&
    includes([directions.TOP, directions.BOTTOM, directions.CENTER], align)
  ) {
    return `
      left: 50%;
      transform: translateX(-50%);

      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    `;
  }

  if (
    !isHorizontal &&
    includes([directions.LEFT, directions.RIGHT, directions.CENTER], align)
  ) {
    return `
      top: 50%;
      transform: translateY(-50%);

      &::after {
        top: 50%;
        transform: translateY(-50%);
      }
    `;
  }

  const absolutePosition = positionMap[align];

  return `
    ${absolutePosition}: 50%; ${'' /* Fallback  */}
    ${absolutePosition}: calc(50% - (${theme.spacings.mega} + ${
    theme.spacings.bit
  }));

    &::after {
      ${absolutePosition}: ${theme.spacings.kilo};
    }
  `;
};

const positionAndAlignStyles = ({ theme, position, align }) => css`
  label: tooltip--${position}-${align};
  ${getAlignmentStyles({ theme, position, align })};
  ${getPositionStyles({ theme, position })};
`;

/**
 * A Tooltip component
 */
const Tooltip = styled('div')`
  ${baseStyles} ${positionAndAlignStyles};
`;

Tooltip.CENTER = directions.CENTER;
Tooltip.TOP = directions.TOP;
Tooltip.RIGHT = directions.RIGHT;
Tooltip.BOTTOM = directions.BOTTOM;
Tooltip.LEFT = directions.LEFT;

Tooltip.propTypes = {
  /**
   * The content of the tooltip.
   */
  children: PropTypes.node.isRequired,
  /**
   * The position of the tooltip in relation to its reference point.
   */
  position: PropTypes.oneOf([
    Tooltip.TOP,
    Tooltip.RIGHT,
    Tooltip.BOTTOM,
    Tooltip.LEFT
  ]),
  /**
   * The alignment of the tooltip relative to its position.
   */
  align: PropTypes.oneOf([
    Tooltip.TOP,
    Tooltip.RIGHT,
    Tooltip.BOTTOM,
    Tooltip.LEFT,
    Tooltip.CENTER
  ])
};

Tooltip.defaultProps = {
  position: Tooltip.RIGHT,
  align: Tooltip.CENTER
};

export default Tooltip;
