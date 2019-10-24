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

import { ACTIVE } from '../../constants';
import Button from '.';

describe('Button', () => {
  describe('Style tests', () => {
    it('should have default styles', () => {
      const actual = create(<Button />);
      expect(actual).toMatchSnapshot();
    });

    it('should have active loading styles', () => {
      const actual = create(<Button loadingState={ACTIVE} />);
      expect(actual).toMatchSnapshot();
    });

    it('should have isLoading styles', () => {
      const actual = create(<Button isLoading />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Logic tests', () => {
    it('should not bind the click handler to the button while loading', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <Button isLoading onClick={onClick} data-testid="loading-button" />
      );

      act(() => {
        fireEvent.click(getByTestId('loading-button'));
      });

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Button>Loading Button</Button>);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
