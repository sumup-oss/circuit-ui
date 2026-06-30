/**
 * Copyright 2025, SumUp Ltd.
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

import type { HTMLAttributes, Ref } from 'react';
import { getIconURL, type IconName } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';

import classes from './Flag.module.css';
import type { FLAGS } from './constants.js';

type CountryCode = (typeof FLAGS)[number];

export type FlagProps = HTMLAttributes<HTMLImageElement> & {
  ref?: Ref<HTMLImageElement>;
  countryCode: CountryCode;
  /**
   * The alt text for the flag image.
   */
  alt: string;
  /**
   * Additional class name to apply to the flag wrapper.
   */
  className?: string;
  /**
   * Additional class name to apply to the flag's inner image.
   */
  imageClassName?: string;
  /**
   * Choose from 3 sizes.
   * @default m
   */
  size?: 's' | 'm' | 'l';
};

/**
 * Renders an SVG icon of a flag. Flags are sourced from: https://flagicons.lipis.dev/
 */
export function Flag({
  countryCode,
  alt,
  className,
  imageClassName,
  size = 'm',
  ref,
  ...props
}: FlagProps) {
  const flagName = `flag_${countryCode.toLowerCase()}` as IconName;

  return (
    <div className={clsx(classes.wrapper, className)}>
      <img
        ref={ref}
        className={clsx(classes.base, classes[size], imageClassName)}
        src={getIconURL(flagName)}
        {...props}
        alt={alt}
      />
    </div>
  );
}
