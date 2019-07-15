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
import Selector from '../../../src/components/Selector';

const SelectorWithState = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ display: 'flex' }}>
      <Selector
        style={{ width: 'calc(50% - 4px)', marginRight: '12px' }}
        selected={selected === 0}
        onClick={() => setSelected(0)}
      >
        Credit Card
      </Selector>
      <Selector
        style={{ width: 'calc(50% - 4px)' }}
        selected={selected === 1}
        onClick={() => setSelected(1)}
      >
        Bank transfer
      </Selector>
    </div>
  );
};

export default SelectorWithState;
