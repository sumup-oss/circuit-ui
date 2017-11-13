import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import FlashAlert from '.';

describe('Flash Alert', () => {
  it('should not render if there happens to be no type and data(or children)', () => {
    const alert = renderer.create(<FlashAlert />);
    expect(alert).toMatchSnapshot();
  });
  it('should take the body text as a child', () => {
    const output = mount(<FlashAlert type="error">Hello World</FlashAlert>);
    expect(output.text()).toContain('Hello World');
  });
});
