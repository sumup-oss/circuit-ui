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

import { useState } from 'react';

import {
  CarouselPagination,
  type CarouselPaginationProps,
} from './CarouselPagination.js';

export default {
  title: 'Components/Carousel/CarouselPagination',
  component: CarouselPagination,
};

const baseArgs = {
  items: [
    { id: 'foo', label: 'Foo' },
    { id: 'bar', label: 'Bar' },
    { id: 'baz', label: 'Baz' },
  ],
  currentId: 'foo',
};

export const Base = (args: CarouselPaginationProps) => {
  const [currentId, setCurrentId] = useState(args.currentId);

  const items = args.items.map((item) => ({
    ...item,
    onClick: () => {
      setCurrentId(item.id);
    },
  }));

  return <CarouselPagination {...args} items={items} currentId={currentId} />;
};

Base.args = baseArgs;
