import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Button from '../Button';

const listStyles = ({ theme }) => css`
  label: button-group;
  display: flex;

  li:not(:last-of-type) {
    margin-right: ${theme.spacings.mega};
  }
`;

const ButtonGroupList = styled('ul', { label: 'ButtonGroupList' })(listStyles);

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
  children: PropTypes.arrayOf(Button).isRequired
};

/**
 * @component
 */
export default ButtonGroup;
