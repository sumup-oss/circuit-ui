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
  ModalContext,
  ModalProvider,
  ModalConsumer,
  useModal,
} from './ModalContext';
import { Modal, DEFAULT_APP_ELEMENT } from './Modal';
import { ModalWrapper, ModalHeader, ModalFooter } from './components';

export {
  DEFAULT_APP_ELEMENT,
  useModal,
  ModalContext,
  ModalConsumer,
  ModalProvider,
  ModalWrapper,
  ModalHeader,
  ModalFooter,
};

export type { ModalProps } from './Modal';

export type { ModalHeaderProps, ModalWrapperProps } from './components';

export type { ModalContextValue } from './ModalContext';

export default Modal;
