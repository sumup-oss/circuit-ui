import React, { Children } from 'react';
import styled, { css } from 'react-emotion';

import Button from '../Button';
import { childrenPropType } from '../../util/shared-prop-types';

const listStyles = ({ theme }) => css`
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

  ${theme.mq.medium`
    display: flex;
    justify-content: flex-end;

    li:not(:last-of-type) {
      margin-right: ${theme.spacings.mega};
    }

    ${Button} {
      width: auto;
    }
  `};
`;

const ButtonGroupList = styled('ul')`
  ${listStyles};
`;

/**
 * Groups its Button children into a list and adds margins between.
 */
const ButtonGroup = ({ children }) => (
  <ButtonGroupList>
    {Children.map(children, child => <li>{child}</li>)}
  </ButtonGroupList>
);

ButtonGroup.propTypes = {
  /**
   * Buttons to group.
   */
  children: childrenPropType.isRequired
};

/**
 * @component
 */
export default ButtonGroup;
