import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Button from '../Button';
import { childrenPropType } from '../../util/shared-prop-types';
import { isEqual } from '../../util/fp';

const LEFT = 'left';
const RIGHT = 'right';
const ALIGMENT_TYPES = [LEFT, RIGHT];

const isRight = isEqual(RIGHT);

const alignmentStyles = align =>
  isRight(align) &&
  css`
    justify-content: flex-end;
  `;

const baseStyles = ({ theme, align }) => css`
  label: button-group;
  display: block;
  list-style-type: none;
  width: 100%;

  li:not(:last-of-type) {
    margin-bottom: ${theme.spacings.mega};
  }

  ${Button} {
    width: 100%;
  }

  ${theme.mq.kilo`
    display: flex;

    ${alignmentStyles(align)};

    li:not(:last-of-type) {
      margin-right: ${theme.spacings.mega};
    }

    ${Button} {
      width: auto;
    }
  `};
`;

const ButtonGroupList = styled('ul')`
  ${baseStyles};
`;

/**
 * Groups its Button children into a list and adds margins between.
 */
const ButtonGroup = ({ children, align }) => (
  <ButtonGroupList align={align}>
    {Children.map(children, child => <li>{child}</li>)}
  </ButtonGroupList>
);

ButtonGroup.propTypes = {
  /**
   * Buttons to group.
   */
  children: childrenPropType.isRequired,
  /**
   * Direction to align the content. Either left/right
   */
  align: PropTypes.oneOf(ALIGMENT_TYPES)
};

ButtonGroup.defaultProps = {
  align: 'right'
};

/**
 * @component
 */
export default ButtonGroup;
