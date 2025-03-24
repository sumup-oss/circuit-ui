/**
 * Copyright 2023, SumUp Ltd.
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

// Layout
export { Grid, Row, Col } from './components/legacy/Grid/index.js';
export type { ColProps } from './components/legacy/Grid/index.js';
export { InlineElements } from './components/legacy/InlineElements/index.js';
export type { InlineElementsProps } from './components/legacy/InlineElements/index.js';

// Miscellaneous
export { Tooltip } from './components/legacy/Tooltip/index.js';
export type { TooltipProps } from './components/legacy/Tooltip/index.js';

export {
  cx,
  spacing,
  shadow,
  disableVisually,
  hideVisually,
  focusOutline,
  focusVisible,
  clearfix,
  hideScrollbar,
  inputOutline,
  typography,
  center,
} from './styles/style-mixins.js';

export { uniqueId } from './util/id.js';
