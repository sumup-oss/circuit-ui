import React from 'react';

import SortArrow from '.';
import { ASCENDING, DESCENDING } from '../../constants';

describe('SortArrow', () => {
  /**
   * Style tests.
   */
  it('should render with both arrows styles', () => {
    const actual = create(<SortArrow />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with ascending arrow styles', () => {
    const actual = create(<SortArrow direction={ASCENDING} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with descending arrow styles', () => {
    const actual = create(<SortArrow direction={DESCENDING} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<SortArrow />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
