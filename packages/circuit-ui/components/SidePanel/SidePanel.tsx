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

import {
  useEffect,
  useId,
  useState,
  type UIEventHandler,
  forwardRef,
  useCallback,
} from 'react';

import { isFunction } from '../../util/type-check.js';
import { Dialog, type DialogProps } from '../Dialog/Dialog.js';
import { clsx } from '../../styles/clsx.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';

import { Header } from './components/Header/index.js';
import type { SidePanelHookProps } from './useSidePanel.js';
import classes from './SidePanel.module.css';
import { translations } from './translations/index.js';

export type SidePanelProps = Omit<DialogProps, 'children'> & SidePanelHookProps;

export const SidePanel = forwardRef<HTMLDialogElement, SidePanelProps>(
  (props, ref) => {
    const {
      open,
      backButtonLabel,
      children,
      closeButtonLabel,
      headline,
      onBack,
      onCloseEnd,
      onClose,
      preventOutsideClickClose,
      animationDuration = 0,
      preventEscapeKeyClose,
      className,
      ...rest
    } = useI18n(props, translations);
    const isMobile = useMedia('(max-width: 767px)');

    {
      const [animationClass, setAnimationClass] = useState<string>();
      const [isHeaderSticky, setHeaderSticky] = useState(false);
      const headerAriaId = useId();

      // biome-ignore lint/correctness/useExhaustiveDependencies: Not sure why this effect is necessary
      useEffect(() => {
        setHeaderSticky(false);
      }, [isMobile]);

      const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
        setHeaderSticky(event.currentTarget.scrollTop > 0);
      };

      useEffect(() => {
        setAnimationClass(open ? classes.open : undefined);
      }, [open]);

      useEffect(
        () => () => {
          onCloseEnd?.();
        },
        [onCloseEnd],
      );

      const escapeHandler = useCallback(() => {
        (onBack || onClose)?.();
      }, [onBack, onClose]);

      useEscapeKey(escapeHandler, open && !preventEscapeKeyClose);

      return (
        <Dialog
          {...rest}
          ref={ref}
          open={open}
          isModal={isMobile}
          aria-labelledby={headerAriaId}
          animationDuration={animationDuration}
          className={clsx(classes.base, animationClass, className)}
          onCloseStart={onBack || onClose}
          preventOutsideClickClose={true}
          preventEscapeKeyClose={true}
          hideCloseButton
        >
          <div className={classes.wrapper} onScroll={handleScroll}>
            <Header
              backButtonLabel={backButtonLabel}
              closeButtonLabel={closeButtonLabel}
              headline={headline}
              id={headerAriaId}
              onBack={onBack}
              onClose={onClose}
              isSticky={isHeaderSticky}
            />
            <div className={classes.content}>
              {isFunction(children) ? children({ onBack, onClose }) : children}
            </div>
          </div>
        </Dialog>
      );
    }
  },
);
