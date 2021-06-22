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
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useDebugValue,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { Global, css } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';

import { useStack, StackItem, StackDispatch } from '../../hooks/useStack';
import { uniqueId } from '../../util/id';

// It is important for users of screenreaders that other page content be hidden
// (via the `aria-hidden` attribute) while the modal is open.
// To allow react-modal to do this, Circuit UI calls `Modal.setAppElement`
// with a query selector identifying the root of the app.
// http://reactcommunity.org/react-modal/accessibility/#app-element
if (typeof window !== 'undefined') {
  // These are the default app elements in Next.js and CRA.
  const appElement =
    document.getElementById('__next') || document.getElementById('root');

  if (appElement) {
    ReactModal.setAppElement(appElement);
  } else if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    console.error(
      [
        '[ModalProvider] Could not find the app root element to hide it',
        'when a modal is open. Add an element with the id `#root`',
        'at the root of your application to remove this error.',
      ].join(' '),
    );
  }
}

export type OnClose = (event?: MouseEvent | KeyboardEvent) => void;

export interface BaseModalProps
  extends Omit<
    ReactModalProps,
    'shouldCloseOnOverlayClick' | 'shouldCloseOnEsc'
  > {
  /**
   * Callback function that is called when the modal is closed.
   */
  onClose?: OnClose;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

export type ModalComponent<TProps extends BaseModalProps = BaseModalProps> = ((
  props: TProps,
) => JSX.Element) & { TIMEOUT?: number };

type ModalState<TProps extends BaseModalProps> = Omit<TProps, 'isOpen'> &
  StackItem & { component: ModalComponent<TProps> };

type ModalContextValue = [ModalState<any>[], StackDispatch<ModalState<any>>];

export const ModalContext = createContext<ModalContextValue>([[], () => {}]);

export interface ModalProviderProps<TProps extends BaseModalProps>
  extends Omit<ReactModalProps, 'isOpen'> {
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
  portalClassName = 'ReactModalPortal',
  htmlOpenClassName = 'ReactModal__Html--open',
  ...defaultModalProps
}: ModalProviderProps<TProps>): JSX.Element {
  const stack = useStack<ModalState<TProps>>(initialState);

  const [modals, dispatch] = stack;
  const activeModal = modals[modals.length - 1];

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    const popModal = () => {
      if (activeModal.onClose) {
        activeModal.onClose();
      }
      dispatch({
        type: 'remove',
        id: activeModal.id,
        timeout: activeModal.component.TIMEOUT,
      });
    };

    window.addEventListener('popstate', popModal);

    return () => {
      window.removeEventListener('popstate', popModal);
    };
  }, [dispatch, activeModal]);

  return (
    <ModalContext.Provider value={stack}>
      {children}

      {modals.map(
        ({ id, onClose, timeout, component: Component, ...modalProps }) => {
          const handleClose = (event?: MouseEvent | KeyboardEvent) => {
            if (onClose) {
              onClose(event);
            }
            dispatch({ type: 'remove', id, timeout: Component.TIMEOUT });
          };
          return (
            // @ts-expect-error The props are enforced by the modal hooks,
            // so this warning can be safely ignored.
            <Component
              {...defaultModalProps}
              {...modalProps}
              key={id}
              isOpen={!timeout}
              onClose={handleClose}
              portalClassName={portalClassName}
              htmlOpenClassName={htmlOpenClassName}
            />
          );
        },
      )}

      {activeModal && (
        <Global
          styles={css`
            /* Remove scroll on the body when react-modal is open */
            .${htmlOpenClassName} {
              height: 100%;
              overflow-y: hidden;
              -webkit-overflow-scrolling: auto;
            }
            /* Enable keyboard navigation inside the modal, see https://github.com/reactjs/react-modal/issues/782 */
            .${portalClassName} {
              position: absolute;
              height: 100%;
              width: 100%;
            }
          `}
        />
      )}
    </ModalContext.Provider>
  );
}

export function createUseModal<T extends BaseModalProps>(
  component: ModalComponent<T>,
) {
  return (): {
    setModal: (props: Omit<T, 'isOpen'>) => void;
    removeModal: () => void;
  } => {
    const id = useMemo(uniqueId, []);
    const [modals, dispatch] = useContext(ModalContext);

    const modal = useMemo<T | undefined>(
      () => modals.find((m) => m.id === id),
      [id, modals],
    );

    useDebugValue(modal);

    const setModal = useCallback(
      (props: Omit<T, 'isOpen'>): void => {
        dispatch({ type: 'push', item: { ...props, id, component } });
      },
      [dispatch, id],
    );

    const removeModal = useCallback((): void => {
      if (modal && modal.onClose) {
        modal.onClose();
      }
      dispatch({ type: 'remove', id, timeout: component.TIMEOUT });
    }, [dispatch, id, modal]);

    return { setModal, removeModal };
  };
}
