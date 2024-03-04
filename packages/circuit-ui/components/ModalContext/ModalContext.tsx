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

import { useEffect, ReactNode } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { useStore } from '@nanostores/react';

import { warn } from '../../util/logger.js';
import { StackItem, stack } from '../../util/stores.js';

import { BaseModalProps, ModalComponent } from './types.js';

import './Modal.css';

const PORTAL_CLASS_NAME = 'cui-modal-portal';
const HTML_OPEN_CLASS_NAME = 'cui-modal-open';
// These are the default app element ids in Next.js, Docusaurus, CRA and Storybook.
const APP_ELEMENT_IDS = ['root', '__next', '__docusaurus', 'storybook-root'];

function getAppElement(): HTMLElement | null {
  // eslint-disable-next-line no-restricted-syntax
  for (const id of APP_ELEMENT_IDS) {
    const element = document.getElementById(id);

    if (element) {
      return element;
    }
  }
  return null;
}

// It is important for users of screen readers that other page content be hidden
// (via the `aria-hidden` attribute) while the modal is open.
// To allow react-modal to do this, Circuit UI calls `Modal.setAppElement`
// with a query selector identifying the root of the app.
// http://reactcommunity.org/react-modal/accessibility/#app-element
if (typeof window !== 'undefined') {
  const appElement = getAppElement();

  if (appElement) {
    ReactModal.setAppElement(appElement);
  } else if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    warn(
      'ModalProvider',
      'Could not find the app root element to hide it when a modal is open.',
      'Add an element with the id `#root` at the root of your application.',
    );
  }
}

type ModalState = Omit<BaseModalProps, 'isOpen'> &
  StackItem & { component: ModalComponent<BaseModalProps> };

export const $modals = stack<ModalState>([]);

export interface ModalProviderProps
  extends Omit<
    ReactModalProps,
    'isOpen' | 'portalClassName' | 'htmlOpenClassName' | 'bodyOpenClassName'
  > {
  /**
   * The ModalProvider should wrap your entire application.
   */
  children: ReactNode;
  /**
   * An array of modals that should be displayed immediately, e.g. on page load.
   */
  initialState?: ModalState[];
}

export function ModalProvider({
  children,
  initialState,
  ...defaultModalProps
}: ModalProviderProps): JSX.Element {
  const modals = useStore($modals);

  useEffect(() => {
    if (initialState) {
      $modals.set(initialState);
    }
    // The initial state should only be set on the initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeModal = modals[modals.length - 1];

  useEffect(() => {
    // // Clean up after react-modal in case it fails to do so itself
    // // https://github.com/reactjs/react-modal/issues/888#issuecomment-1158061329
    const cleanUp = () => {
      document.documentElement.classList.remove(HTML_OPEN_CLASS_NAME);
      getAppElement()?.removeAttribute('aria-hidden');
    };

    if (!activeModal) {
      cleanUp();
      return undefined;
    }

    const popModal = () => {
      $modals.remove(activeModal, activeModal.component.TRANSITION_DURATION);
    };

    window.addEventListener('popstate', popModal);

    return () => {
      cleanUp();
      window.removeEventListener('popstate', popModal);
    };
  }, [activeModal]);

  return (
    <>
      {children}

      {modals.map((modal) => {
        const {
          id,
          onClose,
          component: Component,
          state,
          ...modalProps
        } = modal;
        return (
          <Component
            {...defaultModalProps}
            {...modalProps}
            key={id}
            isOpen={state !== 'removing'}
            onClose={() =>
              $modals.remove(modal, modal.component.TRANSITION_DURATION)
            }
            portalClassName={PORTAL_CLASS_NAME}
            htmlOpenClassName={HTML_OPEN_CLASS_NAME}
            bodyOpenClassName=""
          />
        );
      })}
    </>
  );
}
