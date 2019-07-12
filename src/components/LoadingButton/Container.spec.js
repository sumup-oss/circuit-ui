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

import Container from './Container';
import { LOADING_STATES } from './constants';

describe('Container Container', () => {
  describe('Style tests', () => {
    it('should have default styles', () => {
      const actual = create(<Container />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('getDerivedStateFromProps()', () => {
    describe('isLoading nextProp', () => {
      it('should update the state with LOADING_STATES.ACTIVE', () => {
        const wrapper = mount(<Container isLoading />);
        const expected = LOADING_STATES.ACTIVE;

        expect(wrapper.state('loadingState')).toBe(expected);
      });
    });

    describe('isLoading false nextProp with LOADING_STATE.ACTIVE', () => {
      describe('no exitAnimation', () => {
        it('should update the state with LOADING_STATES.DISABLED', () => {
          const wrapper = mount(<Container isLoading />);
          const expected = LOADING_STATES.DISABLED;

          wrapper.setProps({
            isLoading: false
          });

          expect(wrapper.state('loadingState')).toBe(expected);
        });
      });

      describe('exitAnimation LOADING_STATES.SUCCESS', () => {
        it('should update the state with LOADING_STATES.SUCCESS', () => {
          const wrapper = mount(
            <Container isLoading exitAnimation={Container.SUCCESS} />
          );
          const expected = LOADING_STATES.SUCCESS;

          wrapper.setProps({
            isLoading: false
          });

          expect(wrapper.state('loadingState')).toBe(expected);
        });
      });

      describe('exitAnimation LOADING_STATES.ERROR', () => {
        it('should update the state with LOADING_STATES.ERROR', () => {
          const wrapper = mount(
            <Container isLoading exitAnimation={Container.ERROR} />
          );
          const expected = LOADING_STATES.ERROR;

          wrapper.setProps({
            isLoading: false
          });

          expect(wrapper.state('loadingState')).toBe(expected);
        });
      });
    });
  });

  describe('onAnimationComplete()', () => {
    it('should dispatch the provided onAnimationComplete handler', () => {
      const mock = jest.fn();
      const wrapper = mount(<Container onAnimationComplete={mock} />);

      wrapper.instance().onAnimationComplete();

      expect(mock).toHaveBeenCalled();
    });

    it('should update the state with LOADING_STATES.DISABLED', () => {
      const wrapper = mount(<Container />);
      const expected = LOADING_STATES.DISABLED;

      wrapper.setState({
        loadingState: LOADING_STATES.ACTIVE
      });

      wrapper.instance().onAnimationComplete();

      expect(wrapper.state('loadingState')).toBe(expected);
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <Container>Loading Button Container</Container>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
