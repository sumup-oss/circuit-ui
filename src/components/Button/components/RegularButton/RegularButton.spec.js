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

import React from 'react';

import Button from '../../Button';

describe('RegularButton', () => {
  /**
   * Style tests.
   */
  it('should have button styles', () => {
    const actual = create(<Button>Button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have kilo button styles', () => {
    const actual = create(<Button size={Button.KILO}>Button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have mega button styles', () => {
    const actual = create(<Button size={Button.MEGA}>Button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have giga button styles', () => {
    const actual = create(<Button size={Button.GIGA}>Button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have disabled button styles', () => {
    const actual = create(<Button disabled>Disabled button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have secondary button styles', () => {
    const actual = create(<Button secondary>Secondary button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have secondary disabled button styles', () => {
    const actual = create(
      <Button secondary disabled>
        Secondary disabled button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have stretch button styles', () => {
    const actual = create(<Button stretch>Stretched button</Button>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Button>Button</Button>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  describe('as anchor element', () => {
    it('should become a link when passed an href prop', () => {
      const { getByTestId } = render(
        <div>
          <Button href="#" data-testid="link-button">
            Link Button
          </Button>
        </div>
      );
      const buttonEl = getByTestId('link-button');
      expect(buttonEl.tagName).toBe('A');
      expect(buttonEl).toHaveAttribute('href');
    });

    it('should accept a target prop', () => {
      const { getByTestId } = render(
        <div>
          <Button href="#" target="_blank" data-testid="link-button">
            Link Button
          </Button>
        </div>
      );
      const buttonEl = getByTestId('link-button');
      expect(buttonEl).toHaveAttribute('target', '_blank');
    });
  });
});
