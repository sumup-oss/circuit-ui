import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Notification from '.';

describe('Notification', () => {
  it('should render error type when error prop is passed', () => {
    const notification = renderer.create(
      <Notification type="error" msg="there was an error" />
    );
    expect(notification).toMatchSnapshot();
  });
  it('should render notification of info type when info prop is passed', () => {
    const notification = renderer.create(
      <Notification type="info" msg="info here" />
    );
    expect(notification).toMatchSnapshot();
  });
  it('should render notification of warning type when warning prop is passed', () => {
    const notification = renderer.create(
      <Notification type="warning" msg="warning here" />
    );
    expect(notification).toMatchSnapshot();
  });
  it('should render notification of success type when success prop is passed', () => {
    const notification = renderer.create(
      <Notification type="success" msg="success here" />
    );
    expect(notification).toMatchSnapshot();
  });
  it('should not render if there happens to be no children or data', () => {
    const notification = renderer.create(<Notification />);
    expect(notification).toMatchSnapshot();
  });
  it('should take the body text as a child', () => {
    const output = mount(<Notification>Hello World</Notification>);
    expect(output.text()).toContain('Hello World');
  });
});
