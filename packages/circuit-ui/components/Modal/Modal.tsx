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

'use client';

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import { CloseButton } from '../CloseButton/index.js';
import dialogPolyfill from '../../vendor/dialog-polyfill/index.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import type { ClickEvent } from '../../types/events.js';
import { isEscape } from '../../util/key-codes.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { deprecate } from '../../util/logger.js';
import type { Locale } from '../../util/i18n.js';
import { useScrollLock } from '../../hooks/useScrollLock/useScrollLock.js';

import classes from './Modal.module.css';
import { getFirstFocusableElement } from './ModalService.js';
import { translations } from './translations/index.js';

type DataAttribute = `data-${string}`;
export interface ModalProps
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
   * a ReactNode or a function that returns the content of the modal dialog.
   */
  children?:
    | ReactNode
    | (({ onClose }: { onClose?: ModalProps['onClose'] }) => ReactNode);
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel?: string;
  /**
   * Use the `immersive` variant to focus the user's attention on the dialog content.
   * default: 'contextual'
   * */
  variant?: 'contextual' | 'immersive';
  /**
   * Prevent users from closing the modal by clicking/tapping the overlay or
   * pressing the escape key. Default `false`.
   */
  preventClose?: boolean;
  /**
   * Enables focusing a particular element in the dialog content and override default behavior
   */
  initialFocusRef?: RefObject<HTMLElement>;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
  /**
   * @deprecated This prop was passed to `react-modal` and is no longer relevant.
   * Use the `preventClose` prop instead. Also see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role#required_javascript_features
   */
  hideCloseButton?: boolean;
  [key: DataAttribute]: string | undefined;
}

export const ANIMATION_DURATION = 300;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  const {
    open,
    onClose,
    locale,
    closeButtonLabel,
    variant = 'contextual',
    children,
    className,
    preventClose,
    initialFocusRef,
    hideCloseButton,
    ...rest
  } = useI18n(props, translations);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  if (process.env.NODE_ENV !== 'production') {
    if (hideCloseButton) {
      deprecate(
        'Modal',
        'The `hideCloseButton` prop has been deprecated. Use the `preventClose` prop instead.',
      );
    }
  }

  // eslint-disable-next-line compat/compat
  const hasNativeDialog = window.HTMLDialogElement !== undefined;

  useScrollLock(open);

  useLayoutEffect(
    () => () => {
      if (dialogRef?.current?.open) {
        dialogRef?.current?.close();
      }
    },
    [],
  );

  // set initial focus on the modal dialog content
  useEffect(() => {
    const dialogElement = dialogRef.current;
    let timeoutId: NodeJS.Timeout;
    if (open && dialogElement) {
      timeoutId = setTimeout(() => {
        if (initialFocusRef?.current) {
          initialFocusRef?.current?.focus();
        } else {
          getFirstFocusableElement(dialogElement).focus();
        }
      }, ANIMATION_DURATION);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [open, initialFocusRef?.current]);

  const handleDialogClose = useCallback(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }
    // restore focus to the last focused element
    if (lastFocusedElementRef.current) {
      setTimeout(
        () => lastFocusedElementRef.current?.focus(),
        ANIMATION_DURATION,
      );
    }
    // trigger closing animation
    dialogElement.classList.remove(classes.show);
    if (!hasNativeDialog) {
      (dialogElement.nextSibling as HTMLDivElement).classList.remove(
        classes['backdrop-visible'],
      );
    }
    // trigger closing of the dialog after animation
    setTimeout(() => {
      if (dialogElement.open) {
        dialogElement.close();
      }
    }, ANIMATION_DURATION);
  }, [hasNativeDialog]);

  // intercept and prevent polyfill modal closing if preventClose is true
  const onPolyfillDialogKeydown = useCallback((event: KeyboardEvent) => {
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
  }, [
    onClose,
    onPolyfillBackdropClick,
    preventClose,
    hasNativeDialog,
    onPolyfillDialogKeydown,
  ]);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (!dialogElement) {
      return;
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
      }
    } else if (dialogElement.open) {
      handleDialogClose();
    }
  }, [open, handleDialogClose, hasNativeDialog, onPolyfillBackdropClick]);

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
        ref={applyMultipleRefs(ref, dialogRef)}
        className={clsx(
          classes.base,
          variant === 'immersive' && classes.immersive,
          className,
        )}
        {...rest}
      >
        <CloseButton onClick={handleDialogClose} className={classes.close}>
          {closeButtonLabel}
        </CloseButton>
        {open && (
          <div className={classes.content}>
            {typeof children === 'function'
              ? children?.({ onClose })
              : children}
            <div className={classes.scrollable} />
          </div>
        )}
      </dialog>
    </>
  );
});

Modal.displayName = 'Modal';
