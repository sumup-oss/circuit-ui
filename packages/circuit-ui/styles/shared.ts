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

import _classes from './shared.module.css';

// This explicit remapping is needed so TypeScript infers the types correctly
export const sharedClasses = {
  listItem: _classes['list-item'],
  listItemDestructive: _classes['list-item-destructive'],
  navigationItem: _classes['navigation-item'],
  animationFadeIn: _classes['animation-fade-in'],
  animationFadeOut: _classes['animation-fade-out'],
  animationSlideUpIn: _classes['animation-slide-up-in'],
  animationSlideUpOut: _classes['animation-slide-up-out'],
  animationSlideDownIn: _classes['animation-slide-down-in'],
  animationSlideDownOut: _classes['animation-slide-down-out'],
  animationSlideRightIn: _classes['animation-slide-right-in'],
  animationSlideRightOut: _classes['animation-slide-right-out'],
  animationSlideLeftIn: _classes['animation-slide-left-in'],
  animationSlideLeftOut: _classes['animation-slide-left-out'],
};
