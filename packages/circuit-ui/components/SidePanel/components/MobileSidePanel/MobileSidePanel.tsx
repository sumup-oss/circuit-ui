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
  HTML_OPEN_CLASS_NAME,
  PORTAL_CLASS_NAME,
  TRANSITION_DURATION_MOBILE,
} from '../../SidePanel';

type MobileSidePanelProps = ReactModalProps &
  Pick<SidePanelProps, 'isBottomPanelClosing' | 'isStacked'>;

export const MobileSidePanel = ({
  children,
  isBottomPanelClosing,
  isStacked,
  ...props
}: MobileSidePanelProps): JSX.Element => (
  <ClassNames>
    {({ css: cssString, theme }) => {
      // React Modal styles
      // https://reactcommunity.org/react-modal/styles/classes/
      const translate =
        isStacked && !isBottomPanelClosing ? 'translateX' : 'translateY';
      const styles = {
        base: cssString`
          height: 100%;
          outline: none;
          background-color: ${theme.colors.white};
          transform: ${translate}(100%);
          transition: transform ${TRANSITION_DURATION_MOBILE}ms ease-in-out;
        `,
        afterOpen: cssString`
          transform: ${translate}(0) !important;
        `,
        beforeClose: cssString`
          transform: ${translate}(100%) !important;
        `,
      };

      const overlayStyles = {
        base: cssString`
          position: fixed;
          inset: 0;
          opacity: 0;
          transition: opacity ${TRANSITION_DURATION_MOBILE}ms ease-in-out;
          background: ${theme.colors.overlay};
      `,
        afterOpen: cssString`
          opacity: 1;
      `,
        beforeClose: cssString`
          opacity: 0;
      `,
      };

      const reactModalProps: ReactModalProps = {
        className: styles,
        overlayClassName: overlayStyles,
        closeTimeoutMS: TRANSITION_DURATION_MOBILE,
        ...props,
      };

      return (
        <StackContext.Provider value={theme.zIndex.modal}>
          <ReactModal {...reactModalProps}>{children}</ReactModal>
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
                position: fixed;
                inset: 0;
                z-index: ${theme.zIndex.modal};
              }
            `}
          />
        </StackContext.Provider>
      );
    }}
  </ClassNames>
);
