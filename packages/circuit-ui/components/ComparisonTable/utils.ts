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

import type { FeatureSection } from './components/PlanTable/PlanTable.js';

export function getFirstNRows(
  arr: FeatureSection[],
  n: number,
): FeatureSection[] {
  let credit = n;
  const result: FeatureSection[] = [];
  arr.forEach((section) => {
    if (credit > 0) {
      credit -= 1; // each section counts as row in the table
      const newFeatures = [
        ...(credit < section.features.length
          ? section.features.slice(0, credit)
          : section.features),
      ];
      credit -= newFeatures.length;
      result.push({ ...section, features: newFeatures });
    }
  }, [] as FeatureSection[]);
  return result;
}

export function generateFromIndex<T>(data: T[], positions: number[]): T[] {
  return positions.map((i) => data[i]);
}
