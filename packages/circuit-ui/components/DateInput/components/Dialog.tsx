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
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
} from 'react';

import dialogPolyfill from '../../../vendor/dialog-polyfill/index.js';
import { useStackContext } from '../../StackContext/StackContext.js';
import { applyMultipleRefs } from '../../../util/refs.js';
import { clsx } from '../../../styles/clsx.js';
import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside.js';
import { useEscapeKey } from '../../../hooks/useEscapeKey/useEscapeKey.js';

import classes from './Dialog.module.css';

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'children'> {
  open: boolean;
  isModal?: boolean;
  onClose: () => void;
  children: () => ReactNode;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, open, onClose, className, style, isModal, ...props }, ref) => {
    const zIndex = useStackContext();
    const dialogRef = useRef<HTMLDialogElement>(null);

    // the last focused element, used to restore focus when the dialog is closed
    const lastFocusedElementRef = useRef<Element | null>(null);

    const handleClickOutside = useCallback(
      // store it as the last focused element
      (event: Event) => {
        if (event.target instanceof HTMLElement) {
          lastFocusedElementRef.current = event.target;
        }
        onClose();
      },
      [onClose],
    );

    useClickOutside(dialogRef, handleClickOutside, open);
    useEscapeKey(onClose, open);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return undefined;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The package is bundled incorrectly
      dialogPolyfill.registerDialog(dialogElement);

      dialogElement.addEventListener('close', onClose);

      return () => {
        dialogElement.removeEventListener('close', onClose);
      };
    }, [onClose]);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return undefined;
      }

      if (open) {
        lastFocusedElementRef.current = document.activeElement;
        if (!dialogElement.open) {
          if (isModal) {
            dialogElement.showModal();
          } else {
            dialogElement.show();
          }
        }
      } else if (dialogElement.open) {
        // restore focus to the last focused element
        if (
          lastFocusedElementRef.current &&
          lastFocusedElementRef.current instanceof HTMLElement
        ) {
          lastFocusedElementRef.current?.focus();
        }
        dialogElement.close();
      }

      return () => {
        if (dialogElement.open) {
          // restore focus to the last focused element
          if (
            lastFocusedElementRef.current &&
            lastFocusedElementRef.current instanceof HTMLElement
          ) {
            lastFocusedElementRef.current?.focus();
          }
          dialogElement.close();
        }
      };
    }, [open, isModal]);

    return (
      <>
        {/* @ts-expect-error "Expression produces a union type that is too complex to represent" */}
        <dialog
          ref={applyMultipleRefs(ref, dialogRef)}
          className={clsx(classes.dialog, className)}
          // @ts-expect-error z-index can be a string
          style={{
            ...style,
            zIndex: zIndex || 'var(--cui-z-index-modal)',
          }}
          {...props}
        >
          {open ? children() : null}
        </dialog>
        <div
          className={classes.backdrop}
          style={{
            // @ts-expect-error z-index can be a string
            zIndex: `calc(${zIndex?.toString() || 'var(--cui-z-index-modal)'} - 1)`,
          }}
        />
      </>
    );
  },
);

Dialog.displayName = 'Dialog';
