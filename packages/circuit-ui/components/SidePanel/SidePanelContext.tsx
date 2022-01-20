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
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import { css, useTheme } from '@emotion/react';
import ReactModal from 'react-modal';
import { useClickTrigger } from '@sumup/collector';

import styled from '../../styles/styled';
import { useMedia } from '../../hooks/useMedia';
import { TrackingProps } from '../../hooks/useClickEvent';
import { useStack, StackItem } from '../../hooks/useStack';
import { warn } from '../../util/logger';

import { SidePanel, SidePanelProps, TRANSITION_DURATION } from './SidePanel';
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

export type SidePanelContextProps = Omit<
  SidePanelProps,
  'isOpen' | 'isMobile' | 'onClose'
> & {
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onClose?: () => void;
};

type SidePanelContextItem = SidePanelContextProps & StackItem;

export type SidePanelContextValue = {
  setSidePanel: (sidePanel: SidePanelContextItem) => void;
  removeSidePanel: (sidePanel: SidePanelContextItem) => void;
};

export const SidePanelContext = createContext<SidePanelContextValue>({
  setSidePanel: () => {},
  removeSidePanel: () => {},
});

export interface SidePanelProviderProps {
  /**
   * The SidePanelProvider should wrap your entire primary content,
   * which will be shrunk when the side panel is opened.
   */
  children: ReactNode;
}

const primaryContentStyles = () => css`
  width: 100%;
  transition: width ${TRANSITION_DURATION}ms ease-in-out;
`;

const primaryContentCondensedStyles = ({ condensed }: { condensed: boolean }) =>
  condensed &&
  css`
    width: calc(100% - ${SIDE_PANEL_DESKTOP_WIDTH}px);
  `;

const PrimaryContent = styled.div(
  primaryContentStyles,
  primaryContentCondensedStyles,
);

export const SidePanelProvider = ({
  children,
}: SidePanelProviderProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMedia(theme.breakpoints.untilMega);
  const sendEvent = useClickTrigger();
  const [sidePanels, dispatch] = useStack<SidePanelContextItem>();

  const setSidePanel = useCallback(
    (sidePanel: SidePanelContextItem) => {
      if (sidePanel.tracking && sidePanel.tracking.label) {
        sendEvent({
          component: 'side-panel',
          ...sidePanel.tracking,
          label: `${sidePanel.tracking.label}|open`,
        });
      }
      // TODO: check sidePanel.level and replace side panels if necessary
      dispatch({ type: 'push', item: sidePanel });
    },
    [dispatch, sendEvent],
  );

  const removeSidePanel = useCallback(
    (sidePanel: SidePanelContextItem) => {
      if (sidePanel.tracking && sidePanel.tracking.label) {
        sendEvent({
          component: 'side-panel',
          ...sidePanel.tracking,
          label: `${sidePanel.tracking.label}|close`,
        });
      }
      if (sidePanel.onClose) {
        sidePanel.onClose();
      }
      dispatch({
        type: 'remove',
        id: sidePanel.id,
        transition: {
          duration: TRANSITION_DURATION,
        },
      });
    },
    [dispatch, sendEvent],
  );

  const activeSidePanel = sidePanels[sidePanels.length - 1];

  useEffect(() => {
    if (!activeSidePanel) {
      return undefined;
    }

    // TODO: remove all side panels
    const popSidePanel = () => {
      removeSidePanel(activeSidePanel);
    };

    window.addEventListener('popstate', popSidePanel);

    return () => {
      window.removeEventListener('popstate', popSidePanel);
    };
  }, [activeSidePanel, removeSidePanel]);

  const context = useMemo(
    () => ({ setSidePanel, removeSidePanel }),
    [setSidePanel, removeSidePanel],
  );

  const isPrimaryContentCondensed =
    !isMobile && sidePanels[0] && !sidePanels[0].transition;

  // TODO: side panel offset
  return (
    <SidePanelContext.Provider value={context}>
      <PrimaryContent condensed={isPrimaryContentCondensed}>
        {children}
      </PrimaryContent>

      {sidePanels.map((sidePanel) => {
        const { id, transition, tracking, ...sidePanelProps } = sidePanel;
        return (
          <SidePanel
            {...sidePanelProps}
            key={id}
            isMobile={isMobile}
            isOpen={!transition}
            onClose={() => removeSidePanel(sidePanel)}
          />
        );
      })}
    </SidePanelContext.Provider>
  );
};
