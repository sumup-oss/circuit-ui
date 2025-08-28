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

import { Flag } from './Flag.js';
import { FLAGS } from './constants.js';
import classes from './FlagStory.module.css';

export default {
  title: 'Components/Flag',
  component: Flag,
  tags: ['status:stable'],
};

export const Base = () => {
  // eslint-disable-next-line compat/compat
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  return (
    <div className={classes.list}>
      {FLAGS.map((code) => (
        <div key={code} className={classes.wrapper}>
          <Flag key={code} countryCode={code} alt="" width={32} />
          <Body>
            {code === 'XX' ? 'Unknown' : regionNames.of(code)} ({code})
          </Body>
        </div>
      ))}
    </div>
  );
};

export const Example = () => (
  <Flag countryCode="PR" alt="Puerto Rico" width={32} />
);
Example.tags = ['!dev'];
Example.parameters = {
  chromatic: { disableSnapshot: true },
};
