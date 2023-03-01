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

import { ButtonHTMLAttributes, Ref, forwardRef } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../../../styles/styled';
import { focusVisible, hideVisually } from '../../../../styles/style-mixins';
import { useClickEvent, TrackingProps } from '../../../../hooks/useClickEvent';
import { AccessibilityError } from '../../../../util/errors';

export interface SwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

const trackBaseStyles = css`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  appearance: none;
  flex: 0 0 ${TRACK_WIDTH};
  background-color: var(--cui-bg-highlight);
  border-radius: ${TRACK_HEIGHT};
  position: relative;
  transition: background-color ${ANIMATION_TIMING};
  height: ${TRACK_HEIGHT};
  width: ${TRACK_WIDTH};
  overflow: visible;
  cursor: pointer;

  &:hover {
    background-color: var(--cui-bg-highlight-hovered);
  }
  &:active {
    background-color: var(--cui-bg-highlight-pressed);
  }
`;

const trackOnStyles = () =>
  css`
    &[aria-checked='true'] {
      background-color: var(--cui-bg-accent-strong);

      &:hover {
        background-color: var(--cui-bg-accent-strong-hovered);
      }
      &:active {
        background-color: var(--cui-bg-accent-strong-pressed);
      }
    }
  `;

const trackDisabledStyles = () => css`
  &:disabled,
  &[disabled] {
    background-color: var(--cui-bg-highlight-disabled);
  }

  &[aria-checked='true']:disabled,
  &[aria-checked='true'][disabled] {
    background-color: var(--cui-bg-accent-strong-disabled);
  }
`;

const SwitchTrack = styled('button')<TrackElProps>(
  focusVisible,
  trackBaseStyles,
  trackOnStyles,
  trackDisabledStyles,
);

type KnobElProps = Pick<SwitchProps, 'checked'>;

const knobBaseStyles = ({ theme }: StyleProps) => css`
  display: block;
  background-color: var(--cui-fg-on-strong);
  box-shadow: ${knobShadow('var(--cui-border-normal-pressed)')};
  position: absolute;
  top: 50%;
  transform: translate3d(${theme.spacings.bit}, -50%, 0);
  transition: box-shadow ${ANIMATION_TIMING}, transform ${ANIMATION_TIMING};
  height: ${KNOB_SIZE};
  width: ${KNOB_SIZE};
  border-radius: ${KNOB_SIZE};
`;

const knobOnStyles = ({ theme }: StyleProps) =>
  css`
    [aria-checked='true'] & {
      box-shadow: ${knobShadow('var(--cui-border-accent-pressed)')};
      transform: translate3d(
        calc(${TRACK_WIDTH} - ${KNOB_SIZE} - ${theme.spacings.bit}),
        -50%,
        0
      );
    }
  `;

const knobDisabledStyles = () => css`
  button:disabled &,
  button[disabled] & {
    box-shadow: ${knobShadow('var(--cui-border-normal-disabled)')};
  }

  button[aria-checked='true']:disabled &,
  button[aria-checked='true'][disabled] & {
    box-shadow: ${knobShadow('var(--cui-border-accent-disabled)')};
  }
`;

const SwitchKnob = styled('span')<KnobElProps>(
  knobBaseStyles,
  knobOnStyles,
  knobDisabledStyles,
);

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
      process.env.NODE_ENV !== 'test'
    ) {
      if (!checkedLabel) {
        throw new AccessibilityError(
          'Toggle',
          'The `checkedLabel` prop is missing.',
        );
      }
      if (!uncheckedLabel) {
        throw new AccessibilityError(
          'Toggle',
          'The `checkedLabel` prop is missing.',
        );
      }
    }
    const handleChange = useClickEvent(onChange, tracking, 'toggle');
    return (
      <SwitchTrack
        type="button"
        onClick={handleChange}
        role="switch"
        aria-checked={checked}
        {...props}
        ref={ref}
      >
        <SwitchKnob />
        <SwitchLabel>{checked ? checkedLabel : uncheckedLabel}</SwitchLabel>
      </SwitchTrack>
    );
  },
);

Switch.displayName = 'Switch';
