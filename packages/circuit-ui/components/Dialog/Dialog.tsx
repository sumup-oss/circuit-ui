/**
 * Copyright 2025, SumUp Ltd.
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

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import type { Locale } from '../../util/i18n.js';

type DataAttribute = `data-${string}`;

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'children'> {
  /**
   * Whether the modal dialog is open or not.
   */
  open: boolean;
  /**
   * Callback when the modal dialog is closed.
   */
  onClose?: () => void;
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel?: string;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
  /**
   * Prevent users from closing the modal by clicking/tapping the overlay or
   * pressing the escape key. Default `false`.
   */
  preventClose?: boolean;
  /**
   * a ReactNode or a function that returns the content of the modal dialog.
   */
  children?:
    | ReactNode
    | (({ onClose }: { onClose?: DialogProps['onClose'] }) => ReactNode);
  [key: DataAttribute]: string | undefined;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (props, ref) => {
    const { children, onClose, ...rest } = props;
    return (
      <dialog ref={ref} {...rest}>
        {' '}
        {typeof children === 'function' ? children?.({ onClose }) : children}
      </dialog>
    );
  },
);
