/**
 * Copyright 2021, SumUp Ltd.
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

import { FC } from 'react';
import { IconProps, Plus } from '@sumup/icons';

import { ClickEvent } from '../../../../types/events';
import {
  create,
  render,
  axe,
  RenderFn,
  act,
  userEvent,
} from '../../../../util/test-utils';

import { PrimaryLink, PrimaryLinkProps } from './PrimaryLink';

describe('PrimaryLink', () => {
  function renderPrimaryLink<T>(
    renderFn: RenderFn<T>,
    props: PrimaryLinkProps,
  ) {
    return renderFn(<PrimaryLink {...props} />);
  }

  const baseProps = {
    icon: Plus as FC<IconProps>,
    label: 'Label',
    href: '/url',
    onClick: jest.fn(),
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const wrapper = renderPrimaryLink(create, baseProps);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with active styles', () => {
      const wrapper = renderPrimaryLink(create, {
        ...baseProps,
        isActive: true,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with open styles', () => {
      const wrapper = renderPrimaryLink(create, {
        ...baseProps,
        isOpen: true,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with badge styles', () => {
      const wrapper = renderPrimaryLink(create, {
        ...baseProps,
        badge: true,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it.todo('should render with an external icon');

    it('should render with a suffix icon', () => {
      const { getByTestId } = renderPrimaryLink(render, {
        ...baseProps,
        // eslint-disable-next-line react/display-name
        suffix: (props) => <div {...props} data-testid="suffix" />,
      });
      expect(getByTestId('suffix')).toBeVisible();
    });
  });

  describe('business logic', () => {
    it('should call the onClick handler when clicked', () => {
      const props = {
        ...baseProps,
        onClick: jest.fn((event: ClickEvent) => {
          event.preventDefault();
        }),
      };
      const { getByRole } = renderPrimaryLink(render, props);

      act(() => {
        userEvent.click(getByRole('link'));
      });

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderPrimaryLink(render, baseProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
