import React from 'react';

import { LOADING_STATES } from '../../constants';
import LoadingButton from '../LoadingButton';

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
      const wrapper = renderToHtml(<LoadingButton />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
