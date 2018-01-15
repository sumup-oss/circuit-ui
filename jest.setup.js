import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

// This is defined by webpack in storybook builds using the DefinePlugin plugin.
global.STORYBOOK = false;
