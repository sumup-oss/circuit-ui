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

import {
  create,
  renderToHtml,
  axe,
  render,
  act,
  userEvent,
  RenderFn,
} from '../../../../util/test-utils';

import Aggregator, { AggregatorProps } from './Aggregator';

const ProxyComponent = ({ children, selected, visible, ...rest }: any) => (
  <div {...rest}>{children}</div>
);

const defaultProps = {
  label: 'Aggregator',
  onClick: jest.fn(),
  selectedIcon: 'selected-icon' as any,
  defaultIcon: 'default-icon' as any,
  disabled: false,
  children: <ProxyComponent data-testid="child">child</ProxyComponent>,
  tracking: {},
};

function renderComponent<T>(
  renderFn: RenderFn<T>,
  props: Partial<AggregatorProps> = {},
) {
  return renderFn(
    <ul>
      <Aggregator {...defaultProps} {...props} data-testid="aggregator">
        {props.children || defaultProps.children}
      </Aggregator>
    </ul>,
  );
}

describe('Aggregator', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderComponent(create);
      expect(actual).toMatchSnapshot();
    });

    it('should render and match snapshot when open', () => {
      const { container, getByTestId } = renderComponent(render);
      const aggregatorEl = getByTestId('aggregator');

      act(() => {
        userEvent.click(aggregatorEl);
      });

      expect(container.children).toMatchSnapshot();
    });

    it('should render with disabled state styles and match the snapshot', () => {
      const actual = renderComponent(create, { disabled: true });

      expect(actual).toMatchSnapshot();
    });
  });

  describe('interactions', () => {
    it('should show children and call onClick when clicking the aggregator', () => {
      const onClick = jest.fn();
      const { getByTestId } = renderComponent(render, { onClick });
      const aggregatorEl = getByTestId('aggregator');
      const childEl = getByTestId('child');

      expect(childEl).not.toBeVisible();

      act(() => {
        userEvent.click(aggregatorEl);
      });

      expect(childEl).toBeVisible();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should show children when clicking the aggregator and no onClick handle is passed', () => {
      const { getByTestId } = renderComponent(render, {
        onClick: undefined,
      });
      const aggregatorEl = getByTestId('aggregator');
      const childEl = getByTestId('child');

      expect(childEl).not.toBeVisible();

      act(() => {
        userEvent.click(aggregatorEl);
      });

      expect(childEl).toBeVisible();
    });

    it('should not toggle when clicking again on the aggregator with a selected child', () => {
      const children = (
        <ProxyComponent selected data-testid="child">
          child
        </ProxyComponent>
      );
      const onClick = jest.fn();
      const { getByTestId } = renderComponent(render, { onClick, children });

      const aggregatorEl = getByTestId('aggregator');
      const childEl = getByTestId('child');

      expect(childEl).toBeVisible();

      act(() => {
        userEvent.click(aggregatorEl);
      });

      expect(childEl).toBeVisible();

      act(() => {
        userEvent.click(aggregatorEl);
      });

      expect(onClick).toHaveBeenCalledTimes(2);
      expect(childEl).toBeVisible();
    });

    it('should close when there are no selected children', () => {
      const onClick = jest.fn();
      const { getByTestId } = renderComponent(render, { onClick });
      const aggregatorEl = getByTestId('aggregator');
      const childEl = getByTestId('child');

      expect(childEl).not.toBeVisible();

      act(() => {
        userEvent.click(aggregatorEl);
      });

      expect(childEl).toBeVisible();

      act(() => {
        userEvent.click(aggregatorEl);
      });

      expect(onClick).toHaveBeenCalledTimes(2);
      expect(childEl).not.toBeVisible();
    });

    it('should not render children when disabled', () => {
      const { queryByTestId } = renderComponent(render, {
        disabled: true,
      });
      const childEl = queryByTestId('child');

      expect(childEl).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderComponent(renderToHtml);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
