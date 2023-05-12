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

import {
  ReactNode,
  Ref,
  forwardRef,
  ChangeEventHandler,
  FieldsetHTMLAttributes,
  InputHTMLAttributes,
} from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import { uniqueId } from '../../util/id';
import Selector from '../Selector';
import { SelectorSize } from '../Selector/Selector';
import { AccessibilityError } from '../../util/errors';
import { FieldLabelText, FieldLegend, FieldSet } from '../FieldAtoms';
import { isEmpty } from '../../util/helpers';

export interface SelectorGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /**
   * A collection of available options. Each option must have at least
   * a value and label.
   */
  options: {
    value: string;
    label?: string;
    description?: string;
    /**
     * @deprecated
     * Use the `label` and `description` props instead.
     */
    children?: ReactNode;
    disabled?: boolean;
  }[];
  /**
   * Controls/Toggles the checked state. Passed on to the Selectors.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * The value of the currently checked Selector.
   */
  value: string | string[];
  /**
   * A description of the selector group.
   */
  label: string;
  /**
   * A unique name for the selector group.
   */
  name?: string;
  /**
   * Whether the user can select multiple options.
   */
  multiple?: boolean;
  /**
   * Triggers invalid styles on the inputs.
   */
  invalid?: boolean;
  /**
   * Size of the Selectors within the group. Default: 'mega'.
   */
  size?: SelectorSize;
  /**
   * Whether the group should take the whole width available. Defaults to true.
   */
  stretch?: boolean;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Makes the input group required.
   */
  required?: InputHTMLAttributes<HTMLInputElement>['required'];
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLFieldSetElement>;
}

type ContainerProps = Pick<SelectorGroupProps, 'stretch'>;

const stretchStyles = ({ stretch = false }: StyleProps & ContainerProps) => {
  if (stretch) {
    return css`
      display: flex;
      align-items: stretch;
      width: 100%;
    `;
  }

  return css`
    display: inline-flex;
    align-items: flex-start;
    width: auto;
  `;
};

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: row;
  width: 100%;

  > div:not(:last-child) {
    margin-right: ${theme.spacings.mega};
  }
`;

const StyledFieldset = styled(FieldSet)(baseStyles, stretchStyles);

const OptionItem = styled.div`
  flex: 1;
  align-self: stretch;
  & label {
    height: 100%;
  }
`;

/**
 * A group of Selectors.
 */
export const SelectorGroup = forwardRef(
  (
    {
      options,
      onChange,
      'value': activeValue,
      'name': customName,
      'aria-describedby': descriptionId,
      label,
      required,
      optionalLabel,
      disabled,
      multiple,
      size,
      stretch,
      hideLabel,
      ...props
    }: SelectorGroupProps,
    ref: SelectorGroupProps['ref'],
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError(
        'SelectorGroup',
        'The `label` prop is required. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    const name = customName || uniqueId('selector-group_');

    if (isEmpty(options)) {
      return null;
    }

    return (
      <StyledFieldset
        name={name}
        aria-describedby={descriptionId}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <FieldLegend>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLegend>
        {options.map(({ children, value, ...optionRest }) => (
          <OptionItem key={value}>
            <Selector
              name={name}
              onChange={onChange}
              multiple={multiple}
              value={value}
              size={size}
              css={css`
                width: 100%;
              `}
              disabled={disabled}
              checked={
                multiple ? activeValue.includes(value) : value === activeValue
              }
              {...optionRest}
            >
              {children}
            </Selector>
          </OptionItem>
        ))}
      </StyledFieldset>
    );
  },
);

SelectorGroup.displayName = 'SelectorGroup';
