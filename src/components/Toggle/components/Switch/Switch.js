/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { hideVisually, size } from 'polished';

const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 24;
const KNOB_SIZE = 16;
const ANIMATION_TIMING = '200ms ease-in-out';

const knobShadow = color => `0 2px 0 0 ${color}`;

const trackBaseStyles = ({ theme }) => css`
  label: toggle__switch;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  appearance: none;
  flex: 0 0 ${TRACK_WIDTH}px;
  background-color: ${theme.colors.n300};
  border-radius: ${TRACK_HEIGHT}px;
  position: relative;
  transition: background-color ${ANIMATION_TIMING};
  ${size(TRACK_HEIGHT, TRACK_WIDTH)};
  overflow: visible;

  &::-moz-focus-inner {
    border-radius: ${TRACK_HEIGHT}px;
  }
`;

const trackOnStyles = ({ theme, on }) =>
  on &&
  css`
    label: toggle__switch--on;
    background-color: ${theme.colors.p500};
  `;

const SwitchTrack = styled('button')`
  ${trackBaseStyles} ${trackOnStyles};
`;

const knobBaseStyles = ({ theme }) => css`
  label: toggle__switch-knob;
  display: block;
  background-color: ${theme.colors.n100};
  box-shadow: ${knobShadow(theme.colors.n500)};
  position: absolute;
  top: 50%;
  transform: translate3d(${theme.spacings.bit}, -50%, 0);
  transition: box-shadow ${ANIMATION_TIMING}, transform ${ANIMATION_TIMING};
  ${size(KNOB_SIZE)};
  border-radius: ${KNOB_SIZE}px;
`;

const knobOnStyles = ({ theme, on }) =>
  on &&
  css`
    label: toggle__switch-knob--on;
    box-shadow: ${knobShadow(theme.colors.p700)};
    transform: translate3d(
      calc(${TRACK_WIDTH - KNOB_SIZE}px - ${theme.spacings.bit}),
      -50%,
      0
    );
  `;

const labelBaseStyles = () => css`
  label: toggle__switch-label;
  ${hideVisually()};
`;

const SwitchKnob = styled('span')`
  ${knobBaseStyles} ${knobOnStyles};
`;

// Important for accessibility
const SwitchLabel = styled('span')`
  ${labelBaseStyles};
`;

/**
 * A simple Switch component.
 */
const Switch = ({ on, onChange, labelOn, labelOff, ...rest }) => (
  <SwitchTrack
    type="button"
    onClick={onChange}
    on={on}
    role="switch"
    aria-checked={on}
    {...rest}
  >
    <SwitchKnob {...{ on }} />
    <SwitchLabel>{on ? labelOn : labelOff}</SwitchLabel>
  </SwitchTrack>
);

Switch.propTypes = {
  /**
   * Is the Switch on?
   */
  on: PropTypes.bool,
  /**
   * Callback used when the user toggles the switch.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Label for the 'on' state. Important for accessibility.
   */
  labelOn: PropTypes.string,
  /**
   * Label for the 'off' state. Important for accessibility.
   */
  labelOff: PropTypes.string
};

Switch.defaultProps = {
  on: false,
  labelOn: 'on',
  labelOff: 'off'
};

/**
 * @component
 */
export default Switch;
