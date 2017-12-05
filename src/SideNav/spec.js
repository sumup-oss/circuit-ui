import React from 'react';
import renderer from 'react-test-renderer';
import { SideNav } from '.';

describe('SideNavigation', () => {
  it('should render expanded side navigation when passed expanded prop', () => {
    const SideNavigation = renderer.create(<SideNav expanded={true} />);
    expect(SideNavigation).toMatchSnapshot();
  });
  it('should render collapsed side navigation when expanded prop is false', () => {
    const SideNavigation = renderer.create(<SideNav expanded={false} />);
    expect(SideNavigation).toMatchSnapshot();
  });
  it('should render collapsed side navigation when there is no expanded prop', () => {
    const SideNavigation = renderer.create(<SideNav />);
    expect(SideNavigation).toMatchSnapshot();
  });
});
