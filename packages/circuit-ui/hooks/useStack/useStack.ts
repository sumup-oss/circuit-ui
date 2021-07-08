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

import { Dispatch, useEffect, useReducer } from 'react';

type Id = string | number;

export type StackItem = {
  id: Id;
  timeout?: number;
};

type Action<T extends StackItem> =
  | { type: 'push'; item: T }
  | { type: 'pop'; timeout?: number }
  | { type: 'remove'; id: Id; timeout?: number };

export type StackDispatch<T extends StackItem> = Dispatch<Action<T>>;

function createReducer<T extends StackItem>() {
  return (state: T[], action: Action<T>) => {
    switch (action.type) {
      case 'push': {
        return [...state, action.item];
      }
      case 'pop': {
        const firstItems = state.slice(0, -1);

        if (action.timeout) {
          const lastItem = {
            ...state[state.length - 1],
            timeout: action.timeout,
          };
          return [...firstItems, lastItem];
        }

        return firstItems;
      }
      case 'remove': {
        if (action.timeout) {
          return state.map((s) =>
            s.id !== action.id ? s : { ...s, timeout: action.timeout },
          );
        }

        return state.filter((s) => s.id !== action.id);
      }
      default: {
        return state;
      }
    }
  };
}

export function useStack<T extends StackItem>(
  initialStack: T[] = [],
): [T[], StackDispatch<T>] {
  const reducer = createReducer<T>();

  const [state, dispatch] = useReducer(reducer, initialStack);

  useEffect(() => {
    const itemToRemove = state.find((item) => item.timeout);

    if (!itemToRemove) {
      return;
    }

    setTimeout(() => {
      dispatch({ type: 'remove', id: itemToRemove.id });
    }, itemToRemove.timeout);
  }, [state, dispatch]);

  return [state, dispatch];
}
