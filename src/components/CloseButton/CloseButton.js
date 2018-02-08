import React from 'react';
import { css } from 'react-emotion';

import SvgButton from '../SvgButton';
import Icon from './close-icon.svg';

const className = css`
  label: close-button;
  height: 13px;
  width: 13px;
`;

/**
 * A generic close button.
 */
const CloseButton = props => (
  <SvgButton {...{ className, ...props }}>
    <Icon />
  </SvgButton>
);

/**
 * @component
 */
export default CloseButton;
