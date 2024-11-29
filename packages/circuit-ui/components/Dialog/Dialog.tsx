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
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';

import classes from './Dialog.module.css';
import { createUseModalDialog } from './createUseModalDialog.js';
import { getFirstFocusableElement } from './DialogService.js';

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'children'> {
  open: boolean;
  onClose?: () => void;
  children: () => ReactNode;
  closeButtonLabel: string;
  isModal?: boolean;
  variant?: 'contextual' | 'immersive';
}

export const animationDuration = 300;

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open,
      onClose,
      closeButtonLabel,
      variant = 'contextual',
      isModal = false,
      children,
      className,
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
        setTimeout(() => lastFocusedElementRef.current?.focus());
      }
      // restore scroll tp page
      document.documentElement.style.overflowY = 'unset';
      // trigger close animation
      clearAnimationClasses();
      // trigger dialog close after animation
      setTimeout(() => {
        if (dialogElement.open) {
          dialogElement.close();
        }
      }, animationDuration);
    }, []);

    const handleOutsideClick = useCallback(() => {
      // modal dialogs outside click is handled by onDialogClick
      if (open && !isModal) {
        lastFocusedElementRef.current = null;
        handleDialogClose();
      }
    }, [isModal, open, handleDialogClose]);

    useClickOutside(dialogRef, handleOutsideClick, open);
    useEscapeKey(clearAnimationClasses, open);

    useEffect(() => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) {
        return undefined;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The package is bundled incorrectly
      dialogPolyfill.registerDialog(dialogElement);
      if (onClose) {
        dialogElement.addEventListener('close', onClose);
      }

      return () => {
        if (onClose) {
          dialogElement.removeEventListener('close', onClose);
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
          if (isModal) {
            dialogElement.showModal();
            if (!hasNativeDialog && isModal) {
              // use the polyfill backdrop
              (dialogElement.nextSibling as HTMLDivElement).classList.add(
                classes['backdrop-visible'],
                classes.backdrop,
              );
            }
          } else {
            dialogElement.show();
          }
          // trigger show animation
          dialogElement.classList.add(classes.show);
          // if dialog is modal, disable scroll on page
          if (isModal) {
            document.documentElement.style.overflowY = 'hidden';
          }
        }
      } else if (dialogElement.open) {
        handleDialogClose();
      }

      return () => {
        if (dialogElement.open) {
          dialogElement.close();
        }
      };
    }, [open, isModal, handleDialogClose, hasNativeDialog]);

    const onDialogClick = (
      event: ClickEvent<HTMLDialogElement> | ClickEvent<HTMLDivElement>,
    ) => {
      if (isModal && event.target === event.currentTarget) {
        handleDialogClose();
      }
    };

    function clearAnimationClasses() {
      const dialogElement = dialogRef.current;
      if (!dialogElement) {
        return;
      }
      dialogElement.classList.remove(classes.show);
      if (!hasNativeDialog && isModal) {
        (dialogElement.nextSibling as HTMLDivElement).classList.remove(
          classes['backdrop-visible'],
        );
      }
    }

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
