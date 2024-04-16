/**
 * Copyright 2021, SumUp Ltd.
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

import type { ClickEvent } from '../../types/events.js';

type OnClose = (event?: ClickEvent) => void;

export interface BaseToastProps {
  /**
   * Callback function that is called when the Toast is closed.
   */
  onClose?: OnClose;
  /**
   * Toast duration, defaults to 6000ms.
   */
  duration?: number;
}

export type ToastComponent<TProps extends BaseToastProps = BaseToastProps> = ((
  props: TProps,
) => JSX.Element) & { TRANSITION_DURATION: number };
