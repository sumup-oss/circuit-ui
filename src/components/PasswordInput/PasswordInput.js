import React from 'react';
import PropTypes from 'prop-types';

import { childrenPropType } from '../../util/shared-prop-types';

import IconInput from '../IconInput';
import SvgButton from '../SvgButton';
import State from '../State/State';
import RevealIcon from './eye.svg';
import HideIcon from './eye-off.svg';

/**
 * PasswordInput component for forms.
 */
const PasswordInput = ({ children, ...props }) => (
  <State
    initial={false}
    name="visible"
    updaterName="onToggle"
    updater={visible => !visible}
  >
    {({ visible, onToggle }) => (
      <IconInput
        {...props}
        type={visible ? 'text' : 'password'}
        iconRight={({ className }) => (
          <SvgButton onClick={onToggle} className={className}>
            {visible ? <HideIcon /> : <RevealIcon />}
          </SvgButton>
        )}
      >
        {children}
      </IconInput>
    )}
  </State>
);

PasswordInput.propTypes = {
  children: childrenPropType,
  /**
   * Placeholder string for this input.
   */
  placeholder: PropTypes.string
};

PasswordInput.defaultProps = {
  children: null,
  placeholder: 'Password'
};

/**
 * @component
 */
export default PasswordInput;
