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

import { createRef } from 'react';

import { render, renderToHtml, axe } from '../../../../util/test-utils';

import { Link } from './Link';

describe('Link', () => {
  const defaultProps = {
    'children': 'Click me',
    'href': 'https://sumup.com',
    'target': '_blank',
    'rel': 'noreferrer',
    'data-testid': 'link',
  };

  describe('business logic', () => {
    /**
     * Should accept a working ref for button
     */
    it('should accept a working ref', () => {
      const tref = createRef<HTMLAnchorElement>();
      const { container } = render(
        <Link {...defaultProps} ref={tref}>
          This is a link
        </Link>,
      );
      const link = container.querySelector('a');
      expect(tref.current).toBe(link);
    });
  });

  describe('styles', () => {
    it('should render with the attributes it receives', () => {
      const { getByTestId } = render(<Link {...defaultProps} />);
      const linkEl = getByTestId('link');

      expect(linkEl).toHaveAttribute('href', defaultProps.href);
      expect(linkEl).toHaveAttribute('target', defaultProps.target);
      expect(linkEl).toHaveAttribute('rel', defaultProps.rel);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Link {...defaultProps} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
