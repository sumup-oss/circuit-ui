import React from 'react';

import ButtonContainer from './ButtonContainer';
import { LOADING_STATES } from './constants';

function getLoadingState(wrapper) {
  return wrapper
    .find('LoadingIcon')
    .first()
    .prop('loadingState');
}

describe('ButtonContainer', () => {
  describe('without a click handler', () => {
    const wrapper = shallow(
      <ButtonContainer href="http://google.com">Click</ButtonContainer>
    );

    it('should not render a LoadingIcon', () => {
      const loadingIcon = wrapper.find('LoadingIcon');
      expect(loadingIcon).toHaveLength(0);
    });
  });

  describe('with a click handler', () => {
    describe('returning nothing', () => {
      const handleClick = jest.fn();
      const wrapper = shallow(
        <ButtonContainer onClick={handleClick}>Click</ButtonContainer>
      );

      beforeAll(() => {
        jest.useFakeTimers();
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      beforeEach(() => {
        jest.resetAllMocks();
      });

      it('should call the handler', () => {
        wrapper.simulate('click');
        expect(handleClick).toHaveBeenCalled();
      });

      it('should never set any timers', () => {
        wrapper.simulate('click');
        expect(setTimeout).toHaveBeenCalledTimes(0);
      });
    });

    describe('returning a resolving promise', () => {
      const animationDelay = 1000;
      let resolve;
      let reject;
      let wrapper;
      const handleAnimationComplete = jest.fn();

      beforeAll(() => {
        jest.useFakeTimers();
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      beforeEach(() => {
        const handleClick = jest.fn(
          () =>
            new Promise((res, rej) => {
              resolve = res;
              reject = rej;
            })
        );
        wrapper = shallow(
          <ButtonContainer
            onClick={handleClick}
            loadingDelay={animationDelay}
            onAnimationComplete={handleAnimationComplete}
          >
            Click
          </ButtonContainer>
        );
      });

      it('should initially not show the LoadingIcon', () => {
        const loadingIcon = wrapper.find('LoadingIcon');
        expect(loadingIcon).toHaveLength(1);
        const actualLoadingState = loadingIcon.first().prop('loadingState');
        expect(actualLoadingState).toBe(LOADING_STATES.INACTIVE);
      });

      describe('when handling a click event', () => {
        it('should not show the loading icon, if the Promise resolves in loadingDelay', () => {
          wrapper.simulate('click');
          // Sets timeout before
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.INACTIVE);
          resolve();
          wrapper.update();
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.INACTIVE);
        });

        it('should show the loading icon with Spinner, if the Promise takes longer than loadingDelay to resolve', () => {
          wrapper.simulate('click');
          wrapper.update();
          // Sets timeout before
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.INACTIVE);
          jest.runOnlyPendingTimers();
          wrapper.update();
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.ACTIVE);
        });

        it('should show the loading icon with Success, after the Promise resolves', async () => {
          wrapper.simulate('click');
          jest.runOnlyPendingTimers();
          await resolve();
          wrapper.update();
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.SUCCESS);
        });

        it('should call the onAnimationComplete prop after the Success icon has been visible', async () => {
          wrapper.simulate('click');
          await resolve();
          wrapper.update();
          jest.runOnlyPendingTimers();
          expect(handleAnimationComplete).toHaveBeenCalled();
        });
      });

      describe('returning a rejected promise', () => {
        it('should hide the loading icon if the Promise is rejected', async () => {
          wrapper.simulate('click');
          await reject();
          wrapper.update();
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.INACTIVE);
        });
      });
    });
  });
});
