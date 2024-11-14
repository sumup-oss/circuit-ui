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

import { useRef, useState } from 'react';

import { Button } from '../../components/Button/index.js';
import { Card } from '../../components/Card/index.js';

import { useClickOutside } from './useClickOutside.js';

export default {
  title: 'Hooks/useClickOutside',
  tags: ['status:stable'],
};

export const Example = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(true);

  useClickOutside(ref, () => setOpen(false), isOpen);

  if (isOpen) {
    return <Card ref={ref}>Click outside of me</Card>;
  }

  return <Button onClick={() => setOpen(true)}>Reset</Button>;
};
