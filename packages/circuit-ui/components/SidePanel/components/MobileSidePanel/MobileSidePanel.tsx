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

type MobileSidePanelProps = Omit<
  SidePanelProps,
  'backButtonLabel' | 'closeButtonLabel' | 'headline' | 'isMobile' | 'top'
>;

const contentStyles = ({ theme }: StyleProps) => css`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${theme.spacings.mega};
  padding: calc(env(safe-area-inset-top) + ${theme.spacings.mega})
    calc(env(safe-area-inset-right) + ${theme.spacings.mega})
    calc(env(safe-area-inset-bottom) + ${theme.spacings.mega})
    calc(env(safe-area-inset-left) + ${theme.spacings.mega});
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div(contentStyles);

export const MobileSidePanel = ({
  children,
  isOpen,
  onClose,
}: MobileSidePanelProps): JSX.Element => (
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
            transform: translateY(100%);
            transition: transform ${TRANSITION_DURATION}ms ease-in-out;
          `,
        ),
        afterOpen: cssString`
          transform: translateY(0);
        `,
        beforeClose: cssString`
          transform: translateY(100%);
        `,
      };

      const reactModalProps: ReactModalProps = {
        bodyOpenClassName: BODY_OPEN_CLASS_NAME,
        className: styles,
        closeTimeoutMS: TRANSITION_DURATION,
        htmlOpenClassName: HTML_OPEN_CLASS_NAME,
        isOpen,
        onRequestClose: onClose,
        portalClassName: PORTAL_CLASS_NAME,
      };

      return (
        <StackContext.Provider value={theme.zIndex.modal}>
          <ReactModal {...reactModalProps}>
            <Content>{children}</Content>
          </ReactModal>
          <Global
            styles={css`
              /* Remove scroll on the body when react-modal is open */
              .${HTML_OPEN_CLASS_NAME} {
                height: 100%;
                overflow-y: hidden;
                -webkit-overflow-scrolling: auto;
              }
              /* Enable keyboard navigation inside the modal, see https://github.com/reactjs/react-modal/issues/782 */
              .${PORTAL_CLASS_NAME} {
                position: absolute;
                height: 100%;
                width: 100%;
                z-index: ${theme.zIndex.modal};
              }
            `}
          />
        </StackContext.Provider>
      );
    }}
  </ClassNames>
);
