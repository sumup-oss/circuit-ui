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

import { transformModulesToTranslations } from '../../../util/i18n.js';

export const translations = transformModulesToTranslations<
  typeof import('./en-US.json')
>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore import.meta.glob is supported by Vite
  import.meta.glob('./*.json', {
    eager: true,
  }),
);
