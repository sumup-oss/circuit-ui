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

import { StackContext } from '../../../StackContext';
import {
  SidePanelProps,
  DESKTOP_WIDTH,
  PORTAL_CLASS_NAME,
  TRANSITION_DURATION_DESKTOP,
} from '../../SidePanel';

type DesktopSidePanelProps = ReactModalProps &
  Pick<SidePanelProps, 'isInstantOpen' | 'top'>;

export const DesktopSidePanel = ({
  children,
  isInstantOpen,
  top,
  ...props
}: DesktopSidePanelProps): JSX.Element => (
  <ClassNames>
    {({ css: cssString, cx, theme }) => {
      // React Modal styles
      // https://reactcommunity.org/react-modal/styles/classes/
      const styles = {
        base: cssString`
          height: 100%;
          outline: none;
          background-color: ${theme.colors.white};
          box-shadow: inset ${theme.borderWidth.kilo} 0px 0px ${theme.colors.n300};
          transform: translateX(100%);
          transition: transform ${TRANSITION_DURATION_DESKTOP}ms ease-in-out;
        `,
        afterOpen: cx(
          cssString`
            transform: translateX(0);
          `,
          isInstantOpen &&
            cssString`
              transition: none;
            `,
        ),
        beforeClose: cssString`
          transform: translateX(100%) !important;
          transition: transform ${TRANSITION_DURATION_DESKTOP}ms ease-in-out !important;
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
        className: styles,
        overlayClassName: overlayStyles,
        shouldCloseOnOverlayClick: false,
        closeTimeoutMS: TRANSITION_DURATION_DESKTOP,
        ...props,
      };

      return (
        <StackContext.Provider value={theme.zIndex.modal}>
          <ReactModal {...reactModalProps}>{children}</ReactModal>
          <Global
            styles={css`
              /* Enable keyboard navigation inside the modal, see https://github.com/reactjs/react-modal/issues/782 */
              .${PORTAL_CLASS_NAME} {
                position: fixed;
                top: ${top};
                right: 0;
                bottom: 0;
                width: ${DESKTOP_WIDTH}px;
                z-index: ${theme.zIndex.absolute};
              }
            `}
          />
        </StackContext.Provider>
      );
    }}
  </ClassNames>
);
