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
import { sizes } from '../../../../styles/constants';
import LoadingIcon from '.';

const { KILO, MEGA, GIGA } = sizes;

describe('LoadingIcon', () => {
  describe('Style tests', () => {
    it('should have disabled LoadingIcon styles', () => {
      const actual = create(
        <LoadingIcon loadingState={LOADING_STATES.DISABLED} size={KILO} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should have active LoadingIcon styles', () => {
      const actual = create(
        <LoadingIcon loadingState={LOADING_STATES.ACTIVE} size={KILO} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should have success LoadingIcon styles', () => {
      const actual = create(
        <LoadingIcon loadingState={LOADING_STATES.SUCCESS} size={KILO} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should have error LoadingIcon styles', () => {
      const actual = create(
        <LoadingIcon loadingState={LOADING_STATES.ERROR} size={KILO} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should have kilo LoadingIcon styles', () => {
      const actual = create(
        <LoadingIcon loadingState={LOADING_STATES.DISABLED} size={KILO} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should have mega LoadingIcon styles', () => {
      const actual = create(
        <LoadingIcon loadingState={LOADING_STATES.DISABLED} size={MEGA} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should have giga LoadingIcon styles', () => {
      const actual = create(
        <LoadingIcon loadingState={LOADING_STATES.DISABLED} size={GIGA} />
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <LoadingIcon loadingState={LOADING_STATES.DISABLED} size={KILO} />
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
