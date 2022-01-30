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

import {
  createContext,
  useCallback,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { css, useTheme } from '@emotion/react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { useClickTrigger } from '@sumup/collector';

import styled from '../../styles/styled';
import { useMedia } from '../../hooks/useMedia';
import { TrackingProps } from '../../hooks/useClickEvent';
import { useStack, StackItem } from '../../hooks/useStack';
import { warn } from '../../util/logger';
import { TOP_NAVIGATION_HEIGHT } from '../TopNavigation/TopNavigation'; // TODO: OK to reference another component?

import {
  CloseCallback,
  SidePanel,
  SidePanelProps,
  TRANSITION_DURATION,
} from './SidePanel';
import { SIDE_PANEL_DESKTOP_WIDTH } from './components/DesktopSidePanel';

// It is important for users of screen readers that other page content be hidden
// (via the `aria-hidden` attribute) while the side panel is open on mobile.
// To allow react-modal to do this, Circuit UI calls `ReactModal.setAppElement`
// with a query selector identifying the root of the app.
// http://reactcommunity.org/react-modal/accessibility/#app-element
if (typeof window !== 'undefined') {
  // These are the default app elements in Next.js and CRA.
  const appElement =
    document.getElementById('__next') || document.getElementById('root');

  if (appElement) {
    ReactModal.setAppElement(appElement);
  } else if (
    process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    warn(
      'SidePanelProvider',
      'Could not find the app root element to hide it when a side panel is open.',
      'Add an element with the id `#root` at the root of your application.',
    );
  }
}

export type SidePanelContextProps = Pick<
  SidePanelProps,
  'backButtonLabel' | 'children' | 'closeButtonLabel' | 'headline'
> & {
  /**
   * The type of the side panel. Opening a second side panel with
   * the same `type` will replace the content and close all side panels
   * stacked on top of it. Only panels of different type stack one on top of the other.
   */
  type?: string; // TODO: should be required for context methods and optional for hook
  /**
   * Callback function that is called when the side panel is closed.
   */
  onClose?: CloseCallback;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
};

export type SidePanelContextPropsPartial = Partial<SidePanelContextProps>;

type SidePanelContextItem = SidePanelContextProps &
  StackItem &
  Pick<ReactModalProps, 'shouldReturnFocusAfterClose' | 'closeTimeoutMS'>;

export type SidePanelContextValue = {
  setSidePanel: (
    sidePanel: SidePanelContextProps & Pick<StackItem, 'id'>,
  ) => void;
  updateSidePanel: (sidePanel: SidePanelContextPropsPartial) => void;
  removeSidePanel: (
    type: SidePanelContextProps['type'],
    shouldReturnFocusAfterClose?: boolean,
  ) => void;
};

export const SidePanelContext = createContext<SidePanelContextValue>({
  setSidePanel: () => {},
  updateSidePanel: () => {},
  removeSidePanel: () => {},
});

export interface SidePanelProviderProps {
  /**
   * The SidePanelProvider should wrap your entire primary content,
   * which will be resized when the side panel is opened.
   */
  children: ReactNode;
  /**
   * Indicates whether the top navigation is used and the side panel
   * should be rendered below it. Defaults to `false`.
   */
  withTopNavigation?: boolean;
}

const primaryContentStyles = () => css`
  width: 100%;
  transition: width ${TRANSITION_DURATION}ms ease-in-out;
`;

const primaryContentResizedStyles = ({ isResized }: { isResized: boolean }) =>
  isResized &&
  css`
    width: calc(100% - ${SIDE_PANEL_DESKTOP_WIDTH}px);
  `;

const PrimaryContent = styled.div(
  primaryContentStyles,
  primaryContentResizedStyles,
);

export const SidePanelProvider = ({
  children,
  withTopNavigation = false,
}: SidePanelProviderProps): JSX.Element => {
  const theme = useTheme();
  const isTopNavigationSticky = useMedia(theme.breakpoints.giga);
  const isMobile = useMedia(theme.breakpoints.untilMega);
  const sendEvent = useClickTrigger();
  const [sidePanels, dispatch] = useStack<SidePanelContextItem>();
  const [sidePanelTop, setSidePanelTop] = useState(
    withTopNavigation ? TOP_NAVIGATION_HEIGHT : '0px',
  );

  // Calculate side panel top offset
  useEffect(() => {
    if (!withTopNavigation || isMobile) {
      setSidePanelTop('0px');
      return () => {};
    }

    if (isTopNavigationSticky) {
      setSidePanelTop(TOP_NAVIGATION_HEIGHT);
      return () => {};
    }

    // Figure in the vertical scroll position when the top navigation is not sticky
    const topNavigationHeight = parseInt(TOP_NAVIGATION_HEIGHT, 10);
    const handleScroll = () => {
      const top = Math.max(topNavigationHeight - window.scrollY, 0);
      setSidePanelTop(`${top}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [withTopNavigation, isTopNavigationSticky, isMobile]);

  const sendTrackingEvent = useCallback(
    (sidePanel: SidePanelContextProps, eventType: string) => {
      if (sidePanel.tracking && sidePanel.tracking.label) {
        sendEvent({
          component: 'side-panel',
          ...sidePanel.tracking,
          label: `${sidePanel.tracking.label}|${eventType}`,
        });
      }
    },
    [sendEvent],
  );

  type RemoveSidePanel = (
    type: SidePanelContextProps['type'],
    shouldReturnFocusAfterClose?: boolean,
  ) => void;

  const removeSidePanel = useCallback<RemoveSidePanel>(
    (type, shouldReturnFocusAfterClose = true) => {
      const sidePanel = sidePanels.find(
        (panel) => panel.type === type && !panel.transition,
      );

      if (!sidePanel) {
        return;
      }

      const sidePanelIndex = sidePanels.indexOf(sidePanel);

      // Remove the side panel and all panels above it in reverse order
      sidePanels
        .slice(sidePanelIndex)
        .reverse()
        .forEach((panel) => {
          sendTrackingEvent(panel, 'close'); // TODO: should we send the tracking event for all panels

          if (panel.onClose) {
            panel.onClose();
          }

          if (shouldReturnFocusAfterClose === false) {
            dispatch({
              type: 'update',
              item: {
                ...panel,
                shouldReturnFocusAfterClose,
                closeTimeoutMS: 0,
              },
            });
          }

          dispatch({
            type: 'remove',
            id: panel.id,
            transition:
              shouldReturnFocusAfterClose === false
                ? undefined
                : {
                    duration: TRANSITION_DURATION,
                  },
          });
        });
    },
    [sidePanels, sendTrackingEvent, dispatch],
  );

  const setSidePanel = useCallback(
    (sidePanel: SidePanelContextProps & Pick<StackItem, 'id'>) => {
      const existingPanel = sidePanels.find(
        (panel) => panel.type === sidePanel.type && !panel.transition,
      );

      if (existingPanel) {
        // const existingPanelIndex = sidePanels.indexOf(existingPanel);
        // if (existingPanelIndex !== sidePanels.length - 1) {
        //   // Remove all side panels after the existing one
        //   removeSidePanel(sidePanels[existingPanelIndex + 1].id);
        // }
        removeSidePanel(existingPanel.type, false);

        // sendTrackingEvent(sidePanel, 'update'); // TODO: update or open event?
        // dispatch({ type: 'update', item: sidePanel });
        // return;
      }

      sendTrackingEvent(sidePanel, 'open');
      // TODO: Setup instant cleanup
      setTimeout(() =>
        dispatch({
          type: 'push',
          item: {
            ...sidePanel,
            shouldReturnFocusAfterClose: true, // TODO: setup non-animated open ?
          },
        }),
      );
    },
    [sidePanels, removeSidePanel, sendTrackingEvent, dispatch],
  );

  const updateSidePanel = useCallback(
    (sidePanel: SidePanelContextPropsPartial) => {
      const existingPanel = sidePanels.find(
        (panel) => panel.type === sidePanel.type && !panel.transition,
      );

      if (existingPanel) {
        dispatch({
          type: 'update',
          item: { ...sidePanel, id: existingPanel.id },
        });
      }
    },
    [sidePanels, dispatch],
  );

  const context = useMemo(
    () => ({ setSidePanel, updateSidePanel, removeSidePanel }),
    [setSidePanel, updateSidePanel, removeSidePanel],
  );

  const isPrimaryContentResized =
    !isMobile && sidePanels.some((sidePanel) => !sidePanel.transition);

  return (
    <SidePanelContext.Provider value={context}>
      <PrimaryContent isResized={isPrimaryContentResized}>
        {children}
      </PrimaryContent>

      {sidePanels.map((sidePanel) => {
        const { id, transition, ...sidePanelProps } = sidePanel;
        return (
          <SidePanel
            {...sidePanelProps}
            key={id}
            isMobile={isMobile}
            isOpen={!transition}
            onBack={() => removeSidePanel(sidePanel.type)}
            onClose={() => removeSidePanel(sidePanels[0].type)}
            top={sidePanelTop}
          />
        );
      })}
    </SidePanelContext.Provider>
  );
};
