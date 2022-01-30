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

import { css, ClassNames, Global } from '@emotion/react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import styled, { StyleProps } from '../../../../styles/styled';
import { StackContext } from '../../../StackContext';
import { SidePanelProps, TRANSITION_DURATION } from '../../SidePanel';

const BODY_OPEN_CLASS_NAME = 'ReactModal__SidePanel__Body--open';
const HTML_OPEN_CLASS_NAME = 'ReactModal__SidePanel__Html--open';
const PORTAL_CLASS_NAME = 'ReactModalPortal__SidePanel';
export const SIDE_PANEL_DESKTOP_WIDTH = 400;

type DesktopSidePanelProps = Omit<
  SidePanelProps,
  'backButtonLabel' | 'closeButtonLabel' | 'headline' | 'isMobile'
>;

type ContentProps = { top: string };

const contentStyles = ({ theme }: StyleProps) => css`
  overflow-y: auto;
  padding: ${theme.spacings.giga};
  padding: calc(env(safe-area-inset-top) + ${theme.spacings.giga})
    calc(env(safe-area-inset-right) + ${theme.spacings.giga})
    calc(env(safe-area-inset-bottom) + ${theme.spacings.giga})
    ${theme.spacings.giga};
  width: ${SIDE_PANEL_DESKTOP_WIDTH}px;
  height: 100%;
`;

const contentTopStyles = ({ theme, top }: StyleProps & ContentProps) =>
  top !== '0px' &&
  css`
    padding-top: ${theme.spacings.giga};
  `;

const Content = styled.div(contentStyles, contentTopStyles);

export const DesktopSidePanel = ({
  children,
  isOpen,
  onBack,
  onClose,
  top,
  ...props
}: DesktopSidePanelProps): JSX.Element => (
  <ClassNames>
    {({ css: cssString, cx, theme }) => {
      // React Modal styles
      // https://reactcommunity.org/react-modal/styles/classes/

      const styles = {
        base: cx(
          cssString`
            height: 100%;
            outline: none;
            background-color: ${theme.colors.white};
            box-shadow: inset ${theme.borderWidth.kilo} 0px 0px ${theme.colors.n300};
            transform: translateX(100%);
            transition: transform ${TRANSITION_DURATION}ms ease-in-out;
          `,
        ),
        afterOpen: cssString`
          transform: translateX(0);
        `,
        beforeClose: cssString`
          transform: translateX(100%);
        `,
      };

      const overlayStyles = cssString`
        height: 100%;
      `;

      const reactModalProps: ReactModalProps = {
        aria: {
          modal: false,
        },
        ariaHideApp: false,
        bodyOpenClassName: BODY_OPEN_CLASS_NAME,
        className: styles,
        closeTimeoutMS: TRANSITION_DURATION,
        htmlOpenClassName: HTML_OPEN_CLASS_NAME,
        isOpen,
        onRequestClose: onClose,
        overlayClassName: overlayStyles,
        portalClassName: PORTAL_CLASS_NAME,
        shouldCloseOnOverlayClick: false,
        ...props,
      };

      return (
        <StackContext.Provider value={theme.zIndex.modal}>
          <ReactModal {...reactModalProps}>
            <Content top={top}>{children}</Content>
          </ReactModal>
          <Global
            styles={css`
              /* Enable keyboard navigation inside the modal, see https://github.com/reactjs/react-modal/issues/782 */
              .${PORTAL_CLASS_NAME} {
                position: fixed;
                top: ${top};
                right: 0;
                bottom: 0;
                width: ${SIDE_PANEL_DESKTOP_WIDTH}px;
                z-index: ${theme.zIndex.absolute};
              }
            `}
          />
        </StackContext.Provider>
      );
    }}
  </ClassNames>
);
