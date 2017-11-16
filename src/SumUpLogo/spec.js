import React from 'react';
import renderer from 'react-test-renderer';
import SumUpLogo from '.';

describe('SumUpLogo', () => {
  it("should render old logo when type='old' is passed", () => {
    const logo = renderer.create(<SumUpLogo type="old" />);
    expect(logo).toMatchSnapshot();
  });
  it("should render dark logo when fill='dark' is passed", () => {
    const logo = renderer.create(<SumUpLogo fill="dark" />);
    expect(logo).toMatchSnapshot();
  });
  it("should render blue logo when fill='blue' is passed", () => {
    const logo = renderer.create(<SumUpLogo fill="blue" />);
    expect(logo).toMatchSnapshot();
  });
});
