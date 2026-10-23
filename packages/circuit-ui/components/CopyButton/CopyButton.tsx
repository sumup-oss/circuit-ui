/**
 * Copyright 2026, SumUp Ltd.
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

'use client';

import { forwardRef, useId, type FocusEvent, type MouseEvent } from 'react';
import { CopyPaste } from '@sumup-oss/icons';

import { Button, IconButton } from '../Button/index.js';
import { Input, type InputProps } from '../Input/index.js';
import { useNotificationToast } from '../NotificationToast/index.js';
import { Tooltip } from '../Tooltip/index.js';
import type { ClickEvent } from '../../types/events.js';
import type { ButtonProps, IconButtonProps } from '../Button/index.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';
import { idx } from '../../util/idx.js';

type CommonCopyButtonProps = {
  /**
   * The text value copied to the clipboard.
   */
  value: string;
  /**
   * Text label for the copy action.
   */
  copyLabel: string;
  /**
   * Callback function called after the value has been copied successfully.
   */
  onCopy?: (event: ClickEvent) => void;
  /**
   * Text shown in a notification after a successful copy action.
   */
  successLabel: string;
};

type InputCopyButtonProps = CommonCopyButtonProps &
  Omit<
    InputProps,
    | 'as'
    | 'defaultValue'
    | 'hasWarning'
    | 'invalid'
    | 'onCopy'
    | 'optionalLabel'
    | 'passwordManagerIgnore'
    | 'readOnly'
    | 'renderSuffix'
    | 'required'
    | 'showValid'
    | 'type'
    | 'validationHint'
    | 'value'
  > & {
    /**
     * The CopyButton variant.
     *
     * @default input
     */
    copyVariant?: 'input';
    /**
     * Optional text rendered inside the field instead of the copied value.
     */
    visibleValue?: string;
  };

type ButtonCopyButtonProps = CommonCopyButtonProps &
  Omit<
    ButtonProps,
    | 'as'
    | 'children'
    | 'destructive'
    | 'href'
    | 'icon'
    | 'navigationIcon'
    | 'onClick'
    | 'onCopy'
    | 'type'
    | 'value'
  > & {
    /**
     * The CopyButton variant.
     */
    copyVariant: 'button';
  };

type IconCopyButtonProps = CommonCopyButtonProps &
  Omit<
    IconButtonProps,
    | 'as'
    | 'children'
    | 'destructive'
    | 'href'
    | 'icon'
    | 'label'
    | 'onClick'
    | 'onCopy'
    | 'type'
    | 'value'
  > & {
    /**
     * The CopyButton variant.
     */
    copyVariant: 'icon-button';
  };

export type CopyButtonProps =
  | InputCopyButtonProps
  | ButtonCopyButtonProps
  | IconCopyButtonProps;

/**
 * The CopyButton component copies a provided value to the clipboard and
 * can render as a read-only input, a button, or an icon button.
 */
export const CopyButton = forwardRef<
  HTMLInputElement & HTMLButtonElement,
  CopyButtonProps
>((props, ref) => {
  const { setToast } = useNotificationToast();
  const { successLabel, copyLabel, onCopy, value } = props;
  const isCopyDisabled = Boolean(props.disabled || value.length === 0);
  const valueDescriptionId = useId();

  const handleCopy = async (event: ClickEvent) => {
    try {
      // eslint-disable-next-line compat/compat
      await navigator.clipboard.writeText(value);
    } catch {
      // Ignore clipboard failures so the UI does not enter a false success state.
      return;
    }

    setToast({
      body: successLabel,
    });
    onCopy?.(event);
  };

  if (props.copyVariant === 'button') {
    const {
      'aria-describedby': ariaDescribedBy,
      copyVariant,
      successLabel: _successLabel,
      copyLabel: _copyLabel,
      onCopy: _onCopy,
      value: _value,
      ...buttonProps
    } = props;

    return (
      <>
        <Button
          {...buttonProps}
          ref={ref}
          as="button"
          type="button"
          disabled={isCopyDisabled}
          onClick={handleCopy}
          icon={CopyPaste}
          aria-describedby={idx(ariaDescribedBy, valueDescriptionId)}
        >
          {copyLabel}
        </Button>
        <span
          id={valueDescriptionId}
          className={utilClasses.hideVisually}
          translate="no"
        >
          {value}
        </span>
      </>
    );
  }

  if (props.copyVariant === 'icon-button') {
    const {
      'aria-describedby': ariaDescribedBy,
      className,
      copyVariant,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      successLabel: _successLabel,
      copyLabel: _copyLabel,
      onCopy: _onCopy,
      value: _value,
      ...iconButtonProps
    } = props;

    return (
      <>
        <Tooltip
          type="label"
          label={copyLabel}
          component={(tooltipProps) => (
            <IconButton
              {...iconButtonProps}
              ref={ref}
              as="button"
              type="button"
              title={undefined}
              disabled={isCopyDisabled}
              onClick={handleCopy}
              onBlur={(event: FocusEvent<Element>) => {
                onBlur?.(event as FocusEvent<HTMLButtonElement>);
                tooltipProps.onBlur(event);
              }}
              onFocus={(event: FocusEvent<Element>) => {
                onFocus?.(event as FocusEvent<HTMLButtonElement>);
                tooltipProps.onFocus(event);
              }}
              onMouseEnter={(event: MouseEvent<Element>) => {
                onMouseEnter?.(event as MouseEvent<HTMLButtonElement>);
                tooltipProps.onMouseEnter(event);
              }}
              onMouseLeave={(event: MouseEvent<Element>) => {
                onMouseLeave?.(event as MouseEvent<HTMLButtonElement>);
                tooltipProps.onMouseLeave(event);
              }}
              icon={CopyPaste}
              className={clsx(className, tooltipProps.className)}
              aria-labelledby={tooltipProps['aria-labelledby']}
              aria-describedby={idx(
                ariaDescribedBy,
                tooltipProps['aria-describedby'],
                valueDescriptionId,
              )}
            >
              {copyLabel}
            </IconButton>
          )}
        />
        <span
          id={valueDescriptionId}
          className={utilClasses.hideVisually}
          translate="no"
        >
          {value}
        </span>
      </>
    );
  }

  const {
    copyVariant,
    successLabel: _successLabel,
    copyLabel: _copyLabel,
    inputClassName,
    onCopy: _onCopy,
    visibleValue,
    value: _value,
    ...inputProps
  } = props;
  const displayText = visibleValue ?? value;

  return (
    <Input
      {...inputProps}
      ref={ref}
      as="input"
      type="text"
      value={displayText}
      readOnly
      renderSuffix={(renderProps) => (
        <IconButton
          className={renderProps.className}
          type="button"
          size="s"
          variant="secondary"
          disabled={isCopyDisabled}
          onClick={handleCopy}
          icon={CopyPaste}
        >
          {copyLabel}
        </IconButton>
      )}
      inputClassName={inputClassName}
    />
  );
});

CopyButton.displayName = 'CopyButton';
