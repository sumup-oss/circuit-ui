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

'use client';

import type { FC, ReactNode, SVGProps } from 'react';
import ReactModal from 'react-modal';

import type { ClickEvent } from '../../types/events';
import type { ModalComponent, BaseModalProps } from '../ModalContext/index';
import { Image, type ImageProps } from '../Image/index';
import { Headline } from '../Headline/index';
import { Body } from '../Body/index';
import type { ButtonProps } from '../Button/index';
import { ButtonGroup, type ButtonGroupProps } from '../ButtonGroup/index';
import { CloseButton } from '../CloseButton/index';
import { CircuitError } from '../../util/errors';

import classes from './NotificationModal.module.css';

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
     * [decorative](https://www.w3.org/WAI/tutorials/images/decorative/),
     * or a localized description if the image is [informative](https://www.w3.org/WAI/tutorials/images/informative/).
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

function NotificationImage({ image }: Pick<NotificationModalProps, 'image'>) {
  if (!image) {
    return null;
  }

  if ('svg' in image) {
    const Svg = image.svg;
    const isDecorative = !image.alt;
    return (
      <div className={classes.image}>
        <Svg
          {...(isDecorative
            ? { 'aria-hidden': true }
            : { 'aria-label': image.alt, 'role': 'img' })}
        />
      </div>
    );
  }

  return <Image {...image} className={classes.image} />;
}

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

  const reactModalProps = {
    className: {
      base: classes.base,
      afterOpen: classes.open,
      beforeClose: classes.closed,
    },
    overlayClassName: {
      base: classes.overlay,
      afterOpen: classes.open,
      beforeClose: classes.closed,
    },
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

  return (
    <ReactModal {...reactModalProps}>
      {!preventClose && closeButtonLabel && (
        <CloseButton onClick={onClose} className={classes.close}>
          {closeButtonLabel}
        </CloseButton>
      )}
      <NotificationImage image={image} />
      <Headline as="h2" size="m" className={classes.headline}>
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
          className={classes.buttons}
        />
      )}
    </ReactModal>
  );
};

NotificationModal.TRANSITION_DURATION = TRANSITION_DURATION;
