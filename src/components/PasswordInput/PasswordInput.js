import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { InputWrapper as StandardInputWrapper } from '../InputWrapper';
import { Input as StandardInput } from '../Input';
import State from '../State/State';
import RevealIconSvg from './eye.svg';
import HideIconSvg from './eye-off.svg';

const Input = styled(StandardInput)(
  ({ theme }) => css`
    label: password-input__input;
    padding-right: ${theme.spacings.peta};
  `
);

const InputWrapper = styled(StandardInputWrapper)`
  label: password-input;
  display: inline-block;
`;

const RevealIcon = styled(RevealIconSvg)`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const HideIcon = RevealIcon.withComponent(HideIconSvg);

const SvgButton = styled('button')`
  padding: 0;
  margin: 0;
  display: inline-block;
  background-color: transparent;
  border: none;
  cursor: default;

  &:focus,
  &:active {
    outline: none;
  }
`;

/**
 * PasswordInput component for forms.
 */
const PasswordInput = props => (
  <State
    initialState={false}
    stateName="isVisible"
    stateUpdaterName="onToggle"
    stateUpdater={isVisible => !isVisible}
  >
    {({ isVisible, onToggle }) => (
      <InputWrapper data-selector="password-input">
        <Input {...props} type={isVisible ? 'text' : 'password'} />
        <SvgButton onClick={onToggle}>
          {isVisible ? <HideIcon /> : <RevealIcon />}
        </SvgButton>
      </InputWrapper>
    )}
  </State>
);

PasswordInput.propTypes = {
  /** Placeholder string for this input.
   *
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
