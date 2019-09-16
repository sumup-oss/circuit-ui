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

import LoadingButton from './LoadingButton';
import { LOADING_STATES } from './constants';

describe('LoadingButton', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<LoadingButton />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with loading styles', () => {
      const actual = create(<LoadingButton isLoading={true} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles after loading has finished', async () => {
      const { rerender, container } = render(
        <LoadingButton isLoading={true} />
      );

      rerender(<LoadingButton isLoading={false} />);

      await wait();

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('getDerivedStateFromProps()', () => {
    it('should update the state to ACTIVE', () => {
      const nextProps = { isLoading: true };
      const prevState = { loadingState: LOADING_STATES.DISABLED };
      const actual = LoadingButton.getDerivedStateFromProps(
        nextProps,
        prevState
      );
      const expected = { loadingState: LOADING_STATES.ACTIVE };

      expect(actual).toEqual(expected);
    });

    describe('exit animations', () => {
      const nextProps = { isLoading: false };
      const prevState = { loadingState: LOADING_STATES.ACTIVE };

      it('should update the state to DISABLED when there is no exit animation', () => {
        const actual = LoadingButton.getDerivedStateFromProps(
          nextProps,
          prevState
        );
        const expected = { loadingState: LOADING_STATES.DISABLED };

        expect(actual).toEqual(expected);
      });

      it('should update the state to SUCCESS when there is a success animation', () => {
        const actual = LoadingButton.getDerivedStateFromProps(
          { ...nextProps, exitAnimation: LoadingButton.SUCCESS },
          prevState
        );
        const expected = { loadingState: LOADING_STATES.SUCCESS };

        expect(actual).toEqual(expected);
      });

      it('should update the state to ERROR when there is an error animation', () => {
        const actual = LoadingButton.getDerivedStateFromProps(
          { ...nextProps, exitAnimation: LoadingButton.ERROR },

          prevState
        );
        const expected = { loadingState: LOADING_STATES.ERROR };

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('onAnimationComplete()', () => {
    it('should dispatch the provided onAnimationComplete handler', async () => {
      const onAnimationCompleteMock = jest.fn();
      const { rerender } = render(
        <LoadingButton
          isLoading={true}
          onAnimationComplete={onAnimationCompleteMock}
        />
      );

      rerender(
        <LoadingButton
          isLoading={false}
          onAnimationComplete={onAnimationCompleteMock}
        />
      );

      await wait();

      expect(onAnimationCompleteMock).toHaveBeenCalledTimes(1);
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
