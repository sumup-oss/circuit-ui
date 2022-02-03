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

import { ReactNode, UIEventHandler, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Props as ReactModalProps } from 'react-modal';

import styled, { StyleProps } from '../../styles/styled';
import { isFunction } from '../../util/type-check';

import { MobileSidePanel } from './components/MobileSidePanel';
import { DesktopSidePanel } from './components/DesktopSidePanel';
import { Header } from './components/Header';

const BODY_OPEN_CLASS_NAME = 'ReactModal__SidePanel__Body--open';
export const HTML_OPEN_CLASS_NAME = 'ReactModal__SidePanel__Html--open';
export const PORTAL_CLASS_NAME = 'ReactModalPortal__SidePanel';
export const TRANSITION_DURATION_DESKTOP = 200;
export const TRANSITION_DURATION_MOBILE = 240;
export const DESKTOP_WIDTH = 400;
export const BODY_MAX_WIDTH = 480;

export type OnClose = () => void;

export type SidePanelProps = {
  /**
   * Text label for the back button for screen readers.
   * Important for accessibility.
   */
  backButtonLabel?: string;
  /**
   * The side panel content. Use a render function when you need access to the
   * `onBack` and `onClose` functions.
   */
  children:
    | ReactNode
    | ((props: Pick<SidePanelProps, 'onBack' | 'onClose'>) => ReactNode);
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel: string;
  /**
   * The headline of the side panel.
   */
  headline: string;
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
  onBack?: OnClose;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onClose: OnClose;
  /**
   * The top offset in 'px' applied to the side panel in desktop mode.
   */
  top: string;
} & Pick<
  ReactModalProps,
  'closeTimeoutMS' | 'isOpen' | 'onAfterClose' | 'shouldReturnFocusAfterClose'
>;

type ContentProps = { top: string };

const contentStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  width: 100%;
  height: 100%;

  ${theme.mq.mega} {
    padding-left: 0;
  }
`;

const contentTopStyles = ({ top }: ContentProps) =>
  top !== '0px' &&
  css`
    padding-top: 0;
  `;

const Content = styled.div(contentStyles, contentTopStyles);

const bodyStyles = ({ theme }: StyleProps) => css`
  width: 100%;
  max-width: ${BODY_MAX_WIDTH}px;
  padding: 0 ${theme.spacings.mega};

  ${theme.mq.mega} {
    padding: 0 ${theme.spacings.giga};
  }
`;

const Body = styled.div(bodyStyles);

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
  top,
  ...props
}: SidePanelProps): JSX.Element => {
  if (
    process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!closeButtonLabel) {
      throw new Error(
        'The side panel is missing a `closeButtonLabel` prop. This is an accessibility requirement.',
      );
    }
    if (onBack && !backButtonLabel) {
      throw new Error(
        'The side panel is missing a `backButtonLabel` prop. This is an accessibility requirement.',
      );
    }
  }

  const [isHeaderSticky, setHeaderSticky] = useState(false);

  useEffect(() => {
    setHeaderSticky(false);
  }, [isMobile]);

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    setHeaderSticky(event.currentTarget.scrollTop > 0);
  };

  const defaultProps = {
    bodyOpenClassName: BODY_OPEN_CLASS_NAME,
    htmlOpenClassName: HTML_OPEN_CLASS_NAME,
    onRequestClose: onBack || onClose,
    portalClassName: PORTAL_CLASS_NAME,
  };

  const content = (
    <Content top={top} onScroll={handleScroll}>
      <Header
        backButtonLabel={backButtonLabel}
        closeButtonLabel={closeButtonLabel}
        headline={headline}
        onBack={onBack}
        onClose={onClose}
        isSticky={isHeaderSticky}
      />
      <Body>
        {isFunction(children) ? children({ onBack, onClose }) : children}
      </Body>
    </Content>
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
      top={top}
    >
      {content}
    </DesktopSidePanel>
  );
};
