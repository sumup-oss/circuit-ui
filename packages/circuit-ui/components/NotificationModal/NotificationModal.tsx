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

import { css, ClassNames } from '@emotion/react';
import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { Theme } from '@sumup/design-tokens';

import { useClickEvent } from '../../hooks/useClickEvent';
import { ClickEvent } from '../../types/events';
import { ModalComponent, BaseModalProps } from '../ModalContext';
import Image, { ImageProps } from '../Image';
import Headline from '../Headline';
import Body from '../Body';
import { ButtonProps } from '../Button';
import ButtonGroup, { ButtonGroupProps } from '../ButtonGroup';
import styled, { StyleProps } from '../../styles/styled';
import CloseButton from '../CloseButton';
import { spacing } from '../../styles/style-mixins';

const TRANSITION_DURATION = 200;

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

export type NotificationModalProps = BaseModalProps &
  PreventCloseProps & {
    image?: ImageProps;
    headline: string;
    body?: string | ReactNode;
    actions: ButtonGroupProps['actions'];
  };

const closeButtonStyles = (theme: Theme) => css`
  position: absolute;
  top: ${theme.spacings.byte};
  right: ${theme.spacings.byte};

  ${theme.mq.kilo} {
    top: ${theme.spacings.mega};
    right: ${theme.spacings.mega};
  }
`;

const imageStyles = ({ theme }: StyleProps) => css`
  max-width: 232px;
  height: 120px;
  object-fit: contain;
  margin: 0 auto ${theme.spacings.mega};
`;

const ModalImage = styled(Image)(imageStyles);

/**
 * Circuit UI's wrapper component for ReactModal.
 * http://reactcommunity.org/react-modal/accessibility/#aria
 */
export const NotificationModal: ModalComponent<NotificationModalProps> = ({
  image,
  headline,
  body,
  actions,
  onClose,
  closeButtonLabel,
  preventClose = false,
  tracking,
  className,
  ...props
}) => {
  if (process.env.NODE_ENV !== 'production' && className) {
    // eslint-disable-next-line no-console
    console.warn(
      [
        'Custom styles are not supported by the NotificationModal component.',
        'If your use case requires custom styles, please open an issue at',
        'https://github.com/sumup-oss/circuit-ui.',
      ].join(' '),
    );
  }

  const handleClose = useClickEvent(onClose, tracking, 'modal-close');
  return (
    <ClassNames>
      {({ css: cssString, theme }) => {
        // React Modal styles
        // https://reactcommunity.org/react-modal/styles/classes/
        const styles = {
          base: cssString`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100vw - ${theme.spacings.peta} * 2);
            max-width: 420px;
            max-height: calc(100vh - ${theme.spacings.mega} * 2);
            outline: none;
            background-color: ${theme.colors.white};
            border-radius: ${theme.borderRadius.mega};
            padding: ${theme.spacings.giga};
            text-align: center;
            opacity: 0;
            transition: opacity ${TRANSITION_DURATION}ms ease-in-out;
            overflow-y: auto;

            ${theme.mq.untilKilo} {
              -webkit-overflow-scrolling: touch;
            }
          `,

          afterOpen: cssString`
           opacity: 1;
          `,
          beforeClose: cssString`
            opacity: 0;
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
            transition: opacity ${TRANSITION_DURATION}ms ease-in-out;
            background: ${theme.colors.overlay};
            z-index: ${theme.zIndex.modal};

            ${theme.mq.kilo} {
              -webkit-overflow-scrolling: touch;
              overflow-y: auto;
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
          onRequestClose: handleClose,
          closeTimeoutMS: TRANSITION_DURATION,
          shouldCloseOnOverlayClick: !preventClose,
          shouldCloseOnEsc: !preventClose,
          ...props,
        };

        function wrapOnClick(onClick?: ButtonProps['onClick']) {
          return (event: ClickEvent) => {
            handleClose?.(event);
            onClick?.(event);
          };
        }

        return (
          <ReactModal {...reactModalProps}>
            {!preventClose && closeButtonLabel && (
              <CloseButton
                onClick={onClose}
                label={closeButtonLabel}
                css={closeButtonStyles}
              />
            )}
            {image && <ModalImage {...image} />}
            <Headline
              as="h2"
              size="three"
              css={spacing({ top: 'giga', bottom: 'byte' })}
              noMargin
            >
              {headline}
            </Headline>
            {body && <Body noMargin>{body}</Body>}
            {actions && (
              <ButtonGroup
                actions={{
                  primary: actions?.primary && {
                    ...actions.primary,
                    onClick: wrapOnClick(actions.primary.onClick),
                  },
                  secondary: actions?.secondary && {
                    ...actions.secondary,
                    onClick: wrapOnClick(actions.secondary.onClick),
                  },
                }}
                css={spacing({ top: 'giga' })}
              />
            )}
          </ReactModal>
        );
      }}
    </ClassNames>
  );
};

NotificationModal.TIMEOUT = TRANSITION_DURATION;
