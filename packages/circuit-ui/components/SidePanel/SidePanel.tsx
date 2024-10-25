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

import { useEffect, useId, useState, type UIEventHandler } from 'react';
import type { Props as ReactModalProps } from 'react-modal';

import { isFunction } from '../../util/type-check';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors';

import { MobileSidePanel } from './components/MobileSidePanel/index';
import { DesktopSidePanel } from './components/DesktopSidePanel/index';
import { Header } from './components/Header/index';
import type { SidePanelHookProps, OnBack, OnClose } from './useSidePanel';
import contextClasses from './SidePanelContext.module.css';
import classes from './SidePanel.module.css';

export type SidePanelProps = Omit<ReactModalProps, 'children'> &
  Pick<
    SidePanelHookProps,
    'backButtonLabel' | 'children' | 'closeButtonLabel' | 'headline'
  > & {
    /**
     * Boolean indicating whether the bottom side panel is being closed.
     */
    isBottomPanelClosing: boolean;
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
    onClose: OnClose;
  };

export const SidePanel = ({
  backButtonLabel,
  children,
  closeButtonLabel,
  headline,
  isBottomPanelClosing,
  isInstantOpen,
  isMobile,
  isStacked,
  onBack,
  onClose,
  ...props
}: SidePanelProps) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!isSufficientlyLabelled(closeButtonLabel)) {
      throw new AccessibilityError(
        'SidePanel',
        'The `closeButtonLabel` prop is missing or invalid.',
      );
    }
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

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    setHeaderSticky(event.currentTarget.scrollTop > 0);
  };

  const defaultProps: Partial<ReactModalProps> = {
    aria: {
      labelledby: headerAriaId,
    },
    onRequestClose: onBack || onClose,
    portalClassName: contextClasses['cui-side-panel-portal'],
    htmlOpenClassName: contextClasses['cui-side-panel-open'],
    bodyOpenClassName: '',
    /**
     * react-modal relies on document.activeElement to return focus after the modal is closed.
     * Safari and Firefox don't set it properly on button click (see https://github.com/reactjs/react-modal/issues/858 and https://github.com/reactjs/react-modal/issues/389).
     * Returning the focus to document.body or to the focus-root can cause unwanted page scroll.
     * Preventing scroll on focus would provide better UX for mouse users and shouldn't cause any side effects for assistive technology users.
     */
    preventScroll: true,
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
      <MobileSidePanel
        {...defaultProps}
        {...props}
        isBottomPanelClosing={isBottomPanelClosing}
        isStacked={isStacked}
      >
        {content}
      </MobileSidePanel>
    );
  }

  return (
    <DesktopSidePanel
      {...defaultProps}
      {...props}
      isInstantOpen={isInstantOpen}
    >
      {content}
    </DesktopSidePanel>
  );
};
