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

/** @jsxImportSource @emotion/react */

import { describe, expect, it } from 'vitest';
import { css } from '@emotion/react';
import { light } from '@sumup/design-tokens';

import { create } from '../util/test-utils.js';

import {
  cx,
  spacing,
  shadow,
  typography,
  disableVisually,
  hideVisually,
  focusOutline,
  focusVisible,
  clearfix,
  hideScrollbar,
  inputOutline,
  center,
} from './style-mixins.js';

describe('Style helpers', () => {
  const byte = () => css`
    margin: var(--cui-spacings-byte);
  `;
  const kilo = () => css`
    margin: var(--cui-spacings-kilo);
  `;
  const purple = css`
    color: rebeccapurple;
  `;

  describe('cx', () => {
    it('should call each style function with the theme', () => {
      const actual = create(<div css={cx(byte, kilo)} />);

      expect(actual).toMatchInlineSnapshot(`
        .circuit-0 {
          margin: var(--cui-spacings-byte);
          margin: var(--cui-spacings-kilo);
        }

        <div
          class="circuit-0"
        />
      `);
    });

    it('should support style objects', () => {
      const actual = create(<div css={cx(purple)} />);

      expect(actual).toMatchInlineSnapshot(`
        .circuit-0 {
          color: rebeccapurple;
        }

        <div
          class="circuit-0"
        />
      `);
    });

    it('should skip falsy style functions', () => {
      const isKilo = false;

      const actual = create(<div css={cx(byte, isKilo && kilo)} />);

      expect(actual).toMatchInlineSnapshot(`
        .circuit-0 {
          margin: var(--cui-spacings-byte);
        }

        <div
          class="circuit-0"
        />
      `);
    });
  });

  describe('spacing', () => {
    it('should apply spacing to four sides when passing a string', () => {
      const { styles } = spacing('mega')(light);
      expect(styles).toMatchInlineSnapshot('"margin:16px;"');
    });

    it('should apply individual spacing for one side when passing an object', () => {
      const { styles } = spacing({ bottom: 'kilo' })(light);
      expect(styles).toMatchInlineSnapshot('"margin-bottom:12px;"');
    });

    it('should apply individual spacing to each sides when passing all four values in an object', () => {
      const { styles } = spacing({
        top: 'kilo',
        right: 'mega',
        left: 'giga',
        bottom: 'kilo',
      })(light);
      expect(styles).toMatchInlineSnapshot(
        '"margin-top:12px;margin-right:16px;margin-bottom:12px;margin-left:24px;"',
      );
    });

    it('should apply 0px spacing to one side when passing 0 value in an object', () => {
      const { styles } = spacing({
        top: 0,
        right: 'mega',
        left: 'giga',
        bottom: 'kilo',
      })(light);
      expect(styles).toMatchInlineSnapshot(
        '"margin-top:0;margin-right:16px;margin-bottom:12px;margin-left:24px;"',
      );
    });

    it('should support `0` spacing value', () => {
      const { styles } = spacing(0)(light);
      expect(styles).toMatchInlineSnapshot('"margin:0;"');
    });

    it('should support the `auto` spacing value', () => {
      const { styles } = spacing('auto')(light);
      expect(styles).toMatchInlineSnapshot('"margin:auto;"');
    });
  });

  describe('shadow', () => {
    it('should match the snapshot', () => {
      const { styles } = shadow();
      expect(styles).toMatchInlineSnapshot(
        `
        "
            box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
          "
      `,
      );
    });
  });

  describe('typography', () => {
    it('should match the snapshot for size one', () => {
      const { styles } = typography('one')(light);
      expect(styles).toMatchInlineSnapshot(
        '"font-size:1rem;line-height:1.5rem;"',
      );
    });

    it('should match the snapshot for size two', () => {
      const { styles } = typography('two')(light);
      expect(styles).toMatchInlineSnapshot(
        '"font-size:0.875rem;line-height:1.25rem;"',
      );
    });
  });

  describe('disableVisually', () => {
    it('should match the snapshot', () => {
      const { styles } = disableVisually();
      expect(styles).toMatchInlineSnapshot(
        `
        "
          opacity: 0.5;
          pointer-events: none;
          box-shadow: none;
        "
      `,
      );
    });
  });

  describe('hideVisually', () => {
    it('should match the snapshot', () => {
      const { styles } = hideVisually();
      expect(styles).toMatchInlineSnapshot(
        `
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
      `,
      );
    });
  });

  describe('center', () => {
    it('should match the snapshot', () => {
      const { styles } = center();
      expect(styles).toMatchInlineSnapshot(
        `
        "
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      `,
      );
    });
  });

  describe('focusOutline', () => {
    it('should match the snapshot', () => {
      const { styles } = focusOutline();
      expect(styles).toMatchInlineSnapshot(
        `
        "
            outline: 0;
            box-shadow: 0 0 0 2px var(--cui-bg-normal),
              0 0 0 4px var(--cui-border-focus);

            &::-moz-focus-inner {
              border: 0;
            }
          "
      `,
      );
    });

    it('should match the snapshot with an inset outline', () => {
      const { styles } = focusOutline('inset');
      expect(styles).toMatchInlineSnapshot(
        `
        "
              outline: 0;
              box-shadow: inset 0 0 0 4px var(--cui-border-focus);

              &::-moz-focus-inner {
                border: 0;
              }
            "
      `,
      );
    });
  });

  describe('focusVisible', () => {
    it('should match the snapshot', () => {
      const { styles } = focusVisible();
      expect(styles).toMatchInlineSnapshot(
        `
        "
            &:focus {
              outline: 0;
              box-shadow: 0 0 0 2px var(--cui-bg-normal),
                0 0 0 4px var(--cui-border-focus);

              &::-moz-focus-inner {
                border: 0;
              }
            }

            &:focus:not(:focus-visible) {
              box-shadow: none;
            }
          "
      `,
      );
    });

    it('should match the snapshot with an inset outline', () => {
      const { styles } = focusVisible('inset');
      expect(styles).toMatchInlineSnapshot(
        `
        "
              &:focus {
                outline: 0;
                box-shadow: inset 0 0 0 4px var(--cui-border-focus);

                &::-moz-focus-inner {
                  border: 0;
                }
              }

              &:focus:not(:focus-visible) {
                box-shadow: none;
              }
            "
      `,
      );
    });
  });

  describe('clearfix', () => {
    it('should match the snapshot', () => {
      const { styles } = clearfix();
      expect(styles).toMatchInlineSnapshot(
        `
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
      `,
      );
    });
  });

  describe('hideScrollbar', () => {
    it('should match the snapshot', () => {
      const { styles } = hideScrollbar();
      expect(styles).toMatchInlineSnapshot(
        `
        "
          -ms-overflow-style: none;
          scrollbar-width: none;

          &::-webkit-scrollbar {
            display: none;
          }
        "
      `,
      );
    });
  });

  describe('inputOutline', () => {
    it('should match the snapshot', () => {
      const { styles } = inputOutline({});
      expect(styles).toMatchInlineSnapshot(
        `
        "
                box-shadow: 0 0 0 1px var(--cui-border-normal);

                &:hover {
                  box-shadow: 0 0 0 1px var(--cui-border-normal-hovered);
                }

                &:focus {
                  box-shadow: 0 0 0 2px var(--cui-border-accent);
                }

                &:active {
                  box-shadow: 0 0 0 1px var(--cui-border-accent);
                }
              "
      `,
      );
    });

    it('should match the snapshot when disabled', () => {
      const { styles } = inputOutline({
        disabled: true,
      });
      expect(styles).toMatchInlineSnapshot(
        `
        "
                box-shadow: 0 0 0 1px var(--cui-border-normal-disabled);
              "
      `,
      );
    });

    it('should match the snapshot when invalid', () => {
      const { styles } = inputOutline({
        invalid: true,
      });
      expect(styles).toMatchInlineSnapshot(
        `
        "
                box-shadow: 0 0 0 1px var(--cui-border-danger);

                &:hover {
                  box-shadow: 0 0 0 1px var(--cui-border-danger-hovered);
                }

                &:focus {
                  box-shadow: 0 0 0 2px var(--cui-border-danger);
                }

                &:active {
                  box-shadow: 0 0 0 1px var(--cui-border-danger-pressed);
                }
              "
      `,
      );
    });

    it('should match the snapshot when it has a warning', () => {
      const { styles } = inputOutline({
        hasWarning: true,
      });
      expect(styles).toMatchInlineSnapshot(
        `
        "
                box-shadow: 0 0 0 1px var(--cui-border-warning);

                &:hover {
                  box-shadow: 0 0 0 1px var(--cui-border-warning-hovered);
                }

                &:focus {
                  box-shadow: 0 0 0 2px var(--cui-border-warning);
                }

                &:active {
                  box-shadow: 0 0 0 1px var(--cui-border-warning-pressed);
                }
              "
      `,
      );
    });
  });
});
