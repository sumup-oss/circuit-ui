/**
 * Copyright 2026, SumUp Ltd.
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

import { describe, expect, it } from 'vitest';

import {
  reorderUtilityCss,
  UTILITY_MARKER_END,
  UTILITY_MARKER_START,
} from './reorder-utility-css-plugin.js';

const startMarker = `/*
${UTILITY_MARKER_START}
*/`;
const endMarker = `/*
${UTILITY_MARKER_END}
*/`;
const incorrectEndMarker = `/*
${UTILITY_MARKER_END} FOO
*/`;

describe('reorderUtilityCss', () => {
  it('moves utility rules to the end of the stylesheet', () => {
    const source = [
      'body { color: red; }',
      startMarker,
      '.cui-center-pfo4 { display: flex; }',
      '.cui-margin-bit-p46a { margin: 1px; }',
      endMarker,
      '.cui-tablist-wrapper-56a1 { display: block; }',
    ].join('\n');

    const reordered = reorderUtilityCss(source);

    expect(reordered).not.toContain(UTILITY_MARKER_START);
    expect(reordered).not.toContain(UTILITY_MARKER_END);
    expect(reordered.indexOf('.cui-tablist-wrapper-56a1')).toBeLessThan(
      reordered.indexOf('.cui-center-pfo4'),
    );
    expect(reordered.indexOf('.cui-center-pfo4')).toBeLessThan(
      reordered.indexOf('.cui-margin-bit-p46a'),
    );
  });

  it('keeps comment blocks that sit between utility rules', () => {
    const source = [
      'body { color: red; }',
      startMarker,
      '.cui-center-pfo4 { display: flex; }',
      '/* Spacings */',
      '.cui-margin-bit-p46a { margin: 1px; }',
      endMarker,
    ].join('\n');

    const reordered = reorderUtilityCss(source);

    expect(reordered.startsWith('body { color: red; }')).toBe(true);
    expect(reordered).toContain('/* Spacings */');
    expect(reordered.indexOf('/* Spacings */')).toBeGreaterThan(
      reordered.indexOf('body { color: red; }'),
    );
  });

  it('throws an error when it doesnt find the end marker', () => {
    const source = [
      'body { color: red; }',
      startMarker,
      '.cui-center-pfo4 { display: flex; }',
      '.cui-tablist-wrapper-56a1 { display: block; }',
    ].join('\n');
    expect(() => reorderUtilityCss(source)).toThrow(
      new Error('Could not find utility CSS marker in the CSS file.'),
    );
  });

  it('throws an error when the order of markers is incorrect', () => {
    const source = [
      'body { color: red; }',
      endMarker,
      '.cui-center-pfo4 { display: flex; }',
      startMarker,
      '.cui-tablist-wrapper-56a1 { display: block; }',
    ].join('\n');
    expect(() => reorderUtilityCss(source)).toThrow(
      new Error('Utility CSS marker is not in the correct order.'),
    );
  });

  it('throws an error when the marker has changed', () => {
    const source = [
      'body { color: red; }',
      startMarker,
      '.cui-center-pfo4 { display: flex; }',
      incorrectEndMarker,
      '.cui-tablist-wrapper-56a1 { display: block; }',
    ].join('\n');
    expect(() => reorderUtilityCss(source)).toThrow(
      new Error('Could not find utility CSS marker in the CSS file.'),
    );
  });
});
