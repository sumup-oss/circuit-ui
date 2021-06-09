/**
 * Copyright 2019, SumUp Ltd.
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

import { FC, MouseEvent, KeyboardEvent, ReactNode } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { ClassNames } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '@sumup/design-tokens';
import { Dispatch as TrackingProps } from '@sumup/collector';

import { isFunction } from '../../util/type-check';
import { useClickHandler } from '../../hooks/useClickHandler';

type OnClose = (event?: MouseEvent | KeyboardEvent) => void;

export interface ModalProps extends Omit<ReactModalProps, 'isOpen'> {
  children: ReactNode | (({ onClose }: { onClose?: OnClose }) => ReactNode);
  /**
   * Function to close the modal. Passed down to the children render prop.
   */
  onClose?: OnClose;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

export const TRANSITION_DURATION = 200;

const TOP_MARGIN = '10vh';
const TRANSFORM_Y_FLOATING = '10vh';
const FLOATING_TRANSITION = `${TRANSITION_DURATION}ms ease-in-out`;
// eslint-disable-next-line max-len
const FIXED_TRANSITION = `${TRANSITION_DURATION}ms cubic-bezier(0, 0.37, 0.64, 1)`;

/**
 * Circuit UI's wrapper component for ReactModal. Uses the Card component
 * to wrap content passed as the children prop. Don't forget to set
 * the aria prop when using this.
 * http://reactcommunity.org/react-modal/accessibility/#aria
 */
export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  contentLabel = 'Modal',
  tracking = {},
  ...props
}) => {
  const theme: Theme = useTheme();
  const handleClose =
    useClickHandler(onClose, tracking, 'modal-close') || onClose;
  return (
    <ClassNames>
      {({ css }) => {
        // React Modal styles
        // https://reactcommunity.org/react-modal/styles/classes/

        const className = {
          base: css`
            label: modal;
            outline: none;

            ${theme.mq.untilKilo} {
              bottom: 0;
              max-height: 80vh;
              -webkit-overflow-scrolling: touch;
              overflow-y: auto;
              position: fixed;
              transform: translateY(100%);
              transition: transform ${FIXED_TRANSITION};
              width: 100%;
              width: 100vw;
            }

            ${theme.mq.kilo} {
              transition: transform ${FLOATING_TRANSITION},
                opacity ${FLOATING_TRANSITION};
              margin: ${TOP_MARGIN} auto auto;
              max-height: 90vh;
              max-width: 90%;
              min-width: 450px;
              opacity: 0;
              position: relative;
              transform: translateY(${TRANSFORM_Y_FLOATING});
            }

            ${theme.mq.mega} {
              max-width: 720px;
            }

            ${theme.mq.giga} {
              max-width: 800px;
            }
          `,
          afterOpen: css`
            label: modal--after-open;
            ${theme.mq.untilKilo} {
              transform: translateY(0);
            }

            ${theme.mq.kilo} {
              opacity: 1;
              transform: translateY(0);
            }
          `,
          beforeClose: css`
            label: modal--before-close;
            ${theme.mq.untilKilo} {
              transform: translateY(100%);
            }

            ${theme.mq.kilo} {
              opacity: 0;
              transform: translateY(${TRANSFORM_Y_FLOATING});
            }
          `,
        };

        const overlayClassName = {
          base: css`
            label: modal__overlay;
            background: ${theme.colors.overlay};
            bottom: 0;
            left: 0;
            opacity: 0;
            position: fixed;
            right: 0;
            top: 0;
            transition: opacity 200ms ease-in-out;
            z-index: ${theme.zIndex.modal};

            ${theme.mq.kilo} {
              -webkit-overflow-scrolling: touch;
              overflow-y: auto;
            }
          `,
          afterOpen: css`
            label: modal__overlay--after-open;
            opacity: 1;
          `,
          beforeClose: css`
            label: modal__overlay--before-close;
            opacity: 0;
          `,
        };

        const reactModalProps = {
          isOpen: true,
          className,
          overlayClassName,
          contentLabel,
          onRequestClose: handleClose,
          closeTimeoutMS: TRANSITION_DURATION,
          ...props,
        };

        return (
          <ReactModal {...reactModalProps}>
            {isFunction(children)
              ? children({
                  onClose: handleClose,
                })
              : children}
          </ReactModal>
        );
      }}
    </ClassNames>
  );
};
