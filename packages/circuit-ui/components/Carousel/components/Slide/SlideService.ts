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

import { SlideDirection } from '../../constants.js';

export function getStackOrder(
  slideIndex?: number,
  step?: number,
  prevStep?: number,
  slideDirection?: SlideDirection,
) {
  const isActive = step === slideIndex;
  const wasActive = prevStep === slideIndex;

  if (
    (slideDirection === SlideDirection.FORWARD && isActive) ||
    (slideDirection === SlideDirection.BACK && wasActive)
  ) {
    return 2;
  }

  if (
    (slideDirection === SlideDirection.FORWARD && wasActive) ||
    (slideDirection === SlideDirection.BACK && isActive)
  ) {
    return 1;
  }

  return slideIndex ? -slideIndex : 0;
}

export function shouldAnimate(
  slideIndex?: number,
  step?: number,
  prevStep?: number,
  slideDirection?: SlideDirection,
) {
  const isActive = step === slideIndex;
  const wasActive = prevStep === slideIndex;

  if (slideDirection === SlideDirection.FORWARD) {
    return isActive;
  }

  if (slideDirection === SlideDirection.BACK) {
    return wasActive;
  }

  return false;
}

export function getDynamicWidth(width?: number) {
  return width ? `${width}px` : '100%';
}
