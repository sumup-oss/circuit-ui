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

import { forwardRef, useCallback, useState, type Ref } from 'react';

import { clsx } from '../../styles/clsx.js';
import { deprecate } from '../../util/logger.js';
import {
  Dialog,
  type DialogProps,
  type PublicDialogProps,
} from '../Dialog/Dialog.js';
import { sharedClasses } from '../../styles/shared.js';
import { useMedia } from '../../hooks/useMedia/index.js';

import classes from './Modal.module.css';

export interface ModalProps extends Omit<PublicDialogProps, 'isModal'> {
  /**
   * Use the `immersive` variant to focus the user's attention on the dialog content.
   * @default 'contextual'
   * */
  variant?: 'contextual' | 'immersive';
  /**
   * Callback function invoked when the modal closes.
   */
  onClose?: DialogProps['onCloseEnd'];
  /**
   * @deprecated This prop was passed to `react-modal` and is no longer relevant.
   * Use the `preventClose` prop instead. Also see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role#required_javascript_features
   */
  hideCloseButton?: boolean;
  /**
   * Prevent users from closing the modal by clicking/tapping the overlay or
   * pressing the escape key, and hides the close button.
   * @default false
   */
  preventClose?: boolean;
  /**
   * An optional class name to be applied to the component's content.
   */
  contentClassName?: string;
  ref?: Ref<HTMLDialogElement>;
}

export const ANIMATION_DURATION = 300;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  const {
    hideCloseButton,
    variant = 'contextual',
    className,
    contentClassName,
    preventClose = false,
    children,
    onClose,
    ...rest
  } = props;
  if (process.env.NODE_ENV !== 'production') {
    if (hideCloseButton) {
      deprecate(
        'Modal',
        'The `hideCloseButton` prop has been deprecated. Use the `preventClose` prop instead.',
      );
    }
  }
  const [isClosing, setIsClosing] = useState(false);

  const handleModalCloseEnd = useCallback(() => {
    setIsClosing(false);
    onClose?.();
  }, [onClose]);

  const handleModalCloseStart = useCallback(() => {
    setIsClosing(true);
  }, []);

  const isMobile = useMedia('(max-width: 479px)');

  const outAnimation = isMobile
    ? sharedClasses.animationSlideUpOut
    : sharedClasses.animationFadeOut;
  const inAnimation = isMobile
    ? sharedClasses.animationSlideUpIn
    : sharedClasses.animationFadeIn;

  return (
    <Dialog
      ref={ref}
      isModal
      onCloseStart={handleModalCloseStart}
      onCloseEnd={handleModalCloseEnd}
      animationDuration={ANIMATION_DURATION}
      className={clsx(
        classes.base,
        isClosing ? outAnimation : inAnimation,
        variant === 'immersive' && classes.immersive,
        className,
      )}
      preventEscapeKeyClose={preventClose}
      preventOutsideClickClose={preventClose}
      hideCloseButton={preventClose}
      {...rest}
    >
      <div className={clsx(classes.content, contentClassName)}>
        {typeof children === 'function' ? children?.({ onClose }) : children}
      </div>
    </Dialog>
  );
});

Modal.displayName = 'Modal';
