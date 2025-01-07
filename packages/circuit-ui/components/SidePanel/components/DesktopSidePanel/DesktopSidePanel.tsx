/**
 * Copyright 2022, SumUp Ltd.
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

import { forwardRef, useEffect, useRef, useState } from 'react';

import { clsx } from '../../../../styles/clsx.js';
import { StackContext } from '../../../StackContext/index.js';
import type { SidePanelProps } from '../../SidePanel.js';
import { useEscapeKey } from '../../../../hooks/useEscapeKey/index.js';
import { getFirstFocusableElement } from '../../../Modal/ModalService.js';
import dialogPolyfill from '../../../../vendor/dialog-polyfill/index.js';
import { TRANSITION_DURATION } from '../../constants.js';
import { applyMultipleRefs } from '../../../../util/refs.js';

import classes from './DesktopSidePanel.module.css';

export type DesktopSidePanelProps = Omit<
  SidePanelProps,
  'isMobile' | 'isStacked' | 'headline'
>;

export const DesktopSidePanel = forwardRef<
  HTMLDialogElement,
  DesktopSidePanelProps
>((props, ref) => {
  const { children, isInstantOpen, open, onClose, className, ...rest } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      lastFocusedElementRef.current = document.activeElement;
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const dialogElement = dialogRef.current;

    if (open && dialogElement) {
      timeoutId = setTimeout(() => {
        getFirstFocusableElement(dialogElement)?.focus();
      }, TRANSITION_DURATION);
    }
    if (!open && lastFocusedElementRef.current) {
      // restore focus to the last focused element
      setTimeout(
        () => lastFocusedElementRef.current?.focus(),
        TRANSITION_DURATION,
      );
    }
    return () => clearTimeout(timeoutId);
  }, [open]);

  useEffect(
    () => () => {
      if (dialogRef.current) {
        dialogRef.current?.close();
      }
      void onClose?.();
    },
    [onClose],
  );
  const [isOpen, setIsOpen] = useState(false);

  function onEscapeKey() {
    if (dialogRef.current) {
      dialogRef.current?.close();
      void onClose?.();
    }
  }
  useEscapeKey(onEscapeKey, open);

  // trigger animation on show
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore The package is bundled incorrectly
    dialogPolyfill.registerDialog(dialogElement);
  }, []);

  return (
    <StackContext.Provider value={'var(--cui-z-index-navigation)'}>
      <dialog
        {...rest}
        open={open}
        ref={applyMultipleRefs(ref, dialogRef)}
        className={clsx(
          classes.base,
          isOpen && classes.open,
          !isOpen && classes.closed,
          isOpen && isInstantOpen && classes.instant,
          className,
        )}
      >
        {typeof children === 'function' ? children?.({ onClose }) : children}
      </dialog>
    </StackContext.Provider>
  );
});
