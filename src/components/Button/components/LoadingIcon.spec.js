import React from 'react';

import { LOADING_STATES } from '../constants';
import { sizes } from '../../../styles/constants';
import LoadingIcon from './LoadingIcon';

const { KILO, MEGA, GIGA } = sizes;

describe('LoadingIcon', () => {
  /**
   * Style tests.
   */
  it('should have inactive LoadingIcon styles', () => {
    const actual = create(
      <LoadingIcon loadingState={LOADING_STATES.INACTIVE} size={KILO} />
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

  it('should have kilo LoadingIcon styles', () => {
    const actual = create(
      <LoadingIcon loadingState={LOADING_STATES.INACTIVE} size={KILO} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have mega LoadingIcon styles', () => {
    const actual = create(
      <LoadingIcon loadingState={LOADING_STATES.INACTIVE} size={MEGA} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have giga LoadingIcon styles', () => {
    const actual = create(
      <LoadingIcon loadingState={LOADING_STATES.INACTIVE} size={GIGA} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <LoadingIcon loadingState={LOADING_STATES.INACTIVE} size={KILO} />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
