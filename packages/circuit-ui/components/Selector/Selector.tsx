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

import { Fragment, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import { hideVisually, focusOutline } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';
import { deprecate } from '../../util/logger';
import { AccessibilityError } from '../../util/errors';

export type SelectorSize = 'kilo' | 'mega' | 'flexible';

export interface SelectorProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * A clear and concise description of the input's purpose.
   */
  label?: string;
  /**
   * A more detailed description of the input's purpose.
   */
  description?: string;
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
   * @deprecated
   *
   * Use an `onChange` handler to dispatch user interaction events instead.
   */
  tracking?: TrackingProps;
  /**
   * @deprecated
   *
   * Use the `label` and `description` props instead.
   */
  children?: ReactNode;
}

type LabelElProps = Pick<SelectorProps, 'disabled' | 'size'>;

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--cui-bg-normal);
  color: var(--cui-fg-normal);
  text-align: center;
  position: relative;
  border-radius: ${theme.borderRadius.byte};
  transition: box-shadow ${theme.transitions.default};

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
    border: ${theme.borderWidth.kilo} solid var(--cui-border-normal);
    transition: border ${theme.transitions.default};
  }

  &:hover {
    background-color: var(--cui-bg-normal-hovered);
    color: var(--cui-fg-normal-hovered);

    &::before {
      border-color: var(--cui-border-normal-hovered);
    }
  }

  &:active {
    background-color: var(--cui-bg-normal-pressed);
    color: var(--cui-fg-normal-pressed);

    &::before {
      border-color: var(--cui-border-normal-pressed);
    }
  }
`;

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

type HasDescription = {
  hasDescription: boolean;
};

const withDescriptionStyles = ({ hasDescription }: HasDescription) =>
  hasDescription &&
  css`
    text-align: start;
    align-items: flex-start;
  `;

const SelectorLabel = styled('label')<LabelElProps & HasDescription>(
  baseStyles,
  sizeStyles,
  withDescriptionStyles,
);

const Bold = styled('span')`
  font-weight: ${(p) => p.theme.fontWeight.bold};
`;

const inputStyles = ({ theme }: StyleProps) => css`
  ${hideVisually()};

  &:focus + label::before {
    ${focusOutline()};
  }

  &:focus:not(:focus-visible) + label::before {
    box-shadow: none;
  }

  &:checked + label {
    background-color: var(--cui-bg-accent);

    &::before {
      border: ${theme.borderWidth.mega} solid var(--cui-border-accent);
    }
  }

  &:disabled + label,
  &[disabled] + label {
    pointer-events: none;
    background-color: var(--cui-bg-normal-disabled);
    color: var(--cui-fg-normal-disabled);

    &::before {
      border: ${theme.borderWidth.mega} solid var(--cui-border-normal-disabled);
    }
  }

  &:disabled:checked + label,
  &[disabled]:checked + label {
    background-color: var(--cui-bg-accent-disabled);

    &::before {
      border: ${theme.borderWidth.mega} solid var(--cui-border-accent-disabled);
    }
  }
`;

const SelectorInput = styled('input')(inputStyles);

/**
 * @deprecated Use the {@link SelectorGroup} component instead.
 */
export const Selector = forwardRef<HTMLInputElement, SelectorProps>(
  (
    {
      children,
      label,
      description,
      value,
      id,
      name,
      disabled,
      multiple,
      onChange,
      'aria-describedby': describedBy,
      tracking,
      className,
      style,
      size,
      ...props
    },
    ref,
  ) => {
    const inputId = id || uniqueId('selector_');
    const descriptionId = description && uniqueId('selector-description_');
    const descriptionIds = [describedBy, descriptionId]
      .filter(Boolean)
      .join(' ');
    const type = multiple ? 'checkbox' : 'radio';
    const handleChange = useClickEvent(onChange, tracking, 'selector');

    if (process.env.NODE_ENV !== 'production') {
      deprecate(
        'Selector',
        'The Selector component has been deprecated. Use the SelectorGroup component instead.',
      );
    }

    if (process.env.NODE_ENV !== 'production' && children) {
      deprecate(
        'Selector',
        'The `children` prop has been deprecated. Use the `label` and `description` props instead.',
      );
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label &&
      !children
    ) {
      throw new AccessibilityError('Selector', 'The `label` prop is missing.');
    }

    const hasDescription = Boolean(description);

    return (
      <Fragment>
        <SelectorInput
          type={type}
          id={inputId}
          aria-describedby={descriptionIds}
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
          size={size}
          className={className}
          style={style}
          hasDescription={hasDescription}
        >
          {hasDescription ? (
            <Fragment>
              <Bold>{label || children}</Bold>
              <span aria-hidden="true">{description}</span>
            </Fragment>
          ) : (
            label || children
          )}
        </SelectorLabel>
        {hasDescription && (
          <p id={descriptionId} css={hideVisually}>
            {description}
          </p>
        )}
      </Fragment>
    );
  },
);

Selector.displayName = 'Selector';
