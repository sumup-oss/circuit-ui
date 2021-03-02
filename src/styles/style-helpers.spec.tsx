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

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { light, Theme } from '@sumup/design-tokens';

import { create } from '../util/test-utils';

import {
  cx,
  shadowSingle,
  shadowDouble,
  shadowTriple,
  headingKilo,
  headingMega,
  headingGiga,
  headingTera,
  headingExa,
  headingPeta,
  headingZetta,
  subHeadingKilo,
  subHeadingMega,
  textKilo,
  textMega,
  textGiga,
  disableVisually,
  hideVisually,
  focusOutline,
  clearfix,
  hideScrollbar,
  inputOutline,
} from './style-helpers';

describe('Style helpers', () => {
  const red = (theme: Theme) => css`
    color: ${theme.colors.r500};
  `;
  const green = (theme: Theme) => css`
    color: ${theme.colors.g500};
  `;

  describe('cx', () => {
    it('should call each style function with the theme', () => {
      const actual = create(<div css={cx(red, green)} />);

      expect(actual).toMatchInlineSnapshot(`
        .circuit-0 {
          color: #D23F47;
          color: #8CC13F;
        }

        <div
          class="circuit-0"
        />
      `);
    });

    it('should skip falsy style functions', () => {
      const isGreen = false;

      const actual = create(<div css={cx(red, isGreen && green)} />);

      expect(actual).toMatchInlineSnapshot(`
        .circuit-0 {
          color: #D23F47;
        }

        <div
          class="circuit-0"
        />
      `);
import { SerializedStyles } from '@emotion/core';
import { light } from '@sumup/design-tokens';

import * as StyleHelpers from './style-helpers';

describe('Style helpers', () => {
  describe('spacing', () => {
    it('should apply spacing to four sides when passing a string', () => {
      const { styles } = StyleHelpers.spacing(
        'mega',
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(`"margin:16px;"`);
    });

    it('should apply spacing to four sides when passing an array', () => {
      const { styles } = StyleHelpers.spacing(
        ['giga'],
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(`"margin:24px;"`);
    });

    it('should apply vertical and horizontal spacing when passing two values in an array', () => {
      const { styles } = StyleHelpers.spacing(
        ['giga', 'mega'],
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(
        `"margin-top:24px;margin-bottom:24px;margin-right:16px;margin-left:16px;"`,
      );
    });

    it('should apply only vertical spacing when passing one value and null in an array', () => {
      const { styles } = StyleHelpers.spacing(
        ['mega', null],
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(
        `"margin-top:16px;margin-bottom:16px;"`,
      );
    });

    it('should apply only horizontal spacing when passing one value and null in an array', () => {
      const { styles } = StyleHelpers.spacing(
        [null, 'kilo'],
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(
        `"margin-right:12px;margin-left:12px;"`,
      );
    });

    it('should apply vertical and horizontal spacing when passing three values in an array', () => {
      const { styles } = StyleHelpers.spacing(
        ['giga', 'mega', 'kilo'],
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(
        `"margin-top:24px;margin-bottom:12px;margin-right:16px;margin-left:16px;"`,
      );
    });

    it('should apply individual spacing to each sides when passing all four values in an array', () => {
      const { styles } = StyleHelpers.spacing(
        ['giga', 'mega', 'kilo', 'byte'],
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(
        `"margin-top:24px;margin-bottom:12px;margin-right:16px;margin-left:8px;"`,
      );
    });

    it('should apply individual spacing for one side when passing an object', () => {
      const { styles } = StyleHelpers.spacing(
        { bottom: 'kilo' },
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(`"margin-bottom:12px;"`);
    });

    it('should apply individual spacing to each sides when passing all four values in an object', () => {
      const { styles } = StyleHelpers.spacing(
        { top: 'kilo', right: 'mega', left: 'giga', bottom: 'kilo' },
        light,
      ) as SerializedStyles;
      expect(styles).toMatchInlineSnapshot(
        `"margin-top:12px;margin-bottom:12px;margin-right:16px;margin-left:24px;"`,
      );
    });
  });

  describe('shadowSingle', () => {
    it('should match the snapshot', () => {
      const { styles } = shadowSingle({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
            box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.07),
              0 0 1px 0 rgba(12, 15, 20, 0.07), 0 2px 2px 0 rgba(12, 15, 20, 0.07);
          "
      `);
    });
  });

  describe('shadowDouble', () => {
    it('should match the snapshot', () => {
      const { styles } = shadowDouble({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
            box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.07),
              0 2px 2px 0 rgba(12, 15, 20, 0.07), 0 4px 4px 0 rgba(12, 15, 20, 0.07);
          "
      `);
    });
  });

  describe('shadowTriple', () => {
    it('should match the snapshot', () => {
      const { styles } = shadowTriple({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
            box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.07),
              0 4px 4px 0 rgba(12, 15, 20, 0.07), 0 8px 8px 0 rgba(12, 15, 20, 0.07);
          "
      `);
    });
  });

  describe('headingKilo', () => {
    it('should match the snapshot', () => {
      const { styles } = headingKilo({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 17px;
              line-height: 24px;
            "
      `);
    });
  });

  describe('headingMega', () => {
    it('should match the snapshot', () => {
      const { styles } = headingMega({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 19px;
              line-height: 24px;
            "
      `);
    });
  });

  describe('headingGiga', () => {
    it('should match the snapshot', () => {
      const { styles } = headingGiga({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 22px;
              line-height: 24px;
            "
      `);
    });
  });

  describe('headingTera', () => {
    it('should match the snapshot', () => {
      const { styles } = headingTera({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 24px;
              line-height: 32px;
            "
      `);
    });
  });

  describe('headingPeta', () => {
    it('should match the snapshot', () => {
      const { styles } = headingPeta({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 28px;
              line-height: 32px;
            "
      `);
    });
  });

  describe('headingExa', () => {
    it('should match the snapshot', () => {
      const { styles } = headingExa({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 36px;
              line-height: 44px;
            "
      `);
    });
  });

  describe('headingZetta', () => {
    it('should match the snapshot', () => {
      const { styles } = headingZetta({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 42px;
              line-height: 48px;
            "
      `);
    });
  });

  describe('subHeadingKilo', () => {
    it('should match the snapshot', () => {
      const { styles } = subHeadingKilo({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 12px;
              line-height: 20px;
            "
      `);
    });
  });

  describe('subHeadingMega', () => {
    it('should match the snapshot', () => {
      const { styles } = subHeadingMega({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 14px;
              line-height: 18px;
            "
      `);
    });
  });

  describe('textKilo', () => {
    it('should match the snapshot', () => {
      const { styles } = textKilo({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 13px;
              line-height: 20px;
            "
      `);
    });
  });

  describe('textMega', () => {
    it('should match the snapshot', () => {
      const { styles } = textMega({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 16px;
              line-height: 24px;
            "
      `);
    });
  });

  describe('textGiga', () => {
    it('should match the snapshot', () => {
      const { styles } = textGiga({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
              font-size: 18px;
              line-height: 28px;
            "
      `);
    });
  });

  describe('disableVisually', () => {
    it('should match the snapshot', () => {
      const { styles } = disableVisually();
      expect(styles).toMatchInlineSnapshot(`
        "
          opacity: 0.5;
          pointer-events: none;
          box-shadow: none;
        "
      `);
    });
  });

  describe('hideVisually', () => {
    it('should match the snapshot', () => {
      const { styles } = hideVisually();
      expect(styles).toMatchInlineSnapshot(`
        "
          border: 0;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        "
      `);
    });
  });

  describe('focusOutline', () => {
    it('should match the snapshot', () => {
      const { styles } = focusOutline({ theme: light });
      expect(styles).toMatchInlineSnapshot(`
        "
            outline: 0;
            box-shadow: 0 0 0 4px #AFD0FE;

            &::-moz-focus-inner {
              border: 0;
            }
          "
      `);
    });
  });

  describe('clearfix', () => {
    it('should match the snapshot', () => {
      const { styles } = clearfix();
      expect(styles).toMatchInlineSnapshot(`
        "
          &::before,
          &::after {
            content: ' ';
            display: table;
          }
          &::after {
            clear: both;
          }
        "
      `);
    });
  });

  describe('hideScrollbar', () => {
    it('should match the snapshot', () => {
      const { styles } = hideScrollbar();
      expect(styles).toMatchInlineSnapshot(`
        "
          -ms-overflow-style: none;
          scrollbar-width: none;

          &::-webkit-scrollbar {
            display: none;
          }
        "
      `);
    });
  });

  describe('inputOutline', () => {
    it('should match the snapshot', () => {
      const { styles } = inputOutline(light);
      expect(styles).toMatchInlineSnapshot(`
        "
            box-shadow: 0 0 0 1px #999;

            &:hover {
              box-shadow: 0 0 0 1px #666;
            }

            &:focus {
              box-shadow: 0 0 0 2px #3063E9;
            }

            &:active {
              box-shadow: 0 0 0 1px #3063E9;
            }
          "
      `);
    });

    it('should match the snapshot when invalid', () => {
      const { styles } = inputOutline({
        theme: light,
        invalid: true,
      });
      expect(styles).toMatchInlineSnapshot(`
        "
            box-shadow: 0 0 0 1px #D23F47;

            &:hover {
              box-shadow: 0 0 0 1px #B22426;
            }

            &:focus {
              box-shadow: 0 0 0 2px #D23F47;
            }

            &:active {
              box-shadow: 0 0 0 1px #D23F47;
            }
          "
      `);
    });

    it('should match the snapshot when it has a warning', () => {
      const { styles } = inputOutline({
        theme: light,
        hasWarning: true,
      });
      expect(styles).toMatchInlineSnapshot(`
        "
            box-shadow: 0 0 0 1px #F5C625;

            &:hover {
              box-shadow: 0 0 0 1px #AD7A14;
            }

            &:focus {
              box-shadow: 0 0 0 2px #F5C625;
            }

            &:active {
              box-shadow: 0 0 0 1px #F5C625;
            }
          "
      `);
    });
  });
});
