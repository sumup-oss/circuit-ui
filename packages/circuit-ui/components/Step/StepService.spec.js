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

import * as StepService from './StepService';

describe('StepService', () => {
  describe('calculateNextStep', () => {
    it('should return next step based on the first step by default', () => {
      expect(StepService.calculateNextStep()).toEqual(1);
      expect(StepService.calculateNextStep({ firstStep: 2 })).toEqual(3);
    });

    it('should support custom step interval', () => {
      expect(
        StepService.calculateNextStep({ step: 1, stepInterval: 3 }),
      ).toEqual(4);
    });

    it('should increment step when total steps are not specified', () => {
      expect(StepService.calculateNextStep({ step: 1 })).toEqual(2);
      expect(StepService.calculateNextStep({ step: 2 })).toEqual(3);
    });

    it('should return first step in the end when total steps and cycle opts are specified', () => {
      const baseOpts = { firstStep: 0, totalSteps: 2, cycle: true };

      expect(StepService.calculateNextStep({ step: 0, ...baseOpts })).toEqual(
        1,
      );
      expect(StepService.calculateNextStep({ step: 1, ...baseOpts })).toEqual(
        baseOpts.firstStep,
      );
    });

    it('should return last step in the end when total steps without cycle are specified', () => {
      const baseOpts = { firstStep: 0, totalSteps: 2, cycle: false };

      expect(StepService.calculateNextStep({ step: 0, ...baseOpts })).toEqual(
        1,
      );
      expect(StepService.calculateNextStep({ step: 1, ...baseOpts })).toEqual(
        baseOpts.totalSteps - 1,
      );
    });
  });

  describe('calculatePreviousStep', () => {
    it('should return first step by default', () => {
      expect(StepService.calculatePreviousStep()).toEqual(0);
      expect(StepService.calculatePreviousStep({ firstStep: 2 })).toEqual(2);
    });

    it('should support custom step interval', () => {
      expect(
        StepService.calculatePreviousStep({ step: 2, stepInterval: 2 }),
      ).toEqual(0);
    });

    it('should decrement step when total steps are not specified', () => {
      expect(StepService.calculatePreviousStep({ step: 3 })).toEqual(2);
      expect(StepService.calculatePreviousStep({ step: 2 })).toEqual(1);
    });

    it('should return to last step when total steps and cycle opts are specified', () => {
      const baseOpts = { firstStep: 0, totalSteps: 2, cycle: true };

      expect(
        StepService.calculatePreviousStep({ step: 1, ...baseOpts }),
      ).toEqual(0);
      expect(
        StepService.calculatePreviousStep({ step: 0, ...baseOpts }),
      ).toEqual(baseOpts.totalSteps - 1);
    });

    it('should always return to first step in the end when cycle is specified', () => {
      const baseOpts = { firstStep: 0, totalSteps: 2, cycle: false };

      expect(
        StepService.calculatePreviousStep({ step: 1, ...baseOpts }),
      ).toEqual(0);
      expect(
        StepService.calculatePreviousStep({ step: 0, ...baseOpts }),
      ).toEqual(baseOpts.firstStep);
    });
  });

  describe('generatePropGetters', () => {
    it('should return all necessary getters', () => {
      const expected = expect.objectContaining({
        getPlayControlProps: expect.any(Function),
        getPauseControlProps: expect.any(Function),
        getNextControlProps: expect.any(Function),
        getPreviousControlProps: expect.any(Function),
      });
      const getters = StepService.generatePropGetters();

      expect(getters).toMatchObject(expected);
    });

    it('should add actions to elements onclick handler', () => {
      const actions = {
        play: jest.fn(),
        pause: jest.fn(),
        next: jest.fn(),
        previous: jest.fn(),
      };
      const getters = StepService.generatePropGetters(actions);

      getters.getPlayControlProps().onClick();
      getters.getPauseControlProps().onClick();
      getters.getNextControlProps().onClick();
      getters.getPreviousControlProps().onClick();

      expect(actions.play).toHaveBeenCalledTimes(1);
      expect(actions.pause).toHaveBeenCalledTimes(1);
      expect(actions.next).toHaveBeenCalledTimes(1);
      expect(actions.previous).toHaveBeenCalledTimes(1);
    });

    it('should add aria-labels to elements', () => {
      const getters = StepService.generatePropGetters();

      expect(getters.getPlayControlProps()).toMatchObject({
        'aria-label': 'play',
      });
      expect(getters.getPauseControlProps()).toMatchObject({
        'aria-label': 'pause',
      });
      expect(getters.getNextControlProps()).toMatchObject({
        'aria-label': 'next',
      });
      expect(getters.getPreviousControlProps()).toMatchObject({
        'aria-label': 'previous',
      });
    });

    it('should pass custom props to elements', () => {
      const getters = StepService.generatePropGetters();
      const customProps = {
        foo: 'bar',
        onCopy: jest.fn(),
      };

      expect(getters.getPlayControlProps(customProps)).toMatchObject(
        customProps,
      );
      expect(getters.getPauseControlProps(customProps)).toMatchObject(
        customProps,
      );
      expect(getters.getNextControlProps(customProps)).toMatchObject(
        customProps,
      );
      expect(getters.getPreviousControlProps(customProps)).toMatchObject(
        customProps,
      );
    });

    it('should not allow custom props to overwrite action onclick handler', () => {
      const actions = {
        play: jest.fn(),
        pause: jest.fn(),
        next: jest.fn(),
        previous: jest.fn(),
      };
      const customProps = {
        onClick: jest.fn(),
      };
      const getters = StepService.generatePropGetters(actions);

      getters.getPlayControlProps(customProps).onClick();
      getters.getPauseControlProps(customProps).onClick();
      getters.getNextControlProps(customProps).onClick();
      getters.getPreviousControlProps(customProps).onClick();

      expect(customProps.onClick).toHaveBeenCalledTimes(4);
      expect(actions.play).toHaveBeenCalledTimes(1);
      expect(actions.pause).toHaveBeenCalledTimes(1);
      expect(actions.next).toHaveBeenCalledTimes(1);
      expect(actions.previous).toHaveBeenCalledTimes(1);
    });
  });
});
