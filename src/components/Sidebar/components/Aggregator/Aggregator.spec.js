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
  'label': 'Aggregator',
  'onClick': jest.fn(),
  'selectedIcon': 'selected-icon',
  'defaultIcon': 'default-icon',
  'data-testid': 'aggregator',
};

class MockedNavigation extends Component {
  state = {
    selected: 1,
  };

  render() {
    const { selected } = this.state;
    return (
      <Fragment>
        <Aggregator {...props} {...this.props}>
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
      const actual = create(
        <Aggregator {...props}>
          <div data-testid="child">child</div>
        </Aggregator>,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render and match snapshot when open', () => {
      const { container, getByTestId } = render(
        <Aggregator {...props}>
          <div data-testid="child">child</div>
        </Aggregator>,
      );
      const aggregatorEl = getByTestId('aggregator');

      act(() => {
        fireEvent.click(aggregatorEl);
      });

      expect(container.children).toMatchSnapshot();
    });

    it('should render with disabled state styles and match the snapshot', () => {
      const actual = create(
        <Aggregator {...props} disabled={true}>
          <div data-testid="child">child</div>
        </Aggregator>,
      );

      expect(actual).toMatchSnapshot();
    });
  });

  describe('interactions', () => {
    it('should show children and call onClick when clicking the aggregator', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <Aggregator {...props} onClick={onClick}>
          <div data-testid="child">child</div>
        </Aggregator>,
      );
      const aggregatorEl = getByTestId('aggregator');
      const childEl = getByTestId('child');

      expect(childEl).not.toBeVisible();

      act(() => {
        fireEvent.click(aggregatorEl);
      });

      expect(childEl).toBeVisible();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should show children when clicking the aggregator and no onClick handle is passed', () => {
      const noHandlerProps = {
        ...props,
        onClick: null,
      };

      const { getByTestId } = render(
        <Aggregator {...noHandlerProps}>
          <div data-testid="child">child</div>
        </Aggregator>,
      );
      const aggregatorEl = getByTestId('aggregator');
      const childEl = getByTestId('child');

      expect(childEl).not.toBeVisible();

      act(() => {
        fireEvent.click(aggregatorEl);
      });

      expect(childEl).toBeVisible();
    });

    it('should not toggle when clicking again on the aggregator with a selected child', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(
        <Aggregator {...props} onClick={onClick}>
          <div selected data-testid="child">
            child
          </div>
        </Aggregator>,
      );
      const aggregatorEl = getByTestId('aggregator');
      const childEl = getByTestId('child');

      expect(childEl).toBeVisible();

      act(() => {
        fireEvent.click(aggregatorEl);
      });

      expect(childEl).toBeVisible();

      act(() => {
        fireEvent.click(aggregatorEl);
      });

      expect(onClick).toHaveBeenCalledTimes(2);
      expect(childEl).toBeVisible();
    });

    it('should close when there are no selected children', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(<MockedNavigation onClick={onClick} />);
      const aggregatorEl = getByTestId('aggregator');
      const childEl = getByTestId('child');

      expect(childEl).not.toBeVisible();

      act(() => {
        fireEvent.click(aggregatorEl);
      });

      expect(childEl).toBeVisible();

      act(() => {
        fireEvent.click(aggregatorEl);
      });

      expect(onClick).toHaveBeenCalledTimes(2);
      expect(childEl).not.toBeVisible();
    });

    it('should not render children when disabled', () => {
      const { queryByTestId } = render(
        <Aggregator {...props} disabled={true}>
          <div data-selector="child">child</div>
        </Aggregator>,
      );
      const childEl = queryByTestId('child');

      expect(childEl).toBeNull();
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
