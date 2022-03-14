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
  useRef,
} from 'react';
import { css, useTheme } from '@emotion/react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { useClickTrigger } from '@sumup/collector';

import styled from '../../styles/styled';
import { useMedia } from '../../hooks/useMedia';
import { useStack, StackItem } from '../../hooks/useStack';
import { Require } from '../../types/util';
import { warn } from '../../util/logger';
import { TOP_NAVIGATION_HEIGHT } from '../TopNavigation/TopNavigation';

import {
  SidePanel,
  SidePanelProps,
  SIDE_PANEL_WIDTH,
  TRANSITION_DURATION_DESKTOP,
  TRANSITION_DURATION_MOBILE,
} from './SidePanel';
import { SidePanelHookProps } from './useSidePanel';

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

export type SidePanelContextProps = Require<SidePanelHookProps, 'group'>;

export type SetSidePanel = (
  sidePanel: SidePanelContextProps & Pick<StackItem, 'id'>,
) => void;

export type UpdateSidePanel = (
  sidePanel: Partial<SidePanelContextProps> &
    Pick<Required<SidePanelContextProps>, 'group'>,
) => void;

export type RemoveSidePanel = (
  group: SidePanelContextProps['group'],
  isInstantClose?: boolean,
) => Promise<void | void[]>;

type SidePanelContextItem = SidePanelContextProps &
  Pick<SidePanelProps, 'isInstantOpen'> &
  Pick<
    ReactModalProps,
    'closeTimeoutMS' | 'onAfterClose' | 'shouldReturnFocusAfterClose'
  > &
  StackItem;

export type SidePanelContextValue = {
  setSidePanel: SetSidePanel;
  updateSidePanel: UpdateSidePanel;
  removeSidePanel: RemoveSidePanel;
  isPrimaryContentResized: boolean;
  transitionDuration: number;
};

export const SidePanelContext = createContext<SidePanelContextValue>({
  setSidePanel: () => {},
  updateSidePanel: () => {},
  removeSidePanel: () => Promise.resolve(),
  isPrimaryContentResized: false,
  transitionDuration: TRANSITION_DURATION_MOBILE,
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

type PrimaryContentProps = { isResized: boolean; transitionDuration: number };

const primaryContentStyles = ({
  transitionDuration,
}: PrimaryContentProps) => css`
  width: 100%;
  transition: width ${transitionDuration}ms ease-in-out;
`;

const primaryContentResizedStyles = ({ isResized }: PrimaryContentProps) =>
  isResized &&
  css`
    width: calc(100% - ${SIDE_PANEL_WIDTH});
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
  const [sidePanels, dispatch] = useStack<SidePanelContextItem>();
  const sendEvent = useClickTrigger();
  const [sidePanelTop, setSidePanelTop] = useState(
    withTopNavigation ? TOP_NAVIGATION_HEIGHT : '0px',
  );
  const [isPrimaryContentResized, setIsPrimaryContentResized] = useState(false);

  // Keep an up-to-date sidePanels ref to lower the number of updates of the context value
  const sidePanelsRef = useRef(sidePanels);
  sidePanelsRef.current = sidePanels;

  const transitionDuration = isMobile
    ? TRANSITION_DURATION_MOBILE
    : TRANSITION_DURATION_DESKTOP;

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
    handleScroll();

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

  const findSidePanel = useCallback(
    (group: SidePanelContextProps['group']) =>
      sidePanelsRef.current.find(
        (panel) => panel.group === group && !panel.transition,
      ),
    [],
  );

  const removeSidePanel = useCallback<RemoveSidePanel>(
    (group, isInstantClose) => {
      const panel = findSidePanel(group);

      if (!panel) {
        return Promise.resolve();
      }

      const sidePanelIndex = sidePanelsRef.current.indexOf(panel);

      if (!isInstantClose) {
        setIsPrimaryContentResized(sidePanelIndex !== 0);
      }

      // Remove the side panel and all panels above it in reverse order
      return Promise.all(
        sidePanelsRef.current
          .slice(sidePanelIndex)
          .reverse()
          .map(
            (sidePanel) =>
              new Promise<void>((res) => {
                sendTrackingEvent(sidePanel, 'close');

                if (sidePanel.onClose) {
                  sidePanel.onClose();
                }

                let updatedPanel = { ...sidePanel, onAfterClose: res };
                if (isInstantClose) {
                  updatedPanel = {
                    ...updatedPanel,
                    shouldReturnFocusAfterClose: false,
                    closeTimeoutMS: 0,
                  };
                }

                dispatch({
                  type: 'update',
                  item: updatedPanel,
                });
                dispatch({
                  type: 'remove',
                  id: sidePanel.id,
                  transition: {
                    duration: isInstantClose ? 0 : transitionDuration,
                  },
                });
              }),
          ),
      );
    },
    [findSidePanel, sendTrackingEvent, dispatch, transitionDuration],
  );

  const setSidePanel = useCallback<SetSidePanel>(
    (sidePanel) => {
      const panel = findSidePanel(sidePanel.group);

      const pushPanel = (isInstantOpen: boolean) => {
        setIsPrimaryContentResized(true);
        sendTrackingEvent(sidePanel, 'open');
        dispatch({
          type: 'push',
          item: { ...sidePanel, isInstantOpen },
        });
      };

      if (panel) {
        removeSidePanel(panel.group, true)
          .then(() => pushPanel(true))
          .catch(() => {});
      } else {
        pushPanel(false);
      }
    },
    [findSidePanel, sendTrackingEvent, dispatch, removeSidePanel],
  );

  const updateSidePanel = useCallback<UpdateSidePanel>(
    (sidePanel) => {
      const panel = findSidePanel(sidePanel.group);

      if (panel) {
        dispatch({
          type: 'update',
          item: { ...sidePanel, id: panel.id },
        });
      }
    },
    [findSidePanel, dispatch],
  );

  const context = useMemo(
    () => ({
      setSidePanel,
      updateSidePanel,
      removeSidePanel,
      isPrimaryContentResized: !isMobile && isPrimaryContentResized,
      transitionDuration,
    }),
    [
      setSidePanel,
      updateSidePanel,
      removeSidePanel,
      isMobile,
      isPrimaryContentResized,
      transitionDuration,
    ],
  );

  return (
    <SidePanelContext.Provider value={context}>
      <PrimaryContent
        isResized={!isMobile && isPrimaryContentResized}
        transitionDuration={transitionDuration}
      >
        {children}
      </PrimaryContent>

      {sidePanels.map((sidePanel) => {
        const { group, id, transition, ...sidePanelProps } = sidePanel;

        const isBottomPanelClosing = !!sidePanels[0].transition;
        const isStacked = group !== sidePanels[0].group;
        const handleClose = () => removeSidePanel(sidePanels[0].group);
        const handleBack = isStacked ? () => removeSidePanel(group) : undefined;

        return (
          <SidePanel
            {...sidePanelProps}
            key={id}
            isBottomPanelClosing={isBottomPanelClosing}
            isMobile={isMobile}
            isOpen={!transition}
            isStacked={isStacked}
            onBack={handleBack}
            onClose={handleClose}
            top={sidePanelTop}
          />
        );
      })}
    </SidePanelContext.Provider>
  );
};
