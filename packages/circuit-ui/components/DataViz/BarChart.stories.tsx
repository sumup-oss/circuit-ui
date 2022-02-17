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

import { BarChart as VBarChart } from '@visa/charts-react';

import docs from './DataViz.docs.mdx';

export default {
  title: 'Features/BarChart',
  parameters: {
    docs: { page: docs },
  },
};

const data = [
  { month: 'Jan', value: 15 },
  { month: 'Feb', value: 2 },
  { month: 'Mar', value: 18 },
  { month: 'Apr', value: 19 },
  { month: 'May', value: 7 },
  { month: 'Jun', value: 7 },
];

export const VisaChartComponents = () => (
  <VBarChart
    mainTitle={'BarChart'}
    subTitle={'Vertical (default) bar chart example'}
    data={data}
    ordinalAccessor={'month'}
    valueAccessor={'value'}
    height={400}
    width={600}
    colors={['#000']}
    roundedCorner={5}
    accessibility={{ hideTextures: true }}
  />
);
