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
} from 'react';

import { isFunction } from '../../util/type-check.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { Modal } from '../Modal/index.js';
import { clsx } from '../../styles/clsx.js';

import { DesktopSidePanel } from './components/DesktopSidePanel/index.js';
import { Header } from './components/Header/index.js';
import type { SidePanelHookProps, OnBack, OnClose } from './useSidePanel.js';
import classes from './SidePanel.module.css';

export type SidePanelProps = SidePanelHookProps & {
  /**
   * Whether the side panel is open or not.
   */
  open: boolean;
  /**
   * Boolean indicating whether the side panel should be opened without animation.
   */
  isInstantOpen: boolean;
  /**
   * Boolean indicating whether the side panel should be in desktop or mobile mode.
   */
  isMobile: boolean;
  /**
   * Boolean indicating whether the side panel is stacked over another panel.
   */
  isStacked: boolean;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onBack?: OnBack;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onClose?: OnClose;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onAfterClose?: () => void;
};

export const SidePanel = forwardRef<HTMLDialogElement, SidePanelProps>(
  (props, ref) => {
    const {
      backButtonLabel,
      children,
      closeButtonLabel,
      headline,
      isInstantOpen,
      isMobile,
      isStacked,
      onBack,
      onClose,
      className,
      onAfterClose,
      ...rest
    } = props;
    {
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        if (onBack && !isSufficientlyLabelled(backButtonLabel)) {
          throw new AccessibilityError(
            'SidePanel',
            'The `backButtonLabel` prop is missing or invalid.',
          );
        }
      }

      const [isHeaderSticky, setHeaderSticky] = useState(false);
      const headerAriaId = useId();

      // biome-ignore lint/correctness/useExhaustiveDependencies: Not sure why this effect is necessary
      useEffect(() => {
        setHeaderSticky(false);
      }, [isMobile]);

      useEffect(
        () => () => {
          onAfterClose?.();
        },
        [onAfterClose],
      );

      const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
        setHeaderSticky(event.currentTarget.scrollTop > 0);
      };

      const content = (
        <div className={classes.base} onScroll={handleScroll}>
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
      );

      if (isMobile) {
        return (
          <Modal
            {...rest}
            ref={ref}
            aria-labelledby={headerAriaId}
            onClose={onBack || onClose}
            className={clsx(className, classes.modal)}
            variant="immersive"
            animation="slide-right"
            style={{ background: 'var(--cui-bg-normal)' }}
          >
            {content}
          </Modal>
        );
      }

      return (
        <DesktopSidePanel
          {...props}
          ref={ref}
          aria-labelledby={headerAriaId}
          onClose={onBack || onClose}
          className={className}
          isInstantOpen={isInstantOpen}
        >
          {content}
        </DesktopSidePanel>
      );
    }
  },
);
