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

import { render, axe } from '../../util/test-utils';

import { Avatar, AvatarProps } from './Avatar';

const sizes = ['giga', 'yotta'] as const;
const variants = ['object', 'identity'] as const;
const images = {
  object: '/images/illustration-coffee.jpg',
  identity: '/images/illustration-cat.jpg',
};

describe('Avatar', () => {
  function renderAvatar(props: AvatarProps = { alt: '' }, options = {}) {
    return render(<Avatar {...props} />, options);
  }

  describe('styles', () => {
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

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderAvatar();
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
