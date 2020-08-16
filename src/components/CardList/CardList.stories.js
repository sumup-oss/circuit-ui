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

import React, { useState } from 'react';
import { range } from 'lodash/fp';

import docs from './CardList.docs.mdx';

import CardList from '.';

export default {
  title: 'Components/Card/CardList',
  component: CardList,
  parameters: {
    docs: { page: docs },
  },
};

export const Base = (args) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index) => () => setSelected(index);

  return (
    <CardList {...args}>
      {range(1, 6).map((i) => (
        <CardList.Item
          key={i}
          selected={selected === i}
          onClick={handleClick(i)}
        >
          Item #{i}
        </CardList.Item>
      ))}
    </CardList>
  );
};
