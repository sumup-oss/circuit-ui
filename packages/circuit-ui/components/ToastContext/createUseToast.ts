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

import { useCallback, useContext, useMemo, useRef } from 'react';

import { uniqueId } from '../../util/id';

import { ToastContext } from './ToastContext';
import type { BaseToastProps, ToastComponent } from './types';

export function createUseToast<T extends BaseToastProps>(
  component: ToastComponent<T>,
) {
  return (): {
    setToast: (props: T) => void;
    removeToast: () => void;
  } => {
    const id = useMemo(uniqueId, []);
    const toastRef = useRef<T | null>(null);
    const context = useContext(ToastContext);
    // const [toasts, setToasts] = useState([]);

    const setToast = useCallback(
      (props: T): void => {
        toastRef.current = props;
        context.setToast({ ...props, id, component });
        console.log(id);
      },
      [context, id],
    );

    const removeToast = useCallback((): void => {
      if (toastRef.current) {
        context.removeToast({ ...toastRef.current, id, component });
        toastRef.current = null;
      }
    }, [context, id]);

    return { setToast, removeToast };
  };
}
