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
    const wrapper = mount(
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
      const wrapper = mount(
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
      let resolve, reject, wrapper;
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
        wrapper = mount(
          <ButtonContainer
            onClick={handleClick}
            delayMs={animationDelay}
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

      // TODO: I don't really trust these tests. Not sure exactly how stuff
      // behaves with mocked timers.
      describe('when handling a click event', () => {
        it('should not show the loading icon, if the Promise resolves in delayMs', () => {
          wrapper.simulate('click');
          // Sets timeout before
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.INACTIVE);
          resolve();
          wrapper.update();
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.INACTIVE);
        });

        it('should show the loading icon with Spinner, if the Promise takes longer than delayMs to resolve', () => {
          wrapper.simulate('click');
          wrapper.update();
          // Sets timeout before
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.INACTIVE);
          wrapper.update();
          jest.runOnlyPendingTimers();
          wrapper.update();
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.ACTIVE);
        });

        // FIXME: this test does not work because the wrapper does not reflect
        // the correct component state. Logging from the component shows that
        // the component state gets updated properly. Enzyme's wrapper
        // simply does not reflect it.
        //
        // Possibly related Github issues:
        // - https://github.com/airbnb/enzyme/issues/1153
        // - https://github.com/airbnb/enzyme/issues/1400
        it.skip('should show the loading icon with Success, after the Promise resolves', () => {
          wrapper.simulate('click');
          jest.runOnlyPendingTimers();
          resolve();
          wrapper.update();
          jest.runOnlyPendingTimers();
          wrapper.update();
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.SUCCESS);
        });

        // FIXME: also does not work. This whole suite is a mess.
        it.skip('should call the onAnimationComplete prop after the Success icon has been visible', () => {
          wrapper.simulate('click');
          jest.runOnlyPendingTimers();
          resolve();
          wrapper.update();
          jest.runOnlyPendingTimers();
          expect(handleAnimationComplete).toHaveBeenCalled();
        });
      });

      describe('returning a rejected promise', () => {
        it.skip('should hide the loading icon if the Promise is rejected', () => {
          wrapper.simulate('click');
          jest.runOnlyPendingTimers();
          reject();
          wrapper.update();
          jest.runOnlyPendingTimers();
          wrapper.update();
          expect(getLoadingState(wrapper)).toBe(LOADING_STATES.INACTIVE);
        });
      });
    });
  });
});
