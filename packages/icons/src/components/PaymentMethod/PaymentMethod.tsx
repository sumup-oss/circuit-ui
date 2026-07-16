/**
 * Copyright 2026, SumUp Ltd.
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

import { forwardRef, type HTMLAttributes } from 'react';

import { getIconURL } from '../../helpers.js';
import { ICON_SIZES } from '../../icon-sizes.js';

import type { PAYMENT_METHODS } from './constants.js';

type PaymentMethodName = (typeof PAYMENT_METHODS)[number];

export type PaymentMethodProps = HTMLAttributes<HTMLImageElement> & {
  /**
   * The name of the payment method.
   */
  name: PaymentMethodName;
  /**
   * The alt text for the payment method logo.
   */
  alt: string;
  /**
   * Choose from 3 sizes.
   */
  size?: 's' | 'm' | 'l';
  /**
   * Additional class name to apply to the image.
   */
  className?: string;
};

/**
 * Renders the logo of a payment method as an image, loaded from a URL.
 */
export const PaymentMethod = forwardRef<HTMLImageElement, PaymentMethodProps>(
  ({ name, alt, className, style, size = 'm', ...props }, ref) => (
    <img
      ref={ref}
      className={className}
      style={{ height: ICON_SIZES[size], width: 'auto', ...style }}
      src={getIconURL(name, '24')}
      {...props}
      alt={alt}
    />
  ),
);

PaymentMethod.displayName = 'PaymentMethod';
