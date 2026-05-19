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

import { CopyPaste } from '@sumup-oss/icons';
import { useId } from 'react';

import { Button, IconButton } from '../Button/index.js';
import { Input, type InputProps } from '../Input/index.js';
import { useNotificationToast } from '../NotificationToast/index.js';
import type { ClickEvent } from '../../types/events.js';
import type { ButtonProps, IconButtonProps } from '../Button/index.js';

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
   * Callback function when the value was copied.
   */
  onCopy?: (event: ClickEvent) => void;
  /**
   * Test copy shown in as a notification after a successful copy action.
   */
  onCopyLabel: string;
};

type InputCopyButtonProps = CommonCopyButtonProps &
  Omit<
    InputProps,
    'defaultValue' | 'onCopy' | 'renderSuffix' | 'showValid' | 'type' | 'value'
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
    text?: string;
  };

type ButtonCopyButtonProps = CommonCopyButtonProps &
  Omit<ButtonProps, 'children' | 'icon' | 'onClick' | 'type'> & {
    /**
     * The CopyButton variant.
     */
    copyVariant: 'button';
  };

type IconCopyButtonProps = CommonCopyButtonProps &
  Omit<IconButtonProps, 'children' | 'icon' | 'label' | 'onClick' | 'type'> & {
    /**
     * The CopyButton variant.
     */
    copyVariant: 'icon';
  };

export type CopyButtonProps =
  | InputCopyButtonProps
  | ButtonCopyButtonProps
  | IconCopyButtonProps;

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback behaviour for older browsers,
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#browser_compatibility
  if (typeof document === 'undefined') {
    return;
  }

  const selection = window.getSelection();
  const range = document.createRange();
  const tempNode = document.createElement('span');
  tempNode.textContent = text;
  tempNode.style.position = 'fixed';
  tempNode.style.opacity = '0';
  document.body.append(tempNode);

  range.selectNodeContents(tempNode);
  selection?.removeAllRanges();
  selection?.addRange(range);
  document.execCommand?.('copy');
  selection?.removeAllRanges();
  tempNode.remove();
}

/**
 * The CopyButton component copies a provided value to the clipboard and
 * can render as a read-only input, a button, or an icon button.
 */
export function CopyButton(props: CopyButtonProps) {
  const generatedId = useId();
  const { setToast } = useNotificationToast();
  const { onCopyLabel, copyLabel, onCopy, value } = props;
  const isCopyDisabled = Boolean(props.disabled || value.length === 0);

  const handleCopy = async (event: ClickEvent) => {
    if (isCopyDisabled) {
      return;
    }

    try {
      await copyToClipboard(value);
      setToast({
        body: onCopyLabel,
        iconLabel: '',
      });
      onCopy?.(event);
    } catch {
      // Ignore clipboard failures so the UI does not enter a false success state.
    }
  };

  if (props.copyVariant === 'button') {
    const {
      copyVariant,
      onCopyLabel: _onCopyLabel,
      copyLabel: _copyLabel,
      onCopy: _onCopy,
      value: _value,
      ...buttonProps
    } = props;

    return (
      <Button
        {...buttonProps}
        type="button"
        disabled={isCopyDisabled}
        onClick={handleCopy}
        icon={CopyPaste}
      >
        {copyLabel}
      </Button>
    );
  }

  if (props.copyVariant === 'icon') {
    const {
      copyVariant,
      onCopyLabel: _onCopyLabel,
      copyLabel: _copyLabel,
      onCopy: _onCopy,
      value: _value,
      ...iconButtonProps
    } = props;

    return (
      <IconButton
        {...iconButtonProps}
        type="button"
        disabled={isCopyDisabled}
        onClick={handleCopy}
        icon={CopyPaste}
      >
        {copyLabel}
      </IconButton>
    );
  }

  const {
    copyVariant,
    onCopyLabel: _onCopyLabel,
    copyLabel: _copyLabel,
    id: customId,
    inputClassName,
    onCopy: _onCopy,
    text,
    value: _value,
    ...inputProps
  } = props;
  const fieldId = customId || generatedId;
  const displayText = text ?? value;
  const buttonLabel = `${copyLabel}: ${props.label}`;

  return (
    <Input
      {...inputProps}
      id={fieldId}
      value={displayText}
      readOnly
      renderSuffix={(renderProps) => (
        <IconButton
          className={renderProps.className}
          type="button"
          size="s"
          variant="tertiary"
          disabled={isCopyDisabled}
          onClick={handleCopy}
          aria-label={buttonLabel}
          aria-controls={fieldId}
          icon={CopyPaste}
        >
          {copyLabel}
        </IconButton>
      )}
      inputClassName={inputClassName}
    />
  );
}
