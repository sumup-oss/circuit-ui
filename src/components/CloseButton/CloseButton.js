import React from 'react';
import { css } from 'react-emotion';

import { svgKilo } from '../../styles/style-helpers';
import SvgButton from '../SvgButton';
import Icon from './close-icon.svg';

const className = css`
  label: close-button;
  ${svgKilo};
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
