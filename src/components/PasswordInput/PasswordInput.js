import React from 'react';
import PropTypes from 'prop-types';

import IconInput from '../IconInput';
import SvgButton from '../SvgButton';
import State from '../State/State';
import RevealIcon from './eye.svg';
import HideIcon from './eye-off.svg';

/**
 * PasswordInput component for forms.
 */
const PasswordInput = ({ ...props }) => (
  <State
    initial={false}
    name="visible"
    updaterName="onToggle"
    updater={visible => !visible}
  >
    {({ visible, onToggle }) => (
      <IconInput
        {...props}
        iconPosition="right"
        type={visible ? 'text' : 'password'}
      >
        {({ className }) => (
          <SvgButton onClick={onToggle} className={className}>
            {visible ? <HideIcon /> : <RevealIcon />}
          </SvgButton>
        )}
      </IconInput>
    )}
  </State>
);

PasswordInput.propTypes = {
  /**
   * Placeholder string for this input.
   */
  placeholder: PropTypes.string
};

PasswordInput.defaultProps = {
  placeholder: 'Password'
};

/**
 * @component
 */
export default PasswordInput;
