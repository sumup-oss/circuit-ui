import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Button from '.';

describe('Button', () => {
  it('should not render if there is no click handler, label, or children', () => {
    const button = renderer.create(<Button />);
    expect(button).toMatchSnapshot();
  });
  it('should be disabled if the disabled property is passed', () => {
    const button = renderer.create(
      <Button disabled={true} onClick={() => {}}>
        I'm disabled
      </Button>
    );
    expect(button).toMatchSnapshot();
  });
  it('should take the body text as a child', () => {
    const output = mount(<Button onClick={() => {}}>Hello World</Button>);
    expect(output.text()).toContain('Hello World');
  });
});
