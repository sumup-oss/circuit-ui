import 'jest-enzyme';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';
import { create } from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.create = create;
global.mount = mount;

// This is defined by webpack in storybook builds using the DefinePlugin plugin.
global.STORYBOOK = false;

// Add a snapshot serializer that removes random hashes
// from emotion class names.
expect.addSnapshotSerializer(
  createSerializer(emotion, {
    classNameReplacer(className, index) {
      return `circuit-${index}`;
    }
  })
);
