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
  type ReactNode,
} from 'react';

import { isFunction } from '../../util/type-check.js';
import { Dialog, type DialogProps } from '../Dialog/Dialog.js';
import { clsx } from '../../styles/clsx.js';
import { useAnimation } from '../../hooks/useAnimation/index.js';
import { sharedClasses } from '../../styles/shared.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';

import { Header } from './components/Header/index.js';
import type { ChildrenRenderProps, OnBack, OnClose } from './useSidePanel.js';
import classes from './SidePanel.module.css';
import { translations } from './translations/index.js';

export type SidePanelProps = Omit<DialogProps, 'children'> & {
  /**
   * The headline of the side panel.
   */
  headline: string;
  /**
   * Text label for the back button for screen readers.
   * Important for accessibility.
   */
  backButtonLabel?: string;
  /**
   * The side panel content. Use a render function when you need access to the
   * `onBack` and `onClose` functions to close the side panel programmatically.
   */
  children: ReactNode | ((props: ChildrenRenderProps) => ReactNode);
  /**
   * Boolean indicating whether the side panel should be in desktop or mobile mode.
   */
  isMobile: boolean;
  /**
   * Callback function that is called when the stacked side panel is closed.
   */
  onBack?: OnBack;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onClose?: OnClose;
};

export const SidePanel = forwardRef<HTMLDialogElement, SidePanelProps>(
  (props, ref) => {
    const {
      open,
      backButtonLabel,
      children,
      closeButtonLabel,
      headline,
      isMobile,
      onBack,
      onCloseEnd,
      onClose,
      preventOutsideClickClose,
      animationDuration = 0,
      preventEscapeKeyClose,
      className,
      ...rest
    } = useI18n(props, translations);
    {
      const [animationClass, setAnimationClass] = useState<string | undefined>(
        classes.closed,
      );
      const [isHeaderSticky, setHeaderSticky] = useState(false);
      const headerAriaId = useId();

      const [, setAnimating] = useAnimation();

      const onOpening = useCallback(() => {
        setAnimating({
          duration: animationDuration,
          onStart: () => {
            setAnimationClass(
              animationDuration > 0
                ? sharedClasses.animationSlideRightIn
                : undefined,
            );
          },
          onEnd: () => {
            setAnimationClass(undefined);
          },
        });
      }, [animationDuration, setAnimating]);

      const onClosing = useCallback(
        (callBack?: OnBack | OnClose) => {
          setAnimating({
            duration: animationDuration,
            onStart: () => {
              void callBack?.();
              setAnimationClass(sharedClasses.animationSlideRightOut);
            },
            onEnd: () => {
              setAnimationClass(classes.closed);
              onCloseEnd?.();
            },
          });
        },
        [setAnimating, animationDuration, onCloseEnd],
      );

      // biome-ignore lint/correctness/useExhaustiveDependencies: Not sure why this effect is necessary
      useEffect(() => {
        setHeaderSticky(false);
      }, [isMobile]);

      const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
        setHeaderSticky(event.currentTarget.scrollTop > 0);
      };

      useEffect(() => {
        // trigger animation on opening
        onOpening();
      }, [onOpening]);

      useEffect(
        () => () => {
          onCloseEnd?.();
        },
        [onCloseEnd],
      );

      return (
        <Dialog
          {...rest}
          ref={ref}
          open={open}
          isModal={isMobile}
          aria-labelledby={headerAriaId}
          animationDuration={animationDuration}
          className={clsx(classes.base, animationClass, className)}
          onCloseStart={() => onClosing(onBack || onClose)}
          preventOutsideClickClose={true}
          preventEscapeKeyClose={preventEscapeKeyClose}
          hideCloseButton
        >
          <div className={classes.wrapper} onScroll={handleScroll}>
            <Header
              backButtonLabel={backButtonLabel}
              closeButtonLabel={closeButtonLabel}
              headline={headline}
              id={headerAriaId}
              onBack={onBack ? () => onClosing(onBack) : undefined}
              onClose={() => onClosing(onClose)}
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
