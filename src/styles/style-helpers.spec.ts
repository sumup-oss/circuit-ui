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

import { light } from '@sumup/design-tokens';

import * as StyleHelpers from './style-helpers';

describe('Style helpers', () => {
  describe('shadowSingle', () => {
    it('should match the snapshot', () => {
      const { styles } = StyleHelpers.shadowSingle({ theme: light });
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
      const { styles } = StyleHelpers.shadowDouble({ theme: light });
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
      const { styles } = StyleHelpers.shadowTriple({ theme: light });
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
      const { styles } = StyleHelpers.headingKilo({ theme: light });
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
      const { styles } = StyleHelpers.headingMega({ theme: light });
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
      const { styles } = StyleHelpers.headingGiga({ theme: light });
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
      const { styles } = StyleHelpers.headingTera({ theme: light });
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
      const { styles } = StyleHelpers.headingPeta({ theme: light });
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
      const { styles } = StyleHelpers.headingExa({ theme: light });
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
      const { styles } = StyleHelpers.headingZetta({ theme: light });
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
      const { styles } = StyleHelpers.subHeadingKilo({ theme: light });
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
      const { styles } = StyleHelpers.subHeadingMega({ theme: light });
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
      const { styles } = StyleHelpers.textKilo({ theme: light });
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
      const { styles } = StyleHelpers.textMega({ theme: light });
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
      const { styles } = StyleHelpers.textGiga({ theme: light });
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
      const { styles } = StyleHelpers.disableVisually();
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
      const { styles } = StyleHelpers.hideVisually();
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
      const { styles } = StyleHelpers.focusOutline({ theme: light });
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
      const { styles } = StyleHelpers.clearfix();
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
      const { styles } = StyleHelpers.hideScrollbar();
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
      const { styles } = StyleHelpers.inputOutline(light);
      expect(styles).toMatchInlineSnapshot(`
        "
            box-shadow: 0 0 0 1px #999999;

            &:hover {
              box-shadow: 0 0 0 1px #333333;
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
      const { styles } = StyleHelpers.inputOutline({
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
      const { styles } = StyleHelpers.inputOutline({
        theme: light,
        hasWarning: true,
      });
      expect(styles).toMatchInlineSnapshot(`
        "
            box-shadow: 0 0 0 1px #D8A413;

            &:hover {
              box-shadow: 0 0 0 1px #AD7A14;
            }

            &:focus {
              box-shadow: 0 0 0 2px #D8A413;
            }

            &:active {
              box-shadow: 0 0 0 1px #D8A413;
            }
          "
      `);
    });
  });
});
