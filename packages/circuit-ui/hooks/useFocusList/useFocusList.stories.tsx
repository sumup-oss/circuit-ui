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

/* eslint-disable jsx-a11y/no-redundant-roles */
import { action } from '@storybook/addon-actions';
import { userEvent } from '@storybook/test';

import { sharedClasses } from '../../styles/shared.js';

import { useFocusList } from './useFocusList.js';

export default {
  title: 'Hooks/useFocusList',
  tags: ['status:stable'],
};

const fruits = ['Apple', 'Banana', 'Mango'];

export const Example = () => {
  const focusProps = useFocusList();

  return (
    <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {fruits.map((fruit) => (
        <li key={fruit}>
          <button
            className={sharedClasses.listItem}
            onClick={action(fruit)}
            {...focusProps}
          >
            {fruit}
          </button>
        </li>
      ))}
    </ul>
  );
};

Example.play = async () => {
  await userEvent.tab();
};
