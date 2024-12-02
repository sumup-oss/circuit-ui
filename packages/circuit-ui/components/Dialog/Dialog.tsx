'use client';
/**
 * Copyright 2024, SumUp Ltd.
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

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { CloseButton } from '../CloseButton/index.js';
import dialogPolyfill from '../../vendor/dialog-polyfill/index.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import type { ClickEvent } from '../../types/events.js';
import { isEscape } from '../../util/key-codes.js';

import classes from './Dialog.module.css';
import { createUseModalDialog } from './createUseModalDialog.js';
import { getFirstFocusableElement } from './DialogService.js';

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'children'> {
  /**
   * Whether the dialog is open or not.
   */
  open: boolean;
  /**
   * Callback when the dialog is closed.
   */
  onClose?: () => void;
  /**
   * a function that returns the content of the dialog.
   */
  children: () => ReactNode;
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel: string;
  /**
   * Use the `contextual` variant when the modal content requires the context
   * of the page underneath to be understood, otherwise, use the `immersive`
   * variant to focus the user's attention.
   */
  variant?: 'contextual' | 'immersive';
  /**
   * Prevent users from closing the modal by clicking/tapping the overlay or
   * pressing the escape key. Default `false`.
   */
  preventClose?: boolean;
}

export const animationDuration = 300;

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open,
      onClose,
      closeButtonLabel,
      variant = 'contextual',
      children,
      className,
      preventClose,
      ...props
    },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);
    // TODO add translated default close label
    if (process.env.NODE_ENV !== 'production') {
      if (!isSufficientlyLabelled(closeButtonLabel)) {
        throw new AccessibilityError(
          'Dialog',
          'The `closeButtonLabel` prop is missing or invalid.',
        );
      }
    }
    const hasNativeDialog = 'HTMLDialogElement' in window;

    useEffect(() => {
      const dialogElement = dialogRef.current;
      if (open && dialogElement) {
        setTimeout(
          () => getFirstFocusableElement(dialogElement).focus(),
          animationDuration,
        );
      }
    }, [open]);

    const handleDialogClose = useCallback(() => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) {
        return;
      }
      // restore focus to the last focused element
      if (lastFocusedElementRef.current) {
        setTimeout(() => lastFocusedElementRef.current?.focus(), 300);
      }
      // restore scroll tp page
      document.documentElement.style.overflowY = 'unset';
      // trigger close animation
      dialogElement.classList.remove(classes.show);
      if (!hasNativeDialog) {
        (dialogElement.nextSibling as HTMLDivElement).classList.remove(
          classes['backdrop-visible'],
        );
      }
      // trigger dialog close after animation
      setTimeout(() => {
        if (dialogElement.open) {
          dialogElement.close();
        }
      }, animationDuration);
    }, []);

    function onPolyfillDialogKeydown(event: KeyboardEvent) {
      if (isEscape(event) && preventClose) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    function onPolyfillBackdropClick(event: MouseEvent) {
      if (preventClose) {
        event.preventDefault();
      }
    }

    useEffect(() => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) {
        return undefined;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The package is bundled incorrectly
      dialogPolyfill.registerDialog(dialogElement);
      if (preventClose) {
        dialogElement.addEventListener('keydown', onPolyfillDialogKeydown);
      }
      if (onClose) {
        dialogElement.addEventListener('close', onClose);
      }

      return () => {
        if (onClose) {
          dialogElement.removeEventListener('close', onClose);
        }
        if (!hasNativeDialog && dialogElement.nextSibling) {
          (dialogElement.nextSibling as HTMLDivElement).removeEventListener(
            'click',
            onPolyfillBackdropClick,
          );
          dialogElement.removeEventListener('keydown', onPolyfillDialogKeydown);
        }
      };
    }, [onClose]);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return undefined;
      }
      if (open) {
        if (document.activeElement instanceof HTMLElement) {
          lastFocusedElementRef.current = document.activeElement;
        }
        if (!dialogElement.open) {
          dialogElement.showModal();
          if (!hasNativeDialog) {
            // use the polyfill backdrop
            (dialogElement.nextSibling as HTMLDivElement).classList.add(
              classes['backdrop-visible'],
              classes.backdrop,
            );
            // intercept and prevent modal closing if preventClose is true
            (dialogElement.nextSibling as HTMLDivElement).addEventListener(
              'click',
              onPolyfillBackdropClick,
            );
          }

          // trigger show animation
          dialogElement.classList.add(classes.show);
          // if dialog is modal, disable scroll on page
          document.documentElement.style.overflowY = 'hidden';
        }
      } else if (dialogElement.open) {
        handleDialogClose();
      }

      return () => {
        if (dialogElement.open) {
          dialogElement.close();
        }
      };
    }, [open, handleDialogClose, hasNativeDialog]);

    const onDialogClick = (
      event: ClickEvent<HTMLDialogElement> | ClickEvent<HTMLDivElement>,
    ) => {
      if (event.target === event.currentTarget && !preventClose) {
        handleDialogClose();
      }
    };

    return (
      <>
        {/* eslint-disable-next-line  jsx-a11y/no-noninteractive-element-interactions */}
        <dialog
          onClick={onDialogClick}
          ref={applyMultipleRefs(ref, dialogRef)}
          className={clsx(
            className,
            classes.dialog,
            variant === 'immersive' ? classes.immersive : '',
          )}
          {...props}
        >
          <CloseButton onClick={handleDialogClose} className={classes.close}>
            {closeButtonLabel}
          </CloseButton>
          {open && <div className={classes.content}>{children()}</div>}
        </dialog>
      </>
    );
  },
);

Dialog.displayName = 'Dialog';

export const useModal = createUseModalDialog(Dialog);
