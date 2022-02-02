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
type Transition = {
  duration: number;
};

export type StackItem = {
  id: Id;
  transition?: Transition;
};

type Action<T extends StackItem> =
  | { type: 'push'; item: T }
  | { type: 'pop'; transition?: Transition }
  | { type: 'remove'; id: Id; transition?: Transition }
  | { type: 'update'; item: Partial<T> & StackItem };

export type StackDispatch<T extends StackItem> = Dispatch<Action<T>>;

function createReducer<T extends StackItem>() {
  return (state: T[], action: Action<T>) => {
    switch (action.type) {
      case 'push': {
        return [...state, action.item];
      }
      case 'pop': {
        const firstItems = state.slice(0, -1);

        if (action.transition) {
          const lastItem = {
            ...state[state.length - 1],
            transition: action.transition,
          };
          return [...firstItems, lastItem];
        }

        return firstItems;
      }
      case 'remove': {
        if (action.transition) {
          return state.map((s) =>
            s.id !== action.id ? s : { ...s, transition: action.transition },
          );
        }

        return state.filter((s) => s.id !== action.id);
      }
      case 'update': {
        return state.map((s) =>
          s.id !== action.item.id ? s : { ...s, ...action.item },
        );
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
    const itemsToRemove = state.filter((item) => item.transition);

    if (itemsToRemove.length === 0) {
      return;
    }

    // Remove in reverse order
    itemsToRemove.reverse().forEach((itemToRemove) => {
      setTimeout(
        () => {
          dispatch({ type: 'remove', id: itemToRemove.id });
        },
        // We found the item by the `transition` property, so we can be sure it exists.
        (itemToRemove.transition as Transition).duration,
      );
    });
  }, [state, dispatch]);

  return [state, dispatch];
}
