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

/* eslint-disable max-len */
import { SLIDE_DIRECTIONS } from '../../constants';

import * as SlideService from './SlideService';

describe('SlideService', () => {
  describe('getStackOrder', () => {
    it('should return zero index when called without arguments', () => {
      expect(SlideService.getStackOrder()).toEqual(0);
    });

    describe('when going forward', () => {
      it('should return top index for active slide', () => {
        expect(
          SlideService.getStackOrder(0, 0, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(2);
      });

      it('should return under top index for previous active slide', () => {
        expect(
          SlideService.getStackOrder(2, 0, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(1);
      });

      it('should return negative index for other slides', () => {
        expect(
          SlideService.getStackOrder(1, 0, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(-1);
      });
    });

    describe('when going back', () => {
      it('should return top index for previous active slide', () => {
        expect(
          SlideService.getStackOrder(2, 0, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(2);
      });

      it('should return under top index for active slide', () => {
        expect(
          SlideService.getStackOrder(0, 0, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(1);
      });

      it('should return negative index for other slides', () => {
        expect(
          SlideService.getStackOrder(1, 0, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(-1);
      });
    });
  });

  describe('shouldAnimate', () => {
    describe('when going forward', () => {
      it('should animate slide with index for current active step', () => {
        expect(
          SlideService.shouldAnimate(0, 0, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(true);
      });

      it('should not animate slide for not matching index and steps', () => {
        expect(
          SlideService.shouldAnimate(0, 1, 2, SLIDE_DIRECTIONS.FORWARD)
        ).toEqual(false);
      });
    });

    describe('when going back', () => {
      it('should animate slide with index for previous active step', () => {
        expect(
          SlideService.shouldAnimate(2, 0, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(true);
      });

      it('should not animate slide for not matching index steps when going back', () => {
        expect(
          SlideService.shouldAnimate(0, 1, 2, SLIDE_DIRECTIONS.BACK)
        ).toEqual(false);
      });
    });
  });

  describe('getDynamicWidth', () => {
    it('should return 100% when width is not specified', () => {
      expect(SlideService.getDynamicWidth()).toEqual('100%');
    });

    it('should return width in pixels when it is specified', () => {
      expect(SlideService.getDynamicWidth(500)).toEqual('500px');
    });
  });
});
