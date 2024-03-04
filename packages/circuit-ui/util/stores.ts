/**
 * Copyright 2024, SumUp Ltd.
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

import { atom } from 'nanostores';

export type StackItem = {
  id: string | number;
  state?: 'removing';
  onClose?: () => void;
};

export function stack<T extends StackItem>(initialValue: T[]) {
  const store = atom<T[]>(initialValue);

  const add = (item: T) => {
    store.set([...store.get(), item]);
  };

  const update = (item: T) => {
    store.set(
      store.get().map((i) => (i.id === item.id ? { ...i, ...item } : i)),
    );
  };

  const remove = (item: T, delay?: number) => {
    item.onClose?.();

    if (delay) {
      update({ ...item, state: 'removing' });
      setTimeout(() => {
        store.set(store.get().filter((i) => i.id !== item.id));
      }, delay);
    } else {
      store.set(store.get().filter((i) => i.id !== item.id));
    }
  };

  return { ...store, add, remove, update };
}
