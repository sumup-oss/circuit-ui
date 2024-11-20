/**
 * Copyright 2024, SumUp Ltd.
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

'use client';

import {
  findSupportedLocale,
  type Locale,
  type Translations,
} from '../../util/i18n.js';
import { useLocale } from '../useLocale/useLocale.js';

export function useI18n<
  P extends { [key in K]: string } & { locale?: Locale },
  K extends string | number | symbol,
>(props: P, translations: Translations<K>): P {
  const locale = useLocale(props.locale);

  const supportedLocale = findSupportedLocale(locale);
  const strings = translations[supportedLocale];
  const keys = Object.keys(strings) as K[];

  const translatedProps = keys.reduce(
    (acc, key) => {
      acc[key] = props[key] || strings[key];
      return acc;
    },
    {} as Record<K, string>,
  );

  return { ...props, ...translatedProps };
}
