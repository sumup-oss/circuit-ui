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

import { getSelectedChildIndex, getSecondaryChild } from './utils';

describe('getSelectedChildIndex', () => {
  it('should return the correct index of the selected child on an array', () => {
    const children = [
      { props: { selected: false } },
      { props: { selected: true } },
      { props: { selected: false } },
    ];
    const selectedChild = getSelectedChildIndex(children);

    expect(selectedChild).toEqual(1);
  });

  it('should return 0 for a single child', () => {
    const children = { props: { selected: true } };
    const selectedChild = getSelectedChildIndex(children);

    expect(selectedChild).toEqual(0);
  });

  it('should return the first selected index for multiple selected children', () => {
    const children = [
      { props: { selected: true } },
      { props: { selected: false } },
      { props: { selected: true } },
    ];
    const selectedChild = getSelectedChildIndex(children);

    expect(selectedChild).toEqual(0);
  });
});

describe('getSecondaryChild', () => {
  it('return a secondary item for a single child', () => {
    const children = { props: { secondary: false } };
    expect(getSecondaryChild(children).props.secondary).toBe(true);
  });

  it('should return all secondary children for an array of items', () => {
    const children = [
      { props: { secondary: false } },
      { props: { secondary: false } },
    ];
    expect(getSecondaryChild(children)[0].props.secondary).toBe(true);
    expect(getSecondaryChild(children)[1].props.secondary).toBe(true);
  });

  it('should return null when no children is received', () => {
    expect(getSecondaryChild(undefined)).toBe(null);
  });

  it('should return a visible secondary child when it should be visible', () => {
    const children = { props: { secondary: false } };
    expect(getSecondaryChild(children, true).props).toEqual({
      secondary: true,
      visible: true,
    });
  });
});
