/**
 * Copyright 2025, SumUp Ltd.
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

import { Body } from '../Body/index.js';

import { Flag, type FlagProps } from './Flag.js';
import { COUNTRIES } from './constants.js';
import classes from './FlagStory.module.css';

export default {
  title: 'Components/Flag',
  component: Flag,
  tags: ['status:stable'],
};

export const Base = () => (
  <div className={classes.list}>
    {Object.entries(COUNTRIES).map(([code, name]) => (
      <div key={code} className={classes.wrapper}>
        <Flag
          key={code}
          countryCode={code.toUpperCase() as FlagProps['countryCode']}
          alt=""
          width={32}
        />
        <Body>
          {name} ({code.toUpperCase()})
        </Body>
      </div>
    ))}
  </div>
);

export const Example = () => (
  <Flag countryCode="PR" alt="Puerto Rico" width={32} />
);
Example.tags = ['!dev'];
Example.parameters = {
  chromatic: { disableSnapshot: true },
};
