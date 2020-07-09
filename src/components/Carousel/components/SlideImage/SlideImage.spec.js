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

import SlideImage from './SlideImage';

const image = {
  src: 'https://placedog.net/800/500',
  alt: 'random pic',
};

describe('SlideImage', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<SlideImage src={image.src} alt={image.alt} />);

      expect(actual).toMatchSnapshot();
    });

    it('should render with custom aspect ratio', () => {
      const actual = create(
        <SlideImage src={image.src} alt={image.alt} aspectRatio={2} />,
      );

      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <SlideImage src={image.src} alt={image.alt} />,
      );
      const actual = await axe(wrapper);

      expect(actual).toHaveNoViolations();
    });
  });
});
