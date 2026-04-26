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

import { Checkmark, Copy } from '@sumup-oss/icons';
import { useEffect, useId, useState, type CSSProperties } from 'react';

import { FieldWrapper, FieldLabelText } from '../Field/index.js';
import fieldClasses from '../Field/Field.module.css';
import { IconButton } from '../Button/index.js';
import { utilClasses } from '../../styles/utility.js';
import {
  classes as inputClasses,
  type BaseInputProps,
} from '../Input/index.js';
import { clsx } from '../../styles/clsx.js';
import type { ClickEvent } from '../../types/events.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';

import classes from './ClipboardText.module.css';

export interface ClipboardTextProps
  extends Omit<BaseInputProps, 'validationHint' | 'showValid'> {
  /**
   * The text value copied to the clipboard.
   */
  value?: string;
  /**
   * Optional text rendered inside the field instead of the copied value.
   */
  text?: string;
  /**
   * Text label for the copy button.
   */
  copyLabel: string;
  /**
   * Callback function when the value was copied.
   */
  onCopied?: (event: ClickEvent) => void;
  /**
   * Accessible label and status message after the value has been copied.
   *
   * @default Copied
   */
  copiedLabel?: string;
  /**
   * Additional class name for the component wrapper.
   */
  className?: string;
  /**
   * Inline styles for the component wrapper.
   */
  style?: CSSProperties;
}

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

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
 * The ClipboardText component displays text in an input-like field and
 * provides a built-in action to copy the current value.
 */
export function ClipboardText({
  value = '',
  text,
  copyLabel,
  copiedLabel = 'Copied',
  onCopied,
  optionalLabel,
  invalid,
  hasWarning,
  readOnly,
  label,
  hideLabel,
  id: customId,
  className,
  style,
  inputClassName,
}: ClipboardTextProps) {
  const id = useId();
  const fieldId = customId || id;
  const labelId = useId();
  const [copiedCount, setCopiedCount] = useState(0);
  const displayText = text ?? value;
  const buttonLabel = `${copyLabel}: ${label}`;
  const isCopied = copiedCount > 0;

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !isSufficientlyLabelled(label)
  ) {
    throw new AccessibilityError(
      'ClipboardText',
      'The `label` prop is missing or invalid. Pass `hideLabel` if you intend to hide the label visually.',
    );
  }

  const handleCopy = async (event: ClickEvent) => {
    try {
      await copyToClipboard(value);
      setCopiedCount((count) => count + 1);
      onCopied?.(event);
    } catch {
      // Ignore clipboard failures so the UI does not enter a false success state.
    }
  };

  useEffect(() => {
    if (!copiedCount) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setCopiedCount(0);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [copiedCount]);

  return (
    <FieldWrapper className={className} style={style}>
      <div id={labelId} className={fieldClasses.label}>
        <FieldLabelText
          label={label}
          hideLabel={hideLabel}
          optionalLabel={optionalLabel}
        />
      </div>
      <div
        className={clsx(
          inputClasses.base,
          hasWarning && inputClasses.warning,
          classes.base,
          inputClassName,
        )}
        id={fieldId}
        data-invalid={invalid || undefined}
        data-readonly={readOnly || undefined}
      >
        <div className={classes.content}>
          <span className={utilClasses.hideVisually}>{`${label}: `}</span>
          <span className={classes.value}>{displayText}</span>
        </div>
        <div className={classes.action}>
          <IconButton
            className={classes.button}
            type="button"
            size="s"
            variant="tertiary"
            onClick={handleCopy}
            aria-label={buttonLabel}
            aria-controls={fieldId}
            icon={isCopied ? Checkmark : Copy}
          >
            {copyLabel}
          </IconButton>
        </div>
      </div>
      <output className={utilClasses.hideVisually} aria-live="polite">
        {isCopied ? copiedLabel : ''}
      </output>
    </FieldWrapper>
  );
}
