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

import { Fragment } from 'react';
import {
  clsx,
  Image as BaseImage,
  type ImageProps as BaseImageProps,
} from '../../packages/circuit-ui/index.js';

import classes from './Image.module.css';

interface ImageProps extends BaseImageProps {
  darkSrc?: string;
}

export function Image({ children, src, darkSrc, ...props }: ImageProps) {
  return (
    <Fragment>
      {darkSrc && (
        <BaseImage
          src={darkSrc}
          {...props}
          className={clsx(classes.dark, props.className)}
        />
      )}
      <BaseImage
        src={src}
        {...props}
        className={clsx(classes.light, props.className)}
      />
    </Fragment>
  );
}
