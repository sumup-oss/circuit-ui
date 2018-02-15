import React from 'react';

import TextArea from '.';
import Label from '../Label';

describe('TextArea', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<TextArea />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<TextArea invalid />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with optional styles when passed the optional prop', () => {
    const actual = create(<TextArea optional />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styled when passed the disabled prop', () => {
    const actual = create(<TextArea disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize error over optional styles', () => {
    const actual = create(<TextArea invalid disabled />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="textarea">
        <TextArea id="textarea" />
        Text area
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
