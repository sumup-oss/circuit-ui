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

import { describe, expect, it } from 'vitest';

import { render, axe } from '../../util/test-utils.jsx';

import { Avatar, AvatarProps } from './Avatar.jsx';

const sizes = ['giga', 'yotta'] as const;
const variants = ['object', 'identity'] as const;
const images = {
  object: '/images/illustration-coffee.jpg',
  identity: '/images/illustration-cat.jpg',
};

const defaultProps = {
  alt: '',
};

describe('Avatar', () => {
  function renderAvatar(props: AvatarProps = defaultProps, options = {}) {
    return render(<Avatar {...props} />, options);
  }

  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = renderAvatar();
      expect(container).toMatchSnapshot();
    });

    it.each(sizes)('should render the %s size', (size) => {
      const { container } = renderAvatar({
        size,
        alt: '',
      });
      expect(container).toMatchSnapshot();
    });

    it.each(variants)(
      'should render the %s variant with an image',
      (variant) => {
        const { container } = renderAvatar({
          src: images[variant],
          variant,
          alt: '',
        });
        expect(container).toMatchSnapshot();
      },
    );

    it.each(variants)('should render the %s variant placeholder', (variant) => {
      const { container } = renderAvatar({
        variant,
        alt: '',
      });
      expect(container).toMatchSnapshot();
    });

    it('should render the identity variant with initials', () => {
      const { container } = renderAvatar({
        variant: 'identity',
        alt: '',
        initials: 'JD',
      });
      expect(container).toMatchSnapshot();
    });
  });

  describe('Accessibility', () => {
    describe('when alt text is passed', () => {
      const altText = 'Alternative text';

      it('should have no violations', async () => {
        const { container } = renderAvatar({ alt: altText });
        const actual = await axe(container);
        expect(actual).toHaveNoViolations();
      });

      it('should have role=img and an accessible name', () => {
        const { getByRole } = renderAvatar({ alt: altText });
        const avatarEl = getByRole('img');
        expect(avatarEl).toHaveAccessibleName(altText);
      });
    });

    describe('when alt is an empty string', () => {
      it('should have no violations', async () => {
        const { container } = renderAvatar();
        const actual = await axe(container);
        expect(actual).toHaveNoViolations();
      });

      it('should not be in the accessibility tree', () => {
        const { queryByRole, container } = renderAvatar();

        const avatarWithAlternativeText = queryByRole('img');
        expect(avatarWithAlternativeText).not.toBeInTheDocument();

        const avatarEl = container.querySelector('[aria-hidden=true]');
        expect(avatarEl).toBeInTheDocument();
      });
    });
  });
});
