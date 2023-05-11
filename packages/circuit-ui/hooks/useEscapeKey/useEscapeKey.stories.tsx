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

import { useState } from 'react';

import Body from '../../components/Body';
import Button from '../../components/Button';

import { useEscapeKey } from './useEscapeKey';

export default {
  title: 'Hooks/useEscapeKey',
};

export const Example = () => {
  const [isOpen, setOpen] = useState(true);

  useEscapeKey(() => setOpen(false), isOpen);

  if (isOpen) {
    return <Body>Press the escape key</Body>;
  }

  return <Button onClick={() => setOpen(true)}>Reset</Button>;
};
