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

// This file needs be be kept up to date with
// https://github.com/airbnb/react-dates/blob/master/src/constants.js
// react-dates doesn't support tree-shaking. The components can be code-split,
// but these constants are often used as props which makes code-splitting much
// trickier. Moving them into Circuit UI is a simpler solution.

export const DISPLAY_FORMAT = 'L';
export const ISO_FORMAT = 'YYYY-MM-DD';
export const ISO_MONTH_FORMAT = 'YYYY-MM';

export const START_DATE = 'startDate';
export const END_DATE = 'endDate';

export const HORIZONTAL_ORIENTATION = 'horizontal';
export const VERTICAL_ORIENTATION = 'vertical';
export const VERTICAL_SCROLLABLE = 'verticalScrollable';

export const NAV_POSITION_BOTTOM = 'navPositionBottom';
export const NAV_POSITION_TOP = 'navPositionTop';

export const ICON_BEFORE_POSITION = 'before';
export const ICON_AFTER_POSITION = 'after';

export const INFO_POSITION_TOP = 'top';
export const INFO_POSITION_BOTTOM = 'bottom';
export const INFO_POSITION_BEFORE = 'before';
export const INFO_POSITION_AFTER = 'after';

export const ANCHOR_LEFT = 'left';
export const ANCHOR_RIGHT = 'right';

export const OPEN_DOWN = 'down';
export const OPEN_UP = 'up';

export const DAY_SIZE = 39;
export const BLOCKED_MODIFIER = 'blocked';
export const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

export const FANG_WIDTH_PX = 20;
export const FANG_HEIGHT_PX = 10;
export const DEFAULT_VERTICAL_SPACING = 22;

export const MODIFIER_KEY_NAMES = new Set(['Shift', 'Control', 'Alt', 'Meta']);
