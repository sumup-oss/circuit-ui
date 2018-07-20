import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import { directions } from '../../styles/constants';

const ALIGMENT_TYPES = [directions.LEFT, directions.CENTER, directions.RIGHT];

const baseStyles = ({ theme }) => css`
  label: button-group;
  display: flex;
  list-style-type: none;
  flex-wrap: nowrap;
  overflow: hidden;
  width: 100%;

  > li:not(:last-of-type) {
    margin-right: ${theme.spacings.mega};
  }
`;

const alignmentStyles = ({ align }) => {
  const alignmentMap = {
    [directions.LEFT]: 'flex-start',
    [directions.CENTER]: 'center',
    [directions.RIGHT]: 'flex-end'
  };

  return css`
    label: button-group--${align};
    justify-content: ${alignmentMap[align]};
  `;
};

const stackedMobileStyles = ({ theme, stackedMobile }) =>
  stackedMobile &&
  css`
    label: button-group--stacked-mobile;

    ${theme.mq.untilKilo`
      display: block;

      > li {
        width: 100%;

        &:not(:last-of-type) {
          margin-bottom: ${theme.spacings.mega};
        }

        > * {
          width: 100%;
        }
      }
    `};
  `;

const ButtonGroupList = styled('ul')(
  baseStyles,
  alignmentStyles,
  stackedMobileStyles
);

/**
 * Groups its Button children into a list and adds margins between.
 */
const ButtonGroup = ({ children, align, ...rest }) => (
  <ButtonGroupList {...rest} align={align}>
    {Children.map(children, child => <li>{child}</li>)}
  </ButtonGroupList>
);

ButtonGroup.LEFT = directions.LEFT;
ButtonGroup.CENTER = directions.CENTER;
ButtonGroup.RIGHT = directions.RIGHT;

ButtonGroup.propTypes = {
  /**
   * Buttons to group.
   */
  children: childrenPropType.isRequired,
  /**
   * Direction to align the content. Either left/right
   */
  align: PropTypes.oneOf(ALIGMENT_TYPES),
  /**
   * Whether to stack the buttons on mobile.
   */
  stackedMobile: PropTypes.bool
};

ButtonGroup.defaultProps = {
  align: ButtonGroup.RIGHT,
  stackedMobile: true
};

/**
 * @component
 */
export default ButtonGroup;
