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

import React, { Component, Fragment } from 'react';

import Aggregator from './Aggregator';

const props = {
  label: 'Aggregator',
  onClick: jest.fn(),
  selectedIcon: 'selected-icon',
  defaultIcon: 'default-icon'
};

class MockedNavigation extends Component {
  state = {
    selected: 1
  };

  render() {
    const { selected } = this.state;
    return (
      <Fragment>
        <Aggregator {...props}>
          <div selected={selected === 0} data-testid="child">
            child
          </div>
        </Aggregator>
        {/* eslint-disable-next-line */}
        <div
          id="sibling"
          selected={selected !== 0}
          onClick={() => this.setState({ selected: 1 })}
        >
          sibling
        </div>
      </Fragment>
    );
  }
}

describe('Aggregator', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = mount(
        <Aggregator {...props}>
          <div data-testid="child">child</div>
        </Aggregator>
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render and match snapshot when open', async () => {
      const actual = mount(
        <Aggregator {...props}>
          <div data-testid="child">child</div>
        </Aggregator>
      );

      actual.find("[className*='nav-aggregator']").simulate('click');
      await new Promise(resolve => setTimeout(resolve));
      actual.update();

      expect(actual).toMatchSnapshot();
    });
  });

  describe('interactions', () => {
    it('should show children and call onClick when clicking the aggregator', () => {
      const actual = mount(
        <Aggregator {...props}>
          <div selected data-testid="child">
            child
          </div>
        </Aggregator>
      );

      actual.find("[className*='nav-aggregator']").simulate('click');
      expect(actual.state().open).toBe(true);
      expect(props.onClick).toHaveBeenCalled();
    });

    it('should show children when clicking the aggregator and no onClick handle is passed', () => {
      const noHandlerProps = {
        ...props,
        onClick: null
      };

      const actual = mount(
        <Aggregator {...noHandlerProps}>
          <div selected data-testid="child">
            child
          </div>
        </Aggregator>
      );

      actual.find("[className*='nav-aggregator']").simulate('click');
      expect(actual.state().open).toBe(true);
    });

    it('should not toggle when clicking again on the aggregator with a selected child', async () => {
      const actual = mount(
        <Aggregator {...props}>
          <div selected data-testid="child">
            child
          </div>
        </Aggregator>
      );

      actual.find("[className*='nav-aggregator']").simulate('click');
      expect(actual.state().open).toBe(true);

      await new Promise(resolve => setTimeout(resolve));
      actual.update();

      actual.find("[className*='nav-aggregator']").simulate('click');

      expect(props.onClick).toHaveBeenCalled();
      expect(actual.state().open).toBe(true);
    });

    it('should close when there are no selected children', async () => {
      const actual = mount(<MockedNavigation />);
      const aggregator = actual.find('Aggregator');

      actual.find("[className*='nav-aggregator']").simulate('click');
      expect(aggregator.state().open).toBe(true);

      await new Promise(resolve => setTimeout(resolve));
      actual.update();

      actual.find("[id*='sibling']").simulate('click');

      await new Promise(resolve => setTimeout(resolve));
      actual.update();

      expect(aggregator.state().open).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Aggregator />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
