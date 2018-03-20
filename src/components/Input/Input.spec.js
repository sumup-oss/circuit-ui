import React from 'react';

import Input from '.';
import Label from '../Label';

describe('Input', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Input />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with warning styles when passed the hasWarning prop', () => {
    const actual = create(<Input hasWarning />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<Input invalid />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with valid styles when passed the showValid prop', () => {
    const actual = create(<Input showValid />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with right aligned text', () => {
    const actual = create(<Input textAlign="right" />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with optional styles when passed the optional prop', () => {
    const actual = create(<Input optional />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<Input disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize error over optional styles', () => {
    const actual = create(<Input invalid disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with inline styles when passed the inline prop', () => {
    const actual = create(<Input inline />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<Input noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with stretched styles when passed the stretch prop', () => {
    const actual = create(<Input stretch />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="id">
        Label
        <Input id="id" />
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
