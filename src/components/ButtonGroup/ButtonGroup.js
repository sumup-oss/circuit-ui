import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import { directions } from '../../styles/constants';

const ALIGMENT_TYPES = [directions.LEFT, directions.CENTER, directions.RIGHT];

const getInlineStyles = theme => css`
  display: flex;
  flex-wrap: nowrap;

  > li:not(:last-of-type) {
    margin-bottom: 0;
    margin-right: ${theme.spacings.mega};
  }
`;

const baseStyles = ({ theme }) => css`
  label: button-group;
  list-style-type: none;
  overflow: hidden;
  width: 100%;

  > li {
    &:not(:last-of-type) {
      margin-bottom: ${theme.spacings.mega};
    }

    > * {
      width: 100%;
    }
  }

  ${theme.mq.kilo(getInlineStyles(theme))};
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

const inlineMobileStyles = ({ theme, inlineMobile }) =>
  inlineMobile &&
  css`
    label: button-group--inline-mobile;

    ${theme.mq.untilKilo(getInlineStyles(theme))};
  `;

const ButtonGroupList = styled('ul')(
  baseStyles,
  alignmentStyles,
  inlineMobileStyles
);

/**
 * Groups its Button children into a list and adds margins between.
 */
const ButtonGroup = ({ children, ...props }) => (
  <ButtonGroupList {...props}>
    {Children.map(children, child => (child ? <li>{child}</li> : null))}
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
   * Whether to display buttons inline on mobile.
   */
  inlineMobile: PropTypes.bool
};

ButtonGroup.defaultProps = {
  align: ButtonGroup.RIGHT,
  inlineMobile: false
};

/**
 * @component
 */
export default ButtonGroup;
