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

import { UIEventHandler, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { Props as ReactModalProps } from 'react-modal';

import styled, { StyleProps } from '../../styles/styled';
import { isFunction } from '../../util/type-check';
import { uniqueId } from '../../util/id';

import { MobileSidePanel } from './components/MobileSidePanel';
import { DesktopSidePanel } from './components/DesktopSidePanel';
import { Header } from './components/Header';
import { SidePanelHookProps, Callback } from './useSidePanel';

const BODY_OPEN_CLASS_NAME = 'ReactModal__SidePanel__Body--open';
export const HTML_OPEN_CLASS_NAME = 'ReactModal__SidePanel__Html--open';
export const PORTAL_CLASS_NAME = 'ReactModalPortal__SidePanel';
export const TRANSITION_DURATION_DESKTOP = 200;
export const TRANSITION_DURATION_MOBILE = 240;
export const DESKTOP_WIDTH = 400;
export const BODY_MAX_WIDTH = 480;

export type SidePanelProps = ReactModalProps &
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
    onBack?: Callback;
    /**
     * Callback function that is called when the side panel is closed.
     */
    onClose: Callback;
    /**
     * The top offset in 'px' applied to the side panel in desktop mode.
     */
    top: string;
  };

type ContentContainerProps = { top: string };

const contentContainerStyles = ({ theme }: StyleProps) => css`
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

const contentContainerTopStyles = ({ top }: ContentContainerProps) =>
  top !== '0px' &&
  css`
    padding-top: 0;
  `;

const ContentContainer = styled.div(
  contentContainerStyles,
  contentContainerTopStyles,
);

const contentStyles = ({ theme }: StyleProps) => css`
  width: 100%;
  max-width: ${BODY_MAX_WIDTH}px;
  padding: 0 ${theme.spacings.mega};

  ${theme.mq.mega} {
    padding: 0 ${theme.spacings.giga};
  }
`;

const Content = styled.div(contentStyles);

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
  const headerAriaId = useMemo(() => uniqueId('side-panel-header_'), []);

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
    bodyOpenClassName: BODY_OPEN_CLASS_NAME,
    htmlOpenClassName: HTML_OPEN_CLASS_NAME,
    onRequestClose: onBack || onClose,
    portalClassName: PORTAL_CLASS_NAME,
  };

  const content = (
    <ContentContainer top={top} onScroll={handleScroll}>
      <Header
        backButtonLabel={backButtonLabel}
        closeButtonLabel={closeButtonLabel}
        headline={headline}
        id={headerAriaId}
        onBack={onBack}
        onClose={onClose}
        isSticky={isHeaderSticky}
      />
      <Content>
        {isFunction(children) ? children({ onBack, onClose }) : children}
      </Content>
    </ContentContainer>
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
