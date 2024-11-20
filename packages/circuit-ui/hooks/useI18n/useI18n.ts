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

type I18nProps<Key extends string | number | symbol> = {
  [key in Key]: string;
} & {
  locale: Locale;
};

export function useI18n<
  Props extends Partial<I18nProps<Key>>,
  Key extends string | number | symbol,
>(props: Props, translations: Translations<Key>): Props & I18nProps<Key> {
  const locale = useLocale(props.locale);

  const supportedLocale = findSupportedLocale(locale);
  const strings = translations[supportedLocale];
  const keys = Object.keys(strings) as Key[];

  const translatedProps = keys.reduce(
    (acc, key) => {
      acc[key] = props[key] || strings[key];
      return acc;
    },
    {} as Record<Key, string>,
  );

  return { ...props, ...translatedProps, locale };
}
