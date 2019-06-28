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

import { LOADING_STATES } from '../../constants';
import LoadingButton from '.';

describe('LoadingButton', () => {
  describe('Style tests', () => {
    it('should have default styles', () => {
      const actual = create(<LoadingButton />);
      expect(actual).toMatchSnapshot();
    });

    it('should have active loading styles', () => {
      const actual = create(
        <LoadingButton loadingState={LOADING_STATES.ACTIVE} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should have isLoading styles', () => {
      const actual = create(<LoadingButton isLoading />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('isLoading', () => {
    it('should not bind the onClick handler to the Button', () => {
      const mock = jest.fn();
      const wrapper = shallow(<LoadingButton isLoading onClick={mock} />);

      wrapper
        .find('Button')
        .first()
        .simulate('click');

      expect(mock).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <LoadingButton>Loading Button</LoadingButton>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
