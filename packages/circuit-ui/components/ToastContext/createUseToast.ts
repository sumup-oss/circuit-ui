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

import { useContext, useMemo } from 'react';

import { uniqueId } from '../../util/id';

import { ToastContext } from './ToastContext';
import type { BaseToastProps, ToastComponent } from './types';

export function createUseToast<T extends BaseToastProps>(
  component: ToastComponent<T>,
) {
  return (): {
    setToast: (props: T) => void;
  } => {
    const context = useContext(ToastContext);

    return useMemo(
      () => ({
        setToast: (props: T): void => {
          const id = uniqueId('toast_');
          context.setToast({ ...props, id, component });
        },
      }),
      [context],
    );
  };
}
