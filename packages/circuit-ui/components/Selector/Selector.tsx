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

/** @jsxRuntime classic */
/** @jsx jsx */
import React, { Fragment, Ref, HTMLProps } from 'react';
import { css, jsx } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import {
  focusOutline,
  hideVisually,
  disableVisually,
  textMega,
} from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import useClickHandler from '../../hooks/use-click-handler';
import deprecate from '../../util/deprecate';

export type SelectorSize = 'kilo' | 'mega' | 'flexible';

export interface SelectorProps
  extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  /**
   * Value string for input.
   */
  value: string;
  /**
   * A unique identifier for the input field. If not defined, a randomly generated id is used.
   */
  id?: string;
  /**
   * The name of the selector.
   */
  name?: string;
  /**
   * Choose from 3 sizes. Default: 'mega'.
   */
  size?: SelectorSize;
  /**
   * Whether the selector is selected or not.
   */
  checked?: boolean;
  /**
   * Whether the selector is disabled or not.
   */
  disabled?: boolean;
  /**
   * Whether the user can select multiple options.
   */
  multiple?: boolean;
  /**
   * Removes the default bottom margin from the input.
   */
  noMargin?: boolean;
  /**
   * The ref to the html dom element
   */
  ref?: Ref<HTMLInputElement>;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

type LabelElProps = Pick<SelectorProps, 'disabled' | 'noMargin' | 'size'>;

const LABEL_BORDER_RADIUS = '8px';

/**
 * ::before serves as a host element for the focus outline.
 * Selector uses box-shadow to draw its border, therefore
 * in order to draw focus outline with another box-shadow
 * we need a different element.
 * All the dimensions calculations are to align ::before with
 * Selector's border and not just with its content, otherwise
 * focus outline will render on top of the border.
 */
const focusOutlineHostStyles = ({ theme }: StyleProps) => css`
  &::before {
    display: none;
    content: '';
    position: absolute;
    top: -${theme.borderWidth.mega};
    left: -${theme.borderWidth.mega};
    width: calc(100% + ${theme.borderWidth.mega} * 2);
    height: calc(100% + ${theme.borderWidth.mega} * 2);
    border: ${theme.borderWidth.mega} solid transparent;
    border-radius: calc(${LABEL_BORDER_RADIUS} + ${theme.borderWidth.mega});
    ${focusOutline({ theme })}
  }
`;

const baseStyles = ({ theme }: StyleProps) => css`
  label: selector__label;
  display: inline-block;
  cursor: pointer;
  padding: ${theme.spacings.mega} ${theme.spacings.giga};
  background-color: ${theme.colors.white};
  ${textMega({ theme })};
  text-align: center;
  position: relative;
  margin-bottom: ${theme.spacings.mega};
  border: none;
  border-radius: ${LABEL_BORDER_RADIUS};
  box-shadow: 0 0 0 ${theme.borderWidth.kilo} ${theme.colors.n300};
  transition: box-shadow 0.1s ease-in-out;

  &:hover {
    background-color: ${theme.colors.n100};
    box-shadow: 0 0 0 ${theme.borderWidth.kilo} ${theme.colors.n500};
  }

  &:active {
    background-color: ${theme.colors.n200};
    box-shadow: 0 0 0 ${theme.borderWidth.kilo} ${theme.colors.n700};
  }
`;

const disabledStyles = ({ disabled }: LabelElProps) =>
  disabled &&
  css`
    label: selector__label--disabled;
    ${disableVisually()};
  `;

const noMarginStyles = ({ noMargin }: LabelElProps) => {
  if (!noMargin) {
    deprecate(
      [
        'The default outer spacing in the Selector component is deprecated.',
        'Use the `noMargin` prop to silence this warning.',
        'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
      ].join(' '),
    );
    return null;
  }
  return css`
    label: selector__label--no-margin;
    margin-bottom: 0;
  `;
};

const sizeStyles = ({ theme, size = 'mega' }: LabelElProps & StyleProps) => {
  const sizeMap = {
    kilo: {
      padding: `${theme.spacings.bit} ${theme.spacings.mega}`,
    },
    mega: {
      // +1px is to match the height of other form components
      // like Input or Select that also have +1px for vertical padding
      padding: `calc(${theme.spacings.byte} + 1px) ${theme.spacings.giga}`,
    },
    flexible: {
      padding: `${theme.spacings.mega} ${theme.spacings.mega}`,
    },
  };

  return css({
    label: `selector--${size}`,
    ...sizeMap[size],
  });
};

const SelectorLabel = styled('label')<LabelElProps>(
  baseStyles,
  sizeStyles,
  disabledStyles,
  focusOutlineHostStyles,
  noMarginStyles,
);

const inputStyles = ({ theme }: StyleProps) => css`
  label: selector__input;
  ${hideVisually()};

  // Show the focus outline host
  &:focus + label::before {
    display: block;
  }

  &:checked + label {
    background-color: ${theme.colors.p100};
    box-shadow: 0 0 0 ${theme.borderWidth.mega} ${theme.colors.p500};
  }
`;

const SelectorInput = styled('input')<HTMLProps<HTMLInputElement>>(inputStyles);

/**
 * A selector allows users to choose between several mutually-exclusive choices
 * accompanied by descriptions, possibly with tabular data.
 */
export const Selector = React.forwardRef(
  (
    {
      children,
      value,
      id,
      name,
      disabled,
      multiple,
      checked,
      onChange,
      tracking,
      className,
      style,
      noMargin,
      size,
      ...props
    }: SelectorProps,
    ref: SelectorProps['ref'],
  ) => {
    const inputId = id || uniqueId('selector_');
    const type = multiple ? 'checkbox' : 'radio';
    const handleChange = useClickHandler(onChange, tracking, 'selector');

    return (
      <Fragment>
        <SelectorInput
          type={type}
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onClick={handleChange}
          onChange={() => {
            /**
             * Noop to silence React warning:
             * https://github.com/facebook/react/issues/3070#issuecomment-73311114
             * Change is handled by onClick which has better browser support:
             * https://stackoverflow.com/a/5575369/4620154
             */
          }}
          ref={ref}
          {...props}
        />
        <SelectorLabel
          htmlFor={inputId}
          disabled={disabled}
          size={size}
          className={className}
          style={style}
          noMargin={noMargin}
        >
          {children}
        </SelectorLabel>
      </Fragment>
    );
  },
);

Selector.displayName = 'Selector';
