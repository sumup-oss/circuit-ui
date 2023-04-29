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
import { FC, ReactNode, SVGProps } from 'react';
import ReactModal from 'react-modal';
import { Theme } from '@sumup/design-tokens';

import { ClickEvent } from '../../types/events.js';
import { ModalComponent, BaseModalProps } from '../ModalContext/index.js';
import Image, { ImageProps } from '../Image/index.js';
import Headline from '../Headline/index.js';
import Body from '../Body/index.js';
import { ButtonProps } from '../Button/index.js';
import ButtonGroup, { ButtonGroupProps } from '../ButtonGroup/index.js';
import CloseButton from '../CloseButton/index.js';
import { cx, spacing } from '../../styles/style-mixins.js';
import { CircuitError } from '../../util/errors.js';

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
    /**
     * An optional image to illustrate the notification. Supports either
     * passing an image source to `image.src` or an SVG component to
     * `image.svg`. Pass an empty string as alt text if the image is
     * decorative, or a localized description if the image is informative.
     */
    image?: ImageProps | { svg: FC<SVGProps<SVGSVGElement>>; alt: string };
    /**
     * The notification's headline.
     */
    headline: string;
    /**
     * Optional body copy for notification details.
     */
    body?: string | ReactNode;
    /**
     * Action buttons to allow users to act on the notification.
     */
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

const imageStyles = (theme: Theme) => css`
  max-width: 232px;
  height: 120px;
  object-fit: contain;
  margin: 0 auto ${theme.spacings.giga};
`;

const svgStyles = css`
  height: 100%;
  width: 100%;
`;

function NotificationImage({ image }: Pick<NotificationModalProps, 'image'>) {
  if (!image) {
    return null;
  }

  if ('svg' in image) {
    const Svg = image.svg;
    const isDecorative = !image.alt;
    return (
      <div css={imageStyles}>
        <Svg
          css={svgStyles}
          {...(isDecorative
            ? { 'aria-hidden': true }
            : { 'aria-label': image.alt, 'role': 'img' })}
        />
      </div>
    );
  }

  return <Image {...image} css={imageStyles} />;
}

// Prevent the headline from being overlapped by the close button
const noImageStyles = (hasImage: boolean) =>
  !hasImage &&
  css`
    max-width: 80%;
    margin-right: auto;
    margin-left: auto;
  `;

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
  className,
  ...props
}) => {
  if (process.env.NODE_ENV !== 'production' && className) {
    throw new CircuitError(
      'NotificationModal',
      'Custom styles are not supported by this component. If your use case requires custom styles, please open an issue at https://github.com/sumup-oss/circuit-ui.',
    );
  }

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
            background-color: var(--cui-bg-elevated);
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
            background: var(--cui-bg-overlay);
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
          onRequestClose: onClose,
          closeTimeoutMS: TRANSITION_DURATION,
          shouldCloseOnOverlayClick: !preventClose,
          shouldCloseOnEsc: !preventClose,
          ...props,
        };

        function wrapOnClick(onClick?: ButtonProps['onClick']) {
          return (event: ClickEvent) => {
            onClose?.(event);
            onClick?.(event);
          };
        }

        const hasImage = Boolean(image);

        return (
          <ReactModal {...reactModalProps}>
            {!preventClose && closeButtonLabel && (
              <CloseButton
                onClick={onClose}
                label={closeButtonLabel}
                css={closeButtonStyles}
              />
            )}
            <NotificationImage image={image} />
            <Headline
              as="h2"
              size="three"
              css={cx(spacing({ bottom: 'byte' }), noImageStyles(hasImage))}
            >
              {headline}
            </Headline>
            {body && <Body>{body}</Body>}
            {actions && (
              <ButtonGroup
                actions={{
                  primary: {
                    ...actions.primary,
                    onClick: wrapOnClick(actions.primary.onClick),
                  },
                  secondary: actions.secondary && {
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

NotificationModal.TRANSITION_DURATION = TRANSITION_DURATION;
