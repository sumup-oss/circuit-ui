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

import type { HTMLAttributes, ReactNode } from 'react';
import ReactModal from 'react-modal';

import { isFunction } from '../../util/type-check.js';
import {
  createUseModal,
  type ModalComponent,
  type BaseModalProps,
} from '../ModalContext/index.js';
import CloseButton from '../CloseButton/index.js';
import { StackContext } from '../StackContext/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Modal.module.css';

const TRANSITION_DURATION = 300;

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
    className?: HTMLAttributes<HTMLDivElement>['className'];
    /**
     * Custom styles for the modal wrapper element.
     */
    style?: HTMLAttributes<HTMLDivElement>['style'];
  };

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
  style,
  ...props
}) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !preventClose &&
    !isSufficientlyLabelled(closeButtonLabel)
  ) {
    throw new AccessibilityError(
      'Modal',
      "The `closeButtonLabel` prop is missing or invalid. Pass it in `setModal`, or pass `preventClose` if you intend to hide the Modal's close button.",
    );
  }

  const reactModalProps = {
    className: {
      base: clsx(classes.base, classes[variant]),
      afterOpen: classes.open,
      beforeClose: classes.closed,
    },
    overlayClassName: {
      base: classes.overlay,
      afterOpen: classes['overlay-open'],
      beforeClose: classes['overlay-closed'],
    },
    onRequestClose: onClose,
    closeTimeoutMS: TRANSITION_DURATION,
    shouldCloseOnOverlayClick: !preventClose,
    shouldCloseOnEsc: !preventClose,
    /**
     * react-modal relies on document.activeElement to return focus after the modal is closed.
     * Safari and Firefox don't set it properly on button click (see https://github.com/reactjs/react-modal/issues/858 and https://github.com/reactjs/react-modal/issues/389).
     * Returning the focus to document.body or to the focus-root can cause unwanted page scroll.
     * Preventing scroll on focus would provide better UX for mouse users and shouldn't cause any side effects for assistive technology users.
     */
    preventScroll: true,
    ...props,
  };

  return (
    <StackContext.Provider value={'var(--cui-z-index-modal)'}>
      <ReactModal {...reactModalProps}>
        <div className={clsx(classes.content, className)} style={style}>
          {!preventClose && closeButtonLabel && (
            <CloseButton onClick={onClose} className={classes.close}>
              {closeButtonLabel}
            </CloseButton>
          )}

          {isFunction(children) ? children({ onClose }) : children}
        </div>
      </ReactModal>
    </StackContext.Provider>
  );
};

Modal.TRANSITION_DURATION = TRANSITION_DURATION;

export const useModal = createUseModal(Modal);
