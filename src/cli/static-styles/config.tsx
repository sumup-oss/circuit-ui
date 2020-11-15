/**
 * Copyright 2020, SumUp Ltd.
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

import React from 'react';
import { light } from '@sumup/design-tokens';

// Can't import from the main index file because babel-node chokes when
// when transpiling so many files to extract the docgen information.
import Badge from '../../components/Badge';

import { ComponentConfig, PropTypes } from './types';

const element = (props: any) => <div {...props} />;

export const propTypes: PropTypes = {
  string: ['string'],
  number: [1],
  boolean: [true, false],
  func: [() => {}],
  element: [element],
};

export const themes = { light };
export const components: ComponentConfig[] = [
  { name: 'Badge', component: Badge },
];
