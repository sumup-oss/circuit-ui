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

import { forwardRef } from 'react';

import { clsx } from '../../styles/clsx.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { Dialog, type DialogProps } from '../Dialog/Dialog.js';
import { useMedia } from '../../hooks/useMedia/index.js';

import classes from './Modal.module.css';
import { translations } from './translations/index.js';

export interface ModalProps extends DialogProps {
  /**
   * Use the `immersive` variant to focus the user's attention on the dialog content.
   * default: 'contextual'
   * */
  variant?: 'contextual' | 'immersive';
}

export const ANIMATION_DURATION = 300;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  const {
    variant = 'contextual',
    className,
    children,
    onClose,
    ...rest
  } = useI18n(props, translations);

  const isMobile = useMedia('(max-width: 479px)');

  return (
    <>
      {/* eslint-disable-next-line  jsx-a11y/no-noninteractive-element-interactions */}
      <Dialog
        ref={ref}
        isModal
        onClose={onClose}
        animation={isMobile ? 'slide' : 'fade'}
        className={clsx(
          classes.base,
          variant === 'immersive' && classes.immersive,
          className,
        )}
        {...rest}
      >
        <div className={classes.content}>
          {typeof children === 'function' ? children?.({ onClose }) : children}
        </div>
      </Dialog>
    </>
  );
});

Modal.displayName = 'Modal';
