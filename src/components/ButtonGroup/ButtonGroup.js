import React, { Children } from 'react';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';

const listStyles = ({ theme }) => css`
  label: button-group;
  display: flex;
  list-style-type: none;

  li:not(:last-of-type) {
    margin-right: ${theme.spacings.mega};
  }
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
