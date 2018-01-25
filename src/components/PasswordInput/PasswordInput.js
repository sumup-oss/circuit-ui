import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { InputWrapper } from '../InputWrapper';
import { Input as StandardInput } from '../Input';
import { SvgButton } from '../SvgButton';
import State from '../State/State';
import RevealIconSvg from './eye.svg';
import HideIconSvg from './eye-off.svg';

const Input = styled(StandardInput, { label: 'password-input__input' })(
  ({ theme }) => `
    padding-right: ${theme.spacings.peta};
  `
);

const stylesIcon = css`
  label: password-input__icon;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const RevealIcon = styled(RevealIconSvg, { label: 'reveal-icon' })(stylesIcon);

const HideIcon = styled(HideIconSvg, { label: 'hide-icon' })(stylesIcon);

/**
 * PasswordInput component for forms.
 */
const PasswordInput = ({ disabled, ...props }) => (
  <State
    initialState={false}
    stateName="isVisible"
    stateUpdaterName="onToggle"
    stateUpdater={isVisible => !isVisible}
  >
    {({ isVisible, onToggle }) => (
      <InputWrapper {...{ disabled }} data-selector="password-input">
        <Input
          {...props}
          {...{ disabled }}
          type={isVisible ? 'text' : 'password'}
        />
        <SvgButton {...{ onClick: onToggle, disabled }}>
          {isVisible ? <HideIcon /> : <RevealIcon />}
        </SvgButton>
      </InputWrapper>
    )}
  </State>
);

PasswordInput.propTypes = {
  /**
   * Placeholder string for this input.
   */
  placeholder: PropTypes.string,
  /**
   * Should the input be rendered as disabled?
   */
  disabled: PropTypes.bool
};

PasswordInput.defaultProps = {
  placeholder: 'Password',
  disabled: false
};

/**
 * @component
 */
export default PasswordInput;
