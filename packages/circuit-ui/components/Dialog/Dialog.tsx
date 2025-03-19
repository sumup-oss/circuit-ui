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
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';

import type { Locale } from '../../util/i18n.js';
import { applyMultipleRefs } from '../../util/refs.js';
import dialogPolyfill from '../../vendor/dialog-polyfill/index.js';
import { useScrollLock } from '../../hooks/useScrollLock/useScrollLock.js';
import { CloseButton } from '../CloseButton/index.js';
import { clsx } from '../../styles/clsx.js';
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { useLatest } from '../../hooks/useLatest/index.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';

import classes from './Dialog.module.css';
import { translations } from './translations/index.js';

type DataAttribute = `data-${string}`;

export interface PublicDialogProps
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
   * The duration of the dialog animation in milliseconds.
   * If you wish to animate the dialog, provide a value of the animation duration to enable the animation to complete before the dialog closes.
   * @default 0
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
   * A `ReactNode` or a function that returns the content of the modal dialog.
   */
  children?:
    | ReactNode
    | (({ onClose }: { onClose?: DialogProps['onCloseEnd'] }) => ReactNode);
  [key: DataAttribute]: string | undefined;
}

export interface DialogProps extends PublicDialogProps {
  /**
   * Fired when the dialog starts to close.
   * Use this to trigger animations before the dialog closes.
   */
  onCloseStart?: () => void;
  /**
   * Callback function invoked when the dialog closes.
   */
  onCloseEnd?: () => void;
  /**
   * Prevent users from closing the modal by clicking/tapping outside the dialog element.
   * @default false
   */
  preventOutsideClickClose?: boolean;
  /**
   * Prevent users from closing the modal by pressing the escape key.
   * @default false
   */
  preventEscapeKeyClose?: boolean;
  /**
   * Hides the close button when the dialog is modal.
   @default false
   */
  hideCloseButton?: boolean;
  /**
   * By passing a `preventOutsideClickRefs` ref or array of refs,
   * you can prevent the dialog from closing when clicking on elements referenced by these refs.
   */
  preventOutsideClickRefs?: RefObject<HTMLElement> | RefObject<HTMLElement>[];
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
      preventOutsideClickRefs,
      preventOutsideClickClose = false,
      hideCloseButton = false,
      preventEscapeKeyClose = false,
      animationDuration = 0,
      onCloseStart,
      locale,
      style,
      ...rest
    } = useI18n(props, translations);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openRef = useLatest<boolean>(open);
    const isModalRef = useLatest<boolean>(isModal);
    const animationDurationRef = useLatest<number>(animationDuration);
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    // Focus Management
    useEffect(() => {
      // save the opening element to restore focus after the dialog closes
      if (open) {
        if (document.activeElement instanceof HTMLElement) {
          lastFocusedElementRef.current = document.activeElement;
        }
      }
      return () => {
        // restore focus to the opening element
        if (
          !dialogRef.current?.contains(document.activeElement) &&
          document.body !== document.activeElement
        ) {
          return;
        }
        if (lastFocusedElementRef.current) {
          setTimeout(
            () => lastFocusedElementRef.current?.focus(),
            animationDurationRef.current,
          );
        }
      };
    }, [open, animationDurationRef]);

    // Component  opening/closing logic
    const handleDialogClose = useCallback(() => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) {
        return;
      }
      onCloseStart?.();
      setIsClosing(true);
      // trigger closing of the dialog after animation
      setTimeout(() => {
        if (dialogElement.open) {
          dialogElement.close();
          setIsClosing(false);
        }
      }, animationDurationRef.current);
    }, [animationDurationRef, onCloseStart]);

    useEffect(() => {
      // register the dialog element with the polyfill
      if (dialogRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore The package is bundled incorrectly
        dialogPolyfill.registerDialog(dialogRef.current);
      }
    }, []);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return undefined;
      }

      if (!openRef.current) {
        dialogElement.returnValue = '';
      }
      if (openRef.current && !dialogElement.open) {
        if (isModal) {
          dialogElement.showModal();
        } else {
          dialogElement.show();
        }
      }

      return () => {
        if (dialogElement.open) {
          dialogElement.close('skipOnClose');
        }
      };
    }, [isModal, openRef]);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return;
      }

      if (!open) {
        dialogElement.returnValue = '';
      }
      if (open && !dialogElement.open) {
        if (isModalRef.current) {
          dialogElement.showModal();
        } else {
          dialogElement.show();
        }
      }
    }, [isModalRef, open]);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return;
      }
      if (!open && dialogElement.open) {
        handleDialogClose();
      }
    }, [open, handleDialogClose]);

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
        if (dialogElement?.returnValue !== 'skipOnClose') {
          onCloseEnd?.();
        }
        if (dialogElement?.returnValue === 'skipOnClose') {
          dialogElement.returnValue = '';
        }
      };

      if (onCloseEnd) {
        dialogElement.addEventListener('close', handleClose);
      }

      return () => {
        dialogElement.removeEventListener('close', handleClose);
      };
    }, [onCloseEnd]);

    // DOM manipulation and event handling
    useScrollLock(open && isModal);

    useEffect(() => {
      const dialogElement = dialogRef.current;
      if (!preventEscapeKeyClose) {
        return undefined;
      }
      const handleCancel = (event: Event) => {
        event.preventDefault(); // Prevent dialog from closing
      };
      if (dialogElement) {
        dialogElement.addEventListener('cancel', handleCancel);
      }
      return () => dialogElement?.removeEventListener('cancel', handleCancel);
    }, [preventEscapeKeyClose]);

    const handleEscapeKey = useCallback(
      (e: KeyboardEvent) => {
        const isTopMostDialog =
          e
            .composedPath()
            .filter(
              (el) => el instanceof Node && el.nodeName === 'DIALOG',
            )[0] === dialogRef.current;
        if (
          !dialogRef.current?.contains(e.target as Node) ||
          !isTopMostDialog
        ) {
          return;
        }
        e.preventDefault();
        handleDialogClose();
      },
      [handleDialogClose],
    );

    useEscapeKey(handleEscapeKey, open && !preventEscapeKeyClose);

    useEffect(
      () => () => {
        if (dialogRef.current?.open) {
          dialogRef.current?.close();
        }
      },
      [],
    );

    const handleOutsideClick = useCallback(() => {
      lastFocusedElementRef.current = null;
      handleDialogClose();
    }, [handleDialogClose]);

    const useClickOutsideRefs = preventOutsideClickRefs
      ? // eslint-disable-next-line compat/compat
        [dialogRef, preventOutsideClickRefs].flat()
      : [dialogRef];

    useClickOutside(
      useClickOutsideRefs,
      handleOutsideClick,
      open && !preventOutsideClickClose,
    );

    const onPolyfillBackdropClick = useCallback(
      (event: MouseEvent) => {
        if (preventOutsideClickClose) {
          event.preventDefault();
        }
      },
      [preventOutsideClickClose],
    );

    useEffect(() => {
      // eslint-disable-next-line compat/compat
      const hasNativeDialog = window.HTMLDialogElement !== undefined;
      const dialogElement = dialogRef.current;
      if (!dialogElement || hasNativeDialog) {
        return undefined;
      }
      if (open && !hasNativeDialog && dialogElement?.nextSibling) {
        // use the polyfill backdrop
        (dialogElement.nextSibling as HTMLDivElement).classList.add(
          classes.backdrop,
        );
        // intercept and prevent modal closing if preventClose is true
        (dialogElement.nextSibling as HTMLDivElement).addEventListener(
          'click',
          onPolyfillBackdropClick,
        );
      }
      return () => {
        (dialogElement?.nextSibling as HTMLDivElement)?.removeEventListener(
          'click',
          onPolyfillBackdropClick,
        );
      };
    }, [open, onPolyfillBackdropClick]);

    const onDialogClick = useCallback(
      (event: ReactMouseEvent<HTMLDialogElement>) => {
        const isChildNode = dialogRef.current?.contains(event.target as Node);
        if (!preventOutsideClickClose) {
          let isInDialog = false;
          const rect = dialogRef.current?.getBoundingClientRect();
          if (rect) {
            isInDialog =
              rect.top <= event.clientY &&
              event.clientY <= rect.top + rect.height &&
              rect.left <= event.clientX &&
              event.clientX <= rect.left + rect.width;
          }
          const isBackdropClick =
            event.target === dialogRef.current && !isInDialog;
          if (
            (isModal && !isInDialog && !isChildNode) ||
            (isModal && isBackdropClick) ||
            (!isModal && !isChildNode)
          ) {
            handleDialogClose();
          }
        }
      },
      [handleDialogClose, preventOutsideClickClose, isModal],
    );

    return (
      <>
        {/* eslint-disable-next-line  jsx-a11y/no-noninteractive-element-interactions */}
        <dialog
          onClick={onDialogClick}
          className={clsx(classes.base, isModal && classes.modal, className)}
          ref={applyMultipleRefs(ref, dialogRef)}
          style={{
            ...style,
            '--dialog-animation-duration': `${animationDuration}ms`,
          }}
          {...rest}
        >
          {(open || isClosing) &&
            (typeof children === 'function'
              ? children?.({ onClose: onCloseEnd })
              : children)}
          {!hideCloseButton && (
            <CloseButton onClick={handleDialogClose} className={classes.close}>
              {closeButtonLabel}
            </CloseButton>
          )}
        </dialog>
      </>
    );
  },
);
