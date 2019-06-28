/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

import Element from './Element';

describe('Element', () => {
  it('should render as basic html component', () => {
    const wrapper = shallow(<Element as="span" />);
    expect(wrapper.find('span')).toExist();
  });

  it('should render as custom react component', () => {
    const Custom = () => <div>custom</div>;
    const wrapper = shallow(<Custom />);
    expect(wrapper.text()).toEqual('custom');
  });

  it('should assign refs by using deepRef prop', () => {
    class TestRef extends React.Component {
      ref = React.createRef();

      render() {
        return <Element as="div" deepRef={this.ref} />;
      }
    }

    const wrapper = mount(<TestRef />);
    const refElement = wrapper.instance().ref.current;
    const childElement = wrapper.find('div').getDOMNode();

    expect(refElement).toBe(childElement);
  });
});
