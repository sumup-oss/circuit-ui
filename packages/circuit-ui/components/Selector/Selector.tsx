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

import { Fragment, Ref, InputHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import {
  hideVisually,
  disableVisually,
  focusOutline,
} from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';
import { deprecate } from '../../util/logger';

export type SelectorSize = 'kilo' | 'mega' | 'flexible';

export interface SelectorProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
   * Removes the default bottom margin from the Selector.
   */
  noMargin?: boolean;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLInputElement>;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

type LabelElProps = Pick<SelectorProps, 'disabled' | 'size' | 'noMargin'>;

const baseStyles = ({ theme }: StyleProps) => css`
  display: inline-block;
  cursor: pointer;
  background-color: ${theme.colors.white};
  text-align: center;
  position: relative;
  border: none;
  border-radius: ${theme.borderRadius.byte};
  transition: box-shadow ${theme.transitions.default};
  margin-bottom: ${theme.spacings.mega};

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius.byte};
    border: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
    transition: border ${theme.transitions.default};
  }

  &:hover {
    background-color: ${theme.colors.n100};

    &::before {
      border-color: ${theme.colors.n500};
    }
  }

  &:active {
    background-color: ${theme.colors.n200};

    &::before {
      border-color: ${theme.colors.n700};
    }
  }
`;

const disabledStyles = ({ disabled }: LabelElProps) =>
  disabled && css(disableVisually());

const noMarginStyles = ({ noMargin }: LabelElProps) => {
  if (!noMargin) {
    deprecate(
      'Selector',
      'The default outer spacing in the Selector component is deprecated.',
      'Use the `noMargin` prop to silence this warning.',
      'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
    );
    return null;
  }
  return css`
    margin-bottom: 0;
  `;
};

const sizeStyles = ({ theme, size = 'mega' }: LabelElProps & StyleProps) => {
  const sizeMap = {
    kilo: {
      padding: `${theme.spacings.bit} ${theme.spacings.mega}`,
    },
    mega: {
      padding: `calc(${theme.spacings.kilo}) ${theme.spacings.giga}`,
    },
    flexible: {
      padding: `${theme.spacings.mega} ${theme.spacings.mega}`,
    },
  };

  return css(sizeMap[size]);
};

const SelectorLabel = styled('label')<LabelElProps>(
  baseStyles,
  sizeStyles,
  disabledStyles,
  noMarginStyles,
);

const inputStyles = ({ theme }: StyleProps) => css`
  ${hideVisually()};

  &:focus + label::before {
    ${focusOutline(theme)};
  }

  &:focus:not(:focus-visible) + label::before {
    box-shadow: none;
  }

  &:checked + label {
    background-color: ${theme.colors.p100};

    &::before {
      border: ${theme.borderWidth.mega} solid ${theme.colors.p500};
    }
  }
`;

const SelectorInput = styled('input')(inputStyles);

/**
 * A selector allows users to choose between several mutually-exclusive choices
 * accompanied by descriptions, possibly with tabular data.
 */
export const Selector = forwardRef(
  (
    {
      children,
      value,
      id,
      name,
      disabled,
      multiple,
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
    const handleChange = useClickEvent(onChange, tracking, 'selector');

    return (
      <Fragment>
        <SelectorInput
          type={type}
          id={inputId}
          name={name}
          value={value}
          disabled={disabled}
          // @ts-expect-error Change is handled by onClick for browser support, see https://stackoverflow.com/a/5575369
          onClick={handleChange}
          // Noop to silence React warning: https://github.com/facebook/react/issues/3070#issuecomment-73311114
          onChange={() => {}}
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
