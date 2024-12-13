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
  type RefObject,
  useCallback,
  useEffect,
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

import classes from './Modal.module.css';
import { createUseModal } from './createUseModal.js';
import {
  getFirstFocusableElement,
  hasNativeDialogSupport,
} from './ModalService.js';
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
   * @deprecated this props was passed to react-modal and is no longer relevant.
   * Use preventClose instead. Also see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role#required_javascript_features
   */
  hideCloseButton?: boolean;
  [key: DataAttribute]: string | undefined;
}

export const ANIMATION_DURATION = 300;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  const {
    open,
    onClose,
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
        'The "hideCloseButton" prop has been deprecated. Use the `preventClose` prop instead.',
      );
    }
  }

  const hasNativeDialog = hasNativeDialogSupport();

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
  }, [open]);

  function setScrollProperty() {
    document.documentElement.style.setProperty(
      '--scroll-y',
      `${window.scrollY}px`,
    );
  }

  useEffect(() => {
    window.addEventListener('scroll', setScrollProperty);
    return () => {
      window.removeEventListener('scroll', setScrollProperty);
    };
  }, [setScrollProperty]);

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
    // restore scroll to page
    const { body } = document;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, Number.parseInt(scrollY || '0', 10) * -1);

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
  }, []);

  // intercept and prevent polyfill modal closing if preventClose is true
  function onPolyfillDialogKeydown(event: KeyboardEvent) {
    if (isEscape(event)) {
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
        // disable scroll on page
        const scrollY =
          document.documentElement.style.getPropertyValue('--scroll-y');
        const { body } = document;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;
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
          variant === 'immersive' && classes.immersive,
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
          </div>
        )}
      </dialog>
    </>
  );
});

Modal.displayName = 'Modal';

export const useModal = createUseModal(Modal);
