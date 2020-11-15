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

import { Theme } from '@sumup/design-tokens';

import {
  traverse,
  createTheme,
  createRootVariables,
} from './custom-properties';

describe('Custom properties', () => {
  const theme = {
    colors: {
      n100: '#FAFBFC',
      n300: '#D8DDE1',
      n500: '#9DA7B1',
      n700: '#5C656F',
      n900: '#212933',
    },
    spacings: {
      bit: '4px',
      byte: '8px',
      kilo: '12px',
      mega: '16px',
    },
  } as Theme;

  const mq = ({
    untilKilo: '(max-width: 479px)',
    kilo: 480,
    kiloToMega: '(min-width: 480px) and (max-width: 767px)',
    mega: 768,
    untilMega: '(max-width: 767px)',
  } as unknown) as Theme['mq'];

  describe('createTheme', () => {
    it('should replace the theme values with CSS custom properties', () => {
      const actual = createTheme(theme);
      const expected = {
        colors: {
          n100: 'var(--colors-n100)',
          n300: 'var(--colors-n300)',
          n500: 'var(--colors-n500)',
          n700: 'var(--colors-n700)',
          n900: 'var(--colors-n900)',
        },
        spacings: {
          bit: 'var(--spacings-bit)',
          byte: 'var(--spacings-byte)',
          kilo: 'var(--spacings-kilo)',
          mega: 'var(--spacings-mega)',
        },
      };
      expect(actual).toEqual(expected);
    });

    it('should retain the original values for omitted properties', () => {
      const actual = createTheme({ ...theme, mq });
      const expected = {
        colors: {
          n100: 'var(--colors-n100)',
          n300: 'var(--colors-n300)',
          n500: 'var(--colors-n500)',
          n700: 'var(--colors-n700)',
          n900: 'var(--colors-n900)',
        },
        spacings: {
          bit: 'var(--spacings-bit)',
          byte: 'var(--spacings-byte)',
          kilo: 'var(--spacings-kilo)',
          mega: 'var(--spacings-mega)',
        },
        mq,
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('createRootVariables', () => {
    it('should return root values for the CSS custom properties', () => {
      const actual = createRootVariables(theme);
      const expected =
        // eslint-disable-next-line max-len
        ':root { --colors-n100: #FAFBFC; --colors-n300: #D8DDE1; --colors-n500: #9DA7B1; --colors-n700: #5C656F; --colors-n900: #212933; --spacings-bit: 4px; --spacings-byte: 8px; --spacings-kilo: 12px; --spacings-mega: 16px; }';
      expect(actual).toBe(expected);
    });

    it('should not include omitted properties', () => {
      const actual = createRootVariables({ ...theme, mq });
      const expected =
        // eslint-disable-next-line max-len
        ':root { --colors-n100: #FAFBFC; --colors-n300: #D8DDE1; --colors-n500: #9DA7B1; --colors-n700: #5C656F; --colors-n900: #212933; --spacings-bit: 4px; --spacings-byte: 8px; --spacings-kilo: 12px; --spacings-mega: 16px; }';
      expect(actual).toBe(expected);
    });
  });

  describe('traverse', () => {
    it('should traverse an object', () => {
      const obj = { foo: 'bar' };
      const fn = jest.fn();

      traverse(obj, fn);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('foo', 'bar', ['foo']);
    });

    it('should traverse a nested object', () => {
      const obj = { foo: { bar: 'baz' } };
      const fn = jest.fn();

      traverse(obj, fn);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('bar', 'baz', ['foo', 'bar']);
    });

    it('should skip nil values', () => {
      const obj = { foo: null, bar: undefined, baz: false };
      const fn = jest.fn();

      traverse(obj, fn);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('baz', false, ['baz']);
    });
  });
});
