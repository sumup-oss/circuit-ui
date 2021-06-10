/**
 * Copyright 2020, SumUp Ltd.
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

import { Bin, CirclePlus, PenStroke, ThumbUp, Zap } from '@sumup/icons';
import { fireEvent } from '@testing-library/dom';
import React, { useRef, useState } from 'react';

import {
  create,
  renderToHtml,
  axe,
  RenderFn,
  render,
  act,
  userEvent,
} from '../../util/test-utils';
import Button from '../Button';

import { PopoverItem, PopoverItemProps, Popover } from './Popover';

const placements = ['auto', 'top', 'bottom', 'left', 'right'];

describe('PopoverItem', () => {
  function renderPopoverItem<T>(
    renderFn: RenderFn<T>,
    props: PopoverItemProps,
  ) {
    return renderFn(<PopoverItem {...props} />);
  }

  const baseProps = { children: 'PopoverItem' };

  describe('styles', () => {
    it('should render as Link when an href (and onClick) is passed', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
        icon: Zap,
      };
      const actual = renderPopoverItem(create, props);
      expect(actual).toMatchSnapshot();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const props = { ...baseProps, onClick: jest.fn(), icon: Zap };
      const actual = renderPopoverItem(create, props);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
        icon: Zap,
      };
      const wrapper = renderPopoverItem(renderToHtml, props);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});

describe('Popover', () => {
  const Default = (props) => {
    const referenceElement = useRef<HTMLButtonElement & HTMLAnchorElement>(
      null,
    );

    return (
      <>
        <button ref={referenceElement}>Button</button>
        <Popover referenceElement={referenceElement} {...props} />
      </>
    );
  };

  const Interactive = () => {
    const [isOpen, setOpen] = useState(true);
    const referenceElement = useRef<HTMLButtonElement & HTMLAnchorElement>(
      null,
    );

    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    const onClose = () => {
      setOpen(false);
    };

    return (
      <>
        <Button
          size="kilo"
          variant="tertiary"
          onClick={handleClick}
          ref={referenceElement}
          icon={ThumbUp}
        >
          Button
        </Button>
        <Popover
          actions={[
            {
              onClick: () => alert('Hello'),
              children: 'Add',
              icon: CirclePlus,
            },
            {
              onClick: () => alert('Hello'),
              children: 'Edit',
              icon: PenStroke,
            },
            { type: 'divider' },
            {
              onClick: () => alert('Hello'),
              children: 'Delete',
              icon: Bin,
              destructive: true,
            },
          ]}
          onClose={onClose}
          isOpen={isOpen}
          referenceElement={referenceElement}
        />
      </>
    );
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const props = {
        actions: [
          {
            onClick: () => alert('Hello'),
            children: 'Add',
            icon: CirclePlus,
          },
        ],
        isOpen: true,
        onClose: jest.fn(),
      };

      const actual = create(<Default {...props} />);
      expect(actual).toMatchSnapshot();
    });

    placements.forEach((placement) => {
      it(`should render popover on ${placement}`, () => {
        const props = {
          actions: [
            {
              onClick: () => alert('Hello'),
              children: 'Add',
              icon: CirclePlus,
            },
          ],
          isOpen: true,
          onClose: jest.fn(),
        };
        const actual = create(<Default {...props} />);
        expect(actual).toMatchSnapshot();
      });
    });

    it('should render popover when isOpen=true', () => {
      const { queryByText } = render(<Interactive />);
      expect(queryByText('Edit')).not.toBeNull();
    });

    it('should close popover when passing a click outside', () => {
      const { queryByText } = render(<Interactive />);
      expect(queryByText('Edit')).not.toBeNull();

      userEvent.click(document.body);

      expect(queryByText('Add')).toBeNull();
    });

    it('should close popover when passing a click to a reference element', () => {
      const { queryByText, getAllByRole } = render(<Interactive />);
      expect(queryByText('Edit')).not.toBeNull();

      act(() => {
        fireEvent.click(getAllByRole('button')[0]);
      });

      expect(queryByText('Add')).toBeNull();
    });

    it('should render nothing when isOpen=false', () => {
      const props = {
        actions: [
          {
            onClick: () => alert('Hello'),
            children: 'Add',
            icon: CirclePlus,
          },
        ],
        isOpen: false,
        onClose: jest.fn(),
      };

      const { queryByTestId } = render(<Default {...props} />);
      expect(queryByTestId('popover-child')).toBeNull();
    });
  });
});
