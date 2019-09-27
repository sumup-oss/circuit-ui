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

import { SLIDE_DIRECTIONS } from '../../constants';

export function getStackOrder(slideIndex, step, prevStep, slideDirection) {
  const isActive = step === slideIndex;
  const wasActive = prevStep === slideIndex;

  if (slideDirection === SLIDE_DIRECTIONS.FORWARD && isActive) {
    return 2;
  }

  if (slideDirection === SLIDE_DIRECTIONS.FORWARD && wasActive) {
    return 1;
  }

  if (slideDirection === SLIDE_DIRECTIONS.BACK && isActive) {
    return 1;
  }

  if (slideDirection === SLIDE_DIRECTIONS.BACK && wasActive) {
    return 2;
  }

  return slideIndex ? -slideIndex : 0;
}

export function shouldAnimate(slideIndex, step, prevStep, slideDirection) {
  const isActive = step === slideIndex;
  const wasActive = prevStep === slideIndex;

  if (slideDirection === SLIDE_DIRECTIONS.FORWARD) {
    return isActive;
  }

  if (slideDirection === SLIDE_DIRECTIONS.BACK) {
    return wasActive;
  }

  return false;
}

export function getDynamicWidth(width) {
  return width ? `${width}px` : '100%';
}
