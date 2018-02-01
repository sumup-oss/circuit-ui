import React from 'react';
import PropTypes from 'prop-types';
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

CloseButton.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired
};

/**
 * @component
 */
export default CloseButton;
