import React from 'react';
import styled, { css } from 'react-emotion';

import Icon from './info.svg';

const baseStyles = ({ theme }) => {
  const color = theme.colors.n500;
  return css`
    label: info-icon;
    border: 1px solid ${color};
    border-radius: 100%;
    fill: ${color};
  `;
};

/**
 * A small info icon used for triggering tooltips
 * and other informational content.
 */
const StyledIcon = styled(Icon)(baseStyles);
const InfoIcon = props => <StyledIcon role="img" {...props} />;

/**
 * @component
 */
export default InfoIcon;
