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

import { describe, expect, it } from 'vitest';

import type { FeatureSection } from './components/PlanTable/PlanTable.js';
import { generateFromIndex, getFirstEightRows } from './utils.js';
import type { FeatureRowProps } from './components/TableRow/FeatureRow.js';

const feature1: FeatureRowProps = {
  featureDescription: {
    title: 'title',
  },
  values: [],
};
const feature2: FeatureRowProps = {
  featureDescription: {
    title: 'title',
  },
  values: [],
};
const feature3: FeatureRowProps = {
  featureDescription: {
    title: 'title',
  },
  values: [],
};
const feature4: FeatureRowProps = {
  featureDescription: {
    title: 'title',
  },
  values: [],
};
const feature5: FeatureRowProps = {
  featureDescription: {
    title: 'title',
  },
  values: [],
};
const feature6: FeatureRowProps = {
  featureDescription: {
    title: 'title',
  },
  values: [],
};
const feature7: FeatureRowProps = {
  featureDescription: {
    title: 'title',
  },
  values: [],
};
const feature8: FeatureRowProps = {
  featureDescription: {
    title: 'title',
  },
  values: [],
};

describe('getFirstEightRows', () => {
  it('no sections', () => {
    expect(getFirstEightRows([])).toEqual([]);
  });
  it('one section with 2 features', () => {
    const data: FeatureSection[] = [
      {
        title: 'Banking basics',
        features: [feature1, feature2],
      },
    ];
    expect(getFirstEightRows(data)).toEqual(data);
  });
  it('one section with 8 features', () => {
    const data: FeatureSection[] = [
      {
        title: 'Banking basics',
        features: [
          feature1,
          feature2,
          feature3,
          feature4,
          feature5,
          feature6,
          feature7,
          feature8,
        ],
      },
    ];
    expect(getFirstEightRows(data)).toEqual([
      {
        title: 'Banking basics',
        features: [
          feature1,
          feature2,
          feature3,
          feature4,
          feature5,
          feature6,
          feature7,
        ],
      },
    ]);
  });
  it('two section with 2 features', () => {
    const data: FeatureSection[] = [
      {
        title: 'section 1',
        features: [feature1, feature2],
      },
      {
        title: 'section 2',
        features: [feature3, feature4],
      },
    ];
    expect(getFirstEightRows(data)).toEqual(data);
  });
  it('two section with 5 features', () => {
    const data: FeatureSection[] = [
      {
        title: 'section 1',
        features: [feature1, feature2, feature3, feature4, feature5],
      },
      {
        title: 'section 2',
        features: [feature1, feature2, feature3, feature4, feature5],
      },
    ];
    expect(getFirstEightRows(data)).toEqual([
      {
        title: 'section 1',
        features: [feature1, feature2, feature3, feature4, feature5],
      },
      {
        title: 'section 2',
        features: [feature1],
      },
    ]);
  });
});

describe('generateFromIndex', () => {
  it('empty array', () => {
    expect(generateFromIndex([], [])).toEqual([]);
  });
  it('empty positions', () => {
    expect(generateFromIndex([1, 2, 3], [])).toEqual([]);
  });
  it('empty data', () => {
    expect(generateFromIndex([], [1, 2, 3])).toEqual([
      undefined,
      undefined,
      undefined,
    ]);
  });
  it('one position', () => {
    expect(generateFromIndex([1, 2, 3], [1])).toEqual([2]);
  });
  it('multiple positions', () => {
    expect(generateFromIndex([1, 2, 3], [0, 2])).toEqual([1, 3]);
  });
});
