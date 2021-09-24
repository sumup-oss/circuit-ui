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
import { css } from '@emotion/react';
import { action } from '@storybook/addon-actions';

import { listItem } from '../../styles/style-mixins';

import { useFocusList } from './useFocusList';
import docs from './useFocusList.docs.mdx';

export default {
  title: 'Hooks/useFocusList',
  parameters: {
    docs: { page: docs },
  },
};

const fruits = ['Apple', 'Banana', 'Mango'];

const listStyles = css`
  list-style: none;
`;

export const Example = () => {
  const focusProps = useFocusList();

  return (
    <ul role="list" css={listStyles}>
      {fruits.map((fruit) => (
        <li key={fruit}>
          <button css={listItem} onClick={action(fruit)} {...focusProps}>
            {fruit}
          </button>
        </li>
      ))}
    </ul>
  );
};
