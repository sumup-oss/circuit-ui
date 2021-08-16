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

import { ReactNode } from 'react';
import { css, ClassNames } from '@emotion/core';
import ReactModal from 'react-modal';
import { Theme } from '@sumup/design-tokens';

import { isFunction } from '../../util/type-check';
import {
  ModalComponent,
  BaseModalProps,
  createUseModal,
} from '../ModalContext';
import CloseButton from '../CloseButton';
import { StackContext } from '../StackContext';
import styled, { StyleProps } from '../../styles/styled';

const TRANSITION_DURATION_MOBILE = 120;
const TRANSITION_DURATION_DESKTOP = 240;
const TRANSITION_DURATION = Math.max(
  TRANSITION_DURATION_MOBILE,
  TRANSITION_DURATION_DESKTOP,
);

type PreventCloseProps =
  | {
      /**
       * Text label for the close button for screen readers.
       * Important for accessibility.
       */
      closeButtonLabel?: never;
      /**
       * Prevent users from closing the modal by clicking/tapping the overlay or
       * pressing the escape key. Default `false`.
       */
      preventClose: boolean;
    }
  | {
      closeButtonLabel: string;
      preventClose?: never;
    };

export type ModalProps = BaseModalProps &
  PreventCloseProps & {
    /**
     * The modal content. Use a render function when you need access to the
     * `onClose` function.
     */
    children:
      | ReactNode
      | (({ onClose }: Pick<BaseModalProps, 'onClose'>) => ReactNode);
    /**
     * Use the `contextual` variant when the modal content requires the context
     * of the page underneath to be understood, otherwise, use the `immersive`
     * variant to focus the user's attention.
     */
    variant: 'contextual' | 'immersive';
    /**
     * Custom styles for the modal wrapper element.
     */
    className?: string;
  };

const closeButtonStyles = (theme: Theme) => css`
  position: absolute;
  top: ${theme.spacings.byte};
  right: ${theme.spacings.byte};
  z-index: ${theme.zIndex.absolute};

  ${theme.mq.kilo} {
    top: ${theme.spacings.mega};
    right: ${theme.spacings.mega};
  }
`;

type ContentProps = Pick<ModalProps, 'variant'>;

const contentStyles = ({ theme }: StyleProps) => css`
  overflow-y: auto;

  ${theme.mq.untilKilo} {
    -webkit-overflow-scrolling: touch;
    padding: ${theme.spacings.mega};
    padding-bottom: calc(env(safe-area-inset-bottom) + ${theme.spacings.mega});
    width: 100vw;
  }

  ${theme.mq.kilo} {
    padding: ${theme.spacings.giga};
    padding-bottom: calc(env(safe-area-inset-bottom) + ${theme.spacings.giga});
    max-height: 90vh;
    min-width: 480px;
    max-width: 90vw;
  }
`;

const contentVariantStyles = ({
  variant,
  theme,
}: StyleProps & ContentProps) => {
  if (variant === 'contextual') {
    return css`
      ${theme.mq.untilKilo} {
        max-height: calc(100vh - ${theme.spacings.mega});
      }

      /* iOS viewport bug fix */
      /* https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/ */
      @supports (max-height: -webkit-fill-available) {
        ${theme.mq.untilKilo} {
          max-height: 80vh;
        }
      }
    `;
  }
  if (variant === 'immersive') {
    return css`
      ${theme.mq.untilKilo} {
        height: 100%;
      }
    `;
  }
  return null;
};

const Content = styled.div<ContentProps>(contentStyles, contentVariantStyles);

/**
 * The modal component displays self-contained tasks in a focused window that
 * overlays the page content.
 * Built on top of [`react-modal`](https://reactcommunity.org/react-modal/).
 */
export const Modal: ModalComponent<ModalProps> = ({
  children,
  onClose,
  variant = 'contextual',
  preventClose = false,
  closeButtonLabel,
  className,
  ...props
}) => {
  if (
    process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !preventClose &&
    !closeButtonLabel
  ) {
    throw new Error(
      "The modal is missing a `closeButtonLabel` prop. This is an accessibility requirement. Pass it in `setModal`, or pass `preventClose` if you intend to hide the modal's close button.",
    );
  }
  return (
    <ClassNames<Theme> key={variant}>
      {({ css: cssString, cx, theme }) => {
        // React Modal styles
        // https://reactcommunity.org/react-modal/styles/classes/

        const styles = {
          base: cx(
            cssString`
              position: fixed;
              outline: none;
              background-color: ${theme.colors.white};

              &::after {
                position: fixed;
                content: '';
                display: block;
                right: 0;
                bottom: 0;
                left: 0;
                background: linear-gradient(
                  rgba(255,255,255,0),
                  rgba(255,255,255,0.66),
                  rgba(255,255,255,1)
                );
              }

              ${theme.mq.untilKilo} {
                right: 0;
                bottom: 0;
                left: 0;
                transform: translateY(100%);
                transition: transform ${TRANSITION_DURATION_MOBILE}ms ease-in-out;

                &::after {
                  height: ${theme.spacings.mega};
                }
              }

              ${theme.mq.kilo} {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                transition: opacity ${TRANSITION_DURATION_DESKTOP}ms ease-in-out;
                border-radius: ${theme.borderRadius.mega};

                &::after {
                  height: ${theme.spacings.giga};
                  border-bottom-left-radius: ${theme.borderRadius.mega};
                  border-bottom-right-radius: ${theme.borderRadius.mega};
                }
              }
          `,
            variant === 'contextual' &&
              cssString`
                ${theme.mq.untilKilo} {
                  border-top-left-radius: ${theme.borderRadius.mega};
                  border-top-right-radius: ${theme.borderRadius.mega};
                }
            `,
            variant === 'immersive' &&
              cssString`
                top: 0;
            `,
          ),
          // The !important below is necessary because of some weird
          // style specificity issues in Emotion.
          afterOpen: cssString`
            ${theme.mq.untilKilo} {
              transform: translateY(0) !important;
            }

            ${theme.mq.kilo} {
              opacity: 1 !important;
            }
          `,
          beforeClose: cssString`
            ${theme.mq.untilKilo} {
              transform: translateY(100%) !important;
            }

            ${theme.mq.kilo} {
              opacity: 0 !important;
            }
        `,
        };

        const overlayStyles = {
          base: cssString`
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            opacity: 0;
            transition: opacity ${TRANSITION_DURATION_MOBILE}ms ease-in-out;
            background: ${theme.colors.overlay};
            z-index: ${theme.zIndex.modal};

            ${theme.mq.kilo} {
              transition: opacity ${TRANSITION_DURATION_DESKTOP}ms ease-in-out;
            }
        `,
          afterOpen: cssString`
            opacity: 1;
        `,
          beforeClose: cssString`
            opacity: 0;
        `,
        };

        const reactModalProps = {
          className: styles,
          overlayClassName: overlayStyles,
          onRequestClose: onClose,
          closeTimeoutMS: TRANSITION_DURATION,
          shouldCloseOnOverlayClick: !preventClose,
          shouldCloseOnEsc: !preventClose,
          ...props,
        };

        return (
          <StackContext.Provider value={theme.zIndex.modal}>
            <ReactModal {...reactModalProps}>
              <Content variant={variant} className={className}>
                {!preventClose && closeButtonLabel && (
                  <CloseButton
                    onClick={onClose}
                    label={closeButtonLabel}
                    css={closeButtonStyles}
                  />
                )}

                {isFunction(children) ? children({ onClose }) : children}
              </Content>
            </ReactModal>
          </StackContext.Provider>
        );
      }}
    </ClassNames>
  );
};

Modal.TIMEOUT = TRANSITION_DURATION;

export const useModal = createUseModal(Modal);
