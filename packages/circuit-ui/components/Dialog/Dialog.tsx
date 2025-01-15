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

'use client';

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import type { Locale } from '../../util/i18n.js';
import { applyMultipleRefs } from '../../util/refs.js';
import dialogPolyfill from '../../vendor/dialog-polyfill/index.js';
import { isEscape } from '../../util/key-codes.js';
import { useScrollLock } from '../../hooks/useScrollLock/useScrollLock.js';
import { CloseButton } from '../CloseButton/index.js';
import type { ClickEvent } from '../../types/events.js';
import { clsx } from '../../styles/clsx.js';
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { useLatest } from '../../hooks/useLatest/index.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';

import { getFirstFocusableElement } from './DialogService.js';
import classes from './dialog.module.css';
import { translations } from './translations/index.js';

type DataAttribute = `data-${string}`;

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'children'> {
  /**
   * Whether the modal dialog is open or not. Learn more about the `dialog` api https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/open.
   */
  open: boolean;
  /**
   * Whether the dialog is modal or not.
   */
  isModal?: boolean;
  /**
   * Callback when the modal dialog is closed.
   */
  onCloseEnd?: () => void;
  /**
   * Fired when the dialog starts to close.
   * Use this to trigger animations before the dialog closes.
   */
  onCloseStart?: () => void;
  /**
   * The duration of the dialog animation in milliseconds.
   * If you wish to animate the dialog, provide a value of the animation duration to enable the animation to complete before the dialog closes.
   * @default `0`.
   */
  animationDuration?: number;
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
   * pressing the escape key.
   * @default `false`.
   */
  preventClose?: boolean;
  /**
   * Enables focusing a particular element in the dialog content and override default behavior. This will have no effect if the dialog is not modal.
   * @default `false`.
   */
  initialFocusRef?: RefObject<HTMLElement>;
  /**
   * By passing a `preventOutsideClickRefs` ref or array of refs,
   * you can prevent the dialog from closing when clicking on elements referenced by these refs.
   */
  preventOutsideClickRefs?: RefObject<HTMLElement> | RefObject<HTMLElement>[];
  /**
   * A `ReactNode` or a function that returns the content of the modal dialog.
   */
  children?:
    | ReactNode
    | (({ onClose }: { onClose?: DialogProps['onCloseEnd'] }) => ReactNode);
  [key: DataAttribute]: string | undefined;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (props, ref) => {
    const {
      open,
      isModal = false,
      children,
      onCloseEnd,
      closeButtonLabel,
      className,
      initialFocusRef,
      preventOutsideClickRefs,
      preventClose = false,
      animationDuration = 0,
      onCloseStart,
      ...rest
    } = useI18n(props, translations);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openRef = useLatest<boolean>(open);
    const animationDurationRef = useLatest<number>(animationDuration);
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);

    // eslint-disable-next-line compat/compat
    const hasNativeDialog = window.HTMLDialogElement !== undefined;

    useScrollLock(open && isModal);

    // set initial focus on the modal dialog content
    useEffect(() => {
      const dialogElement = dialogRef.current;
      let timeoutId: NodeJS.Timeout;
      if (open && dialogElement) {
        timeoutId = setTimeout(() => {
          if (initialFocusRef?.current) {
            initialFocusRef?.current?.focus();
          } else {
            const firstFocusableElement = getFirstFocusableElement(
              dialogElement,
              isModal,
            );
            if (firstFocusableElement) {
              firstFocusableElement?.focus();
            } else {
              dialogElement.focus();
            }
          }
        }, animationDurationRef.current);
      }
      return () => {
        clearTimeout(timeoutId);
      };
    }, [open, initialFocusRef, isModal, animationDurationRef.current]);

    useEffect(() => {
      // save the opening element to restore focus after the dialog closes
      if (open) {
        if (document.activeElement instanceof HTMLElement) {
          lastFocusedElementRef.current = document.activeElement;
        }
      }
      return () => {
        // restore focus to the opening element
        if (lastFocusedElementRef.current) {
          setTimeout(
            () => lastFocusedElementRef.current?.focus(),
            animationDurationRef.current,
          );
        }
      };
    }, [open, animationDurationRef]);

    const preventEscapeKeyEvent = useCallback((event: KeyboardEvent) => {
      if (isEscape(event)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, []);

    const onPolyfillBackdropClick = useCallback(
      (event: MouseEvent) => {
        if (preventClose) {
          event.preventDefault();
        }
      },
      [preventClose],
    );

    useEffect(() => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) {
        return undefined;
      }

      const handleClose = () => {
        // the effect assigning the 'close' event listener to the dialog
        // causes the `onCloseEnd` callback to be called if the effect's
        // dependencies change.
        // To avoid that we set the dialog's returnValue to 'skipOnClose'
        // in the effect's cleanup fn and reset it afterward.
        if (
          openRef.current &&
          dialogRef.current?.returnValue !== 'skipOnClose'
        ) {
          onCloseEnd?.();
        }
        if (dialogRef.current?.returnValue === 'skipOnClose') {
          dialogRef.current.returnValue = '';
        }
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The package is bundled incorrectly
      dialogPolyfill.registerDialog(dialogElement);
      dialogElement.style.setProperty(
        '--dialog-animation-duration',
        `${animationDurationRef.current}ms`,
      );
      if (preventClose && isModal) {
        dialogElement.addEventListener('keydown', preventEscapeKeyEvent);
      }
      if (onCloseEnd) {
        dialogElement.addEventListener('close', handleClose);
      }

      return () => {
        dialogElement.removeEventListener('close', handleClose);
        dialogElement.removeEventListener('keydown', preventEscapeKeyEvent);
      };
    }, [
      openRef.current,
      onCloseEnd,
      preventClose,
      isModal,
      preventEscapeKeyEvent,
      animationDurationRef.current,
    ]);

    const handleDialogClose = useCallback(() => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) {
        return;
      }

      if (!hasNativeDialog && isModal) {
        (dialogElement.nextSibling as HTMLDivElement).classList.remove(
          classes['backdrop-visible'],
        );
      }
      onCloseStart?.();
      // trigger closing of the dialog after animation
      setTimeout(() => {
        if (dialogElement.open) {
          dialogElement.close();
        }
      }, animationDurationRef.current);
    }, [hasNativeDialog, animationDurationRef.current, isModal, onCloseStart]);

    const handleOutsideClick = useCallback(() => {
      lastFocusedElementRef.current = null;
      handleDialogClose();
    }, [handleDialogClose]);

    const useClickOutsideRefs = preventOutsideClickRefs
      ? // eslint-disable-next-line compat/compat
        [dialogRef, preventOutsideClickRefs].flat()
      : [dialogRef];

    useClickOutside(useClickOutsideRefs, handleOutsideClick, open && !isModal);
    useEscapeKey(() => handleDialogClose(), open && !isModal);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return undefined;
      }

      if (!open) {
        dialogElement.returnValue = '';
      }
      if (open && !dialogElement.open) {
        if (isModal) {
          dialogElement.showModal();
        } else {
          dialogElement.show();
        }
        if (!hasNativeDialog && dialogElement.nextSibling) {
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
      }
      if (!open && dialogElement.open) {
        handleDialogClose();
      }

      return () => {
        if (dialogElement.open) {
          dialogElement.close('skipOnClose');
        }
        (dialogElement.nextSibling as HTMLDivElement)?.removeEventListener(
          'click',
          onPolyfillBackdropClick,
        );
      };
    }, [
      isModal,
      open,
      handleDialogClose,
      hasNativeDialog,
      onPolyfillBackdropClick,
    ]);

    const onDialogClick = (
      event: ClickEvent<HTMLDialogElement> | ClickEvent<HTMLDivElement>,
    ) => {
      // the dialog content covers the whole dialog element
      // leaving the backdrop element as the only clickable area
      // that can trigger an onClick event
      if (event.target === event.currentTarget && !preventClose) {
        handleDialogClose();
      }
    };

    return (
      <>
        {/* eslint-disable-next-line  jsx-a11y/no-noninteractive-element-interactions */}
        <dialog
          onClick={onDialogClick}
          className={clsx(classes.base, isModal && classes.modal, className)}
          ref={applyMultipleRefs(ref, dialogRef)}
          {...rest}
        >
          {isModal && !preventClose && (
            <CloseButton onClick={handleDialogClose} className={classes.close}>
              {closeButtonLabel}
            </CloseButton>
          )}
          {open &&
            (typeof children === 'function'
              ? children?.({ onClose: onCloseEnd })
              : children)}
        </dialog>
      </>
    );
  },
);
