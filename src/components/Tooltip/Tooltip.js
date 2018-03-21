import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { includes } from 'lodash';

import {
  textKilo,
  centerAlign,
  shadowSingle
} from '../../styles/style-helpers';

const CENTER = 'center';
const TOP = 'top';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const LEFT = 'left';

const backgroundColor = ({ theme }) => theme.colors.n900;

const baseStyles = ({ theme }) => css`
  label: tooltip;
  display: inline-block;
  width: 100%;
  max-width: 280px;
  min-width: 120px;
  background-color: ${backgroundColor({ theme })};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  position: absolute;
  z-index: 1;
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

const oppositeMap = {
  [TOP]: 'bottom',
  [RIGHT]: 'left',
  [BOTTOM]: 'top',
  [LEFT]: 'right'
};

const getPositionStyles = ({ theme, position }) => {
  // const arrowMap = {
  //   [TOP]: `
  //     border-bottom-right-radius: 2px;
  //     transform: translateY(-50%) rotate(45deg);
  //     `,
  //   [RIGHT]: `
  //     border-bottom-left-radius: 2px;
  //     transform: translateX(50%) rotate(45deg);
  //   `,
  //   [BOTTOM]: `
  //     border-top-left-radius: 2px;
  //     transform: translateY(50%) rotate(45deg);
  //   `,
  //   [LEFT]: `
  //     border-top-right-radius: 2px;
  //     transform: translateX(-50%) rotate(45deg);
  //   `
  // };

  const opposite = oppositeMap[position];
  return `
    ${opposite}: 100%; ${'' /* Fallback  */}
    ${opposite}: calc(100% + ${theme.spacings.kilo});

    &::after {
      ${position}: 100%;
      border-${position}-color: ${backgroundColor({ theme })};
    }
  `;
};

const getAlignmentStyles = ({ theme, position, align }) => {
  const isHorizontal = includes([TOP, BOTTOM], position);

  if (isHorizontal && includes([TOP, BOTTOM, CENTER], align)) {
    return `
      ${centerAlign('horizontal')};

      &::after {
        ${centerAlign('horizontal')};
      }
    `;
  }

  if (!isHorizontal && includes([LEFT, RIGHT, CENTER], align)) {
    return `
      ${centerAlign('vertical')};

      &::after {
        ${centerAlign('vertical')};
      }
    `;
  }

  const opposite = oppositeMap[align];

  return `
    ${opposite}: 50%; ${'' /* Fallback  */}
    ${opposite}: calc(50% - (${theme.spacings.mega} + ${theme.spacings.bit}));

    &::after {
      ${opposite}: ${theme.spacings.kilo};
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

Tooltip.CENTER = CENTER;
Tooltip.TOP = TOP;
Tooltip.RIGHT = RIGHT;
Tooltip.BOTTOM = BOTTOM;
Tooltip.LEFT = LEFT;

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
