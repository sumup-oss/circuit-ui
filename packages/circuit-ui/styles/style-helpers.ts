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

import deprecate from '../util/deprecate';

import * as styleMixins from './style-mixins';

type StyleMixins = typeof styleMixins;

const PUBLIC_STYLE_MIXINS: { [key: string]: boolean } = {
  cx: true,
  spacing: true,
  shadow: true,
  disableVisually: true,
  hideVisually: true,
  focusOutline: true,
  clearfix: true,
  hideScrollbar: true,
};

/**
 * @deprecated The aggregate `styleHelpers` export has been deprecated.
 *             Import each style mixin directly instead.
 */
export const styleHelpers: StyleMixins =
  process.env.NODE_ENV !== 'production'
    ? (Object.entries(styleMixins).reduce((acc, [name, fn]) => {
        // @ts-expect-error TypeScript isn't smart enough to infer the types here
        // and I'm too lazy to explicitly define them. — @connor-baer
        acc[name] = (...args) => {
          if (PUBLIC_STYLE_MIXINS[name]) {
            deprecate(
              'The aggregate `styleHelpers` export has been deprecated.',
              `Import \`${name}\` directly instead.`,
            );
          } else {
            deprecate(`The style mixin \`${name}\` has been deprecated.`);
          }
          // @ts-expect-error TypeScript isn't smart enough to infer the types here
          // and I'm too lazy to explicitly define them. — @connor-baer
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return fn(...args);
        };
        return acc;
      }, {}) as StyleMixins)
    : styleMixins;
