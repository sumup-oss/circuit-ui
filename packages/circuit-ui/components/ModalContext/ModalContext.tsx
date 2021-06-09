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
  FC,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { Global, css } from '@emotion/core';
// import noScroll from 'no-scroll';
import { Dispatch as TrackingProps } from '@sumup/collector';

import { useStack, StackItem, StackDispatch } from '../../hooks/useStack';
import { uniqueId } from '../../util/id';
// import IS_IOS from '../../util/ios';

// TODO: Add explainer what this does.
if (typeof window !== 'undefined') {
  // These are the default app elements in Next.js and CRA.
  const appElement =
    document.getElementById('__next') || document.getElementById('root');

  if (appElement) {
    ReactModal.setAppElement(appElement);
  } else if (process.env.NODE_ENV !== 'production') {
    // TODO: Add error message
    console.error('');
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

export type ModalComponent<T extends BaseModalProps> = ((
  props: T,
) => JSX.Element) & { TIMEOUT?: number };

type ModalState = Omit<BaseModalProps, 'isOpen'> &
  StackItem & { component: ModalComponent<BaseModalProps> };

type ModalContextValue = [ModalState[], StackDispatch<ModalState>];

const ModalContext = createContext<ModalContextValue>([[], () => {}]);

export interface ModalProviderProps extends Omit<ReactModalProps, 'isOpen'> {
  initialState?: ModalState[];
}

export const ModalProvider: FC<ModalProviderProps> = ({
  children,
  initialState,
  portalClassName = 'ReactModalPortal',
  htmlOpenClassName = 'ReactModal__Html--open',
  ...defaultModalProps
}) => {
  const [modals, dispatch] = useStack<ModalState>(initialState);

  const isOpen = modals.length > 0;

  useEffect(() => {
    const popModal = () => {
      dispatch({ type: 'pop' });
    };

    if (isOpen) {
      window.onpopstate = popModal;
    } else {
      window.onpopstate = null;
    }

    return () => {
      window.onpopstate = null;
    };
  }, [dispatch, isOpen]);

  // TODO: Not sure this even works or is still needed.
  // useEffect(() => {
  //   if (!IS_IOS) {
  //     return undefined;
  //   }

  //   if (isOpen) {
  //     noScroll.on();
  //   } else {
  //     noScroll.off();
  //   }

  //   return () => {
  //     noScroll.off();
  //   };
  // }, [isOpen]);

  return (
    <ModalContext.Provider value={[modals, dispatch]}>
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

      {isOpen && (
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
};

export function createUseModal<T extends BaseModalProps>(
  component: ModalComponent<T>,
) {
  return (): {
    setModal: (props: Omit<T, 'isOpen'>) => void;
    removeModal: () => void;
  } => {
    const id = useMemo(uniqueId, []);
    const [modals, dispatch] = useContext(ModalContext);

    const modal = useMemo(() => modals.find((m) => m.id === id), [id, modals]);

    useDebugValue(modal);

    const setModal = useCallback(
      (props: Omit<T, 'isOpen'>): void => {
        // @ts-expect-error There's only the base type and one subtype,
        // so this warning can be safely ignored.
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
