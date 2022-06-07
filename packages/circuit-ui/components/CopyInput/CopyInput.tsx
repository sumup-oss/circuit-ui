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

import { FocusEvent, forwardRef, useEffect, useRef } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import Input, { InputElement, InputProps } from '../Input';
import Button from '../Button';
import { applyMultipleRefs } from '../../util/refs';

export type CopyInputProps = Omit<
  InputProps,
  // This is explicitly set inside the component.
  | 'noMargin'
  // The `value` prop is required, so the placeholder would never be shown.
  | 'placeholder'
  // The field is readonly and the `value` prop is prefilled.
  | 'optionalLabel'
  // The field is readonly so the user wouldn't be able to fix it.
  | 'invalid'
  // This would lead to a confusing user experience.
  | 'disabled'
  // The `renderSuffix` prop is set inside the component and should not be overridden.
  | 'renderSuffix'
  | 'onError'
> & {
  /**
   * The input value that should be copied to the user's clipboard.
   */
  value: string;
  /**
   * A textual label for the copy button at the end of the input.
   */
  copyButtonLabel: string;
  /**
   * Function that is called after the user successfully copies the value.
   */
  onSuccess?: () => void;
  /**
   * Function that is called if copying the value fails after pressing the copy button.
   * This can be caused by the browser not supporting or restricting access to the necessary APIs.
   */
  onError?: (error: Error) => void;
};

const copyButtonStyles = ({ theme }: StyleProps) => css`
  border: none;
  width: auto !important;
  pointer-events: all !important;
  cursor: pointer !important;
  border-radius: ${theme.borderRadius.byte};

  &:hover {
    background-color: ${theme.colors.white};
    color: ${theme.colors.n900};
  }
`;

const CopyButton = styled(Button)(copyButtonStyles);

/**
 * CopyInput component to enable users to easily copy a value.
 */
export const CopyInput = forwardRef<InputElement, CopyInputProps>(
  ({ value, copyButtonLabel, onSuccess, onError, ...props }, ref) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !copyButtonLabel
    ) {
      throw new Error(
        'The CopyInput component is missing a `copyButtonLabel` prop. This is an accessibility requirement.',
      );
    }

    const localRef = useRef<InputElement>(null);

    useEffect(() => {
      if (!localRef.current || !onSuccess) {
        return undefined;
      }

      const input = localRef.current;

      input.addEventListener('copy', onSuccess);

      return () => {
        input.removeEventListener('copy', onSuccess);
      };
    }, [onSuccess]);

    const handleCopy = async () => {
      try {
        if (localRef.current) {
          localRef.current.select();
        }

        const supportsClipboardAPI = Boolean(
          typeof navigator !== 'undefined' &&
            /* eslint-disable compat/compat */
            navigator.clipboard &&
            // eslint-disable-next-line @typescript-eslint/unbound-method
            navigator.clipboard.writeText,
          /* eslint-enable compat/compat */
        );

        if (supportsClipboardAPI) {
          await navigator.clipboard.writeText(value);
        } else {
          document.execCommand('copy');
        }

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
        }
      }
    };

    const handleFocus = (event: FocusEvent<InputElement>) => {
      event.currentTarget.select();
    };

    return (
      <Input
        value={value}
        type="text"
        readOnly
        renderSuffix={(renderProps) => (
          <CopyButton onClick={handleCopy} {...renderProps}>
            {copyButtonLabel}
          </CopyButton>
        )}
        {...props}
        onFocus={handleFocus}
        noMargin
        ref={applyMultipleRefs(localRef, ref)}
      />
    );
  },
);

CopyInput.displayName = 'CopyInput';
