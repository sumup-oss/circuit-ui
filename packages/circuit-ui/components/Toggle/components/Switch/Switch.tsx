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

import { HTMLProps, Ref, forwardRef } from 'react';
import { css } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../../../styles/styled';
import { focusVisible, hideVisually } from '../../../../styles/style-mixins';
import { useClickEvent } from '../../../../hooks/useClickEvent';

export interface SwitchProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  /**
   * Is the Switch on?
   */
  checked?: boolean;
  /**
   * Label for the 'on' state. Important for accessibility.
   */
  checkedLabel: string;
  /**
   * Label for the 'off' state. Important for accessibility.
   */
  uncheckedLabel: string;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * The ref to the HTML DOM button element
   */
  ref?: Ref<HTMLButtonElement>;
}

const TRACK_WIDTH = '40px';
const TRACK_HEIGHT = '24px';
const KNOB_SIZE = '16px';
const ANIMATION_TIMING = '200ms ease-in-out';

const knobShadow = (color: string) => `0 2px 0 0 ${color}`;

type TrackElProps = Omit<SwitchProps, 'checkedLabel' | 'uncheckedLabel'>;

const trackBaseStyles = ({ theme }: StyleProps) => css`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  appearance: none;
  flex: 0 0 ${TRACK_WIDTH};
  background-color: ${theme.colors.n300};
  border-radius: ${TRACK_HEIGHT};
  position: relative;
  transition: background-color ${ANIMATION_TIMING};
  height: ${TRACK_HEIGHT};
  width: ${TRACK_WIDTH};
  overflow: visible;
  cursor: pointer;
`;

const trackOnStyles = ({ theme, checked }: StyleProps & TrackElProps) =>
  checked &&
  css`
    background-color: ${theme.colors.p500};
  `;

const SwitchTrack = styled('button')<TrackElProps>(
  focusVisible,
  trackBaseStyles,
  trackOnStyles,
);

type KnobElProps = Pick<SwitchProps, 'checked'>;

const knobBaseStyles = ({ theme }: StyleProps) => css`
  display: block;
  background-color: ${theme.colors.white};
  box-shadow: ${knobShadow(theme.colors.n500)};
  position: absolute;
  top: 50%;
  transform: translate3d(${theme.spacings.bit}, -50%, 0);
  transition: box-shadow ${ANIMATION_TIMING}, transform ${ANIMATION_TIMING};
  height: ${KNOB_SIZE};
  width: ${KNOB_SIZE};
  border-radius: ${KNOB_SIZE};
`;

const knobOnStyles = ({ theme, checked }: StyleProps & KnobElProps) =>
  checked &&
  css`
    box-shadow: ${knobShadow(theme.colors.p700)};
    transform: translate3d(
      calc(${TRACK_WIDTH} - ${KNOB_SIZE} - ${theme.spacings.bit}),
      -50%,
      0
    );
  `;

const SwitchKnob = styled('span')<KnobElProps>(knobBaseStyles, knobOnStyles);

// Important for accessibility
const SwitchLabel = styled('span')(hideVisually);

/**
 * A simple Switch component.
 */
export const Switch = forwardRef(
  (
    {
      checked = false,
      onChange,
      checkedLabel,
      uncheckedLabel,
      tracking,
      ...props
    }: SwitchProps,
    ref: SwitchProps['ref'],
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      (!checkedLabel || !uncheckedLabel)
    ) {
      throw new Error(
        'The Switch component is missing a `checkedLabel` and/or an `uncheckedLabel` prop. This is an accessibility requirement.',
      );
    }
    const handleChange = useClickEvent(onChange, tracking, 'toggle');
    return (
      <SwitchTrack
        type="button"
        onClick={handleChange}
        checked={checked}
        role="switch"
        aria-checked={checked}
        {...props}
        ref={ref}
      >
        <SwitchKnob checked={checked} />
        <SwitchLabel>{checked ? checkedLabel : uncheckedLabel}</SwitchLabel>
      </SwitchTrack>
    );
  },
);

Switch.displayName = 'Switch';
