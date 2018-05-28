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

    describe('isLoading false nextProp with LOADING_STATEC.ACTIVE', () => {
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
      const wrapper = shallow(<Container onAnimationComplete={mock} />);

      wrapper.instance().onAnimationComplete();

      expect(mock).toHaveBeenCalled();
    });

    it('should update the state with LOADING_STATES.DISABLED', () => {
      const wrapper = shallow(<Container />);
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
      const wrapper = renderToHtml(<Container />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
