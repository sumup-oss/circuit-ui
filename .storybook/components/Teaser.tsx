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

import type { ReactNode } from 'react';

import { Headline, Card } from '../../packages/circuit-ui/index.js';
import { slugify } from '../slugify.js';
import classes from './Teaser.module.css';

interface TeaserProps {
  title: string;
  children: ReactNode;
}

const Teaser = ({ title, children }: TeaserProps) => (
  <Card className={classes.base}>
    <Headline as="h2" size="three" id={slugify(title)}>
      {title}
    </Headline>

    {children}
  </Card>
);

export default Teaser;
