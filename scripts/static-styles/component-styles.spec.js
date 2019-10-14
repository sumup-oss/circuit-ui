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

import { theme as themes } from '../../src';

import componentStyles from './component-styles';
import config, { getComponentInfo, PropTypes } from './config';
import * as fixtures from './__fixtures__';

const { circuit: theme } = themes;

describe('Component styles', () => {
  it('should extract the component styles', () => {
    const { components } = config;
    const actual = componentStyles({
      theme,
      components
    });
    expect(typeof actual).toBe('string');
    components.forEach(({ name }) => {
      expect(actual).toContain(name);
    });
  });

  describe('component types', () => {
    it('should extract the styles from a styled component', () => {
      const component = {
        name: 'styled-component',
        component: fixtures.StyledComponent,
        props: {
          value: PropTypes.string,
          disabled: PropTypes.bool
        }
      };
      const components = [component];
      const actual = componentStyles({
        theme,
        components
      });
      expect(typeof actual).toBe('string');
      expect(actual).toMatchSnapshot();
    });

    it('should extract the styles from a functional component', () => {
      const component = getComponentInfo(fixtures.FunctionalComponent);
      const components = [component];
      const actual = componentStyles({
        theme,
        components
      });
      expect(typeof actual).toBe('string');
      expect(actual).toMatchSnapshot();
    });
  });
});
