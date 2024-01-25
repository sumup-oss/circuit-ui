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

import {
  createContext,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import { useStack, StackItem } from '../../hooks/useStack/index.js';
import { warn } from '../../util/logger.js';

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

type ModalState<TProps extends BaseModalProps> = Omit<TProps, 'isOpen'> &
  StackItem & { component: ModalComponent<TProps> };

type ModalContextValue = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  setModal: (modal: ModalState<any>) => void;
  removeModal: (modal: ModalState<any>) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

export const ModalContext = createContext<ModalContextValue>({
  setModal: () => {},
  removeModal: () => {},
});

export interface ModalProviderProps<TProps extends BaseModalProps>
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
  initialState?: ModalState<TProps>[];
}

export function ModalProvider<TProps extends BaseModalProps>({
  children,
  initialState,
  ...defaultModalProps
}: ModalProviderProps<TProps>): JSX.Element {
  const [modals, dispatch] = useStack<ModalState<TProps>>(initialState);

  const setModal = useCallback(
    (modal: ModalState<TProps>) => {
      dispatch({ type: 'push', item: modal });
    },
    [dispatch],
  );

  const removeModal = useCallback(
    (modal: ModalState<TProps>) => {
      if (modal.onClose) {
        modal.onClose();
      }
      dispatch({
        type: 'remove',
        id: modal.id,
        transition: {
          duration: modal.component.TRANSITION_DURATION,
        },
      });
    },
    [dispatch],
  );

  const activeModal = modals[modals.length - 1];

  const cleanUp = useCallback(() => {
    // // Clean up after react-modal in case it fails to do so itself
    // // https://github.com/reactjs/react-modal/issues/888#issuecomment-1158061329
    document.documentElement.classList.remove(HTML_OPEN_CLASS_NAME);
    getAppElement()?.removeAttribute('aria-hidden');
  }, []);

  useEffect(() => {
    if (!activeModal) {
      cleanUp();
      return undefined;
    }

    const popModal = () => {
      removeModal(activeModal);
    };

    window.addEventListener('popstate', popModal);

    return () => {
      cleanUp();
      window.removeEventListener('popstate', popModal);
    };
  }, [activeModal, removeModal]);

  const context = useMemo(
    () => ({ setModal, removeModal }),
    [setModal, removeModal],
  );

  return (
    <ModalContext.Provider value={context}>
      {children}

      {modals.map((modal) => {
        const {
          id,
          onClose,
          transition,
          component: Component,
          ...modalProps
        } = modal;
        return (
          // @ts-expect-error The props are enforced by the modal hooks,
          // so this warning can be safely ignored.
          <Component
            {...defaultModalProps}
            {...modalProps}
            key={id}
            isOpen={!transition}
            onClose={() => removeModal(modal)}
            portalClassName={PORTAL_CLASS_NAME}
            htmlOpenClassName={HTML_OPEN_CLASS_NAME}
            bodyOpenClassName=""
          />
        );
      })}
    </ModalContext.Provider>
  );
}
