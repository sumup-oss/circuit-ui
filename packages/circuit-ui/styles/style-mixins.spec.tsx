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

import { css } from '@emotion/core';
import { light, Theme } from '@sumup/design-tokens';

import { create } from '../util/test-utils';

import {
  cx,
  spacing,
  shadow,
  shadowSingle,
  shadowDouble,
  shadowTriple,
  typography,
  disableVisually,
  hideVisually,
  focusOutline,
  focusVisible,
  clearfix,
  hideScrollbar,
  inputOutline,
  listItem,
  navigationItem,
} from './style-mixins';

describe('Style helpers', () => {
  const red = (theme: Theme) => css`
    color: ${theme.colors.r500};
  `;
  const green = (theme: Theme) => css`
    color: ${theme.colors.g500};
  `;
  const purple = css`
    color: rebeccapurple;
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
    });
  });

  describe('spacing', () => {
    it('should apply spacing to four sides when passing a string', () => {
      const { styles } = spacing('mega')(light);
      expect(styles).toMatchInlineSnapshot(`"margin:16px;"`);
    });

    it('should apply individual spacing for one side when passing an object', () => {
      const { styles } = spacing({ bottom: 'kilo' })(light);
      expect(styles).toMatchInlineSnapshot(`"margin-bottom:12px;"`);
    });

    it('should apply individual spacing to each sides when passing all four values in an object', () => {
      const { styles } = spacing({
        top: 'kilo',
        right: 'mega',
        left: 'giga',
        bottom: 'kilo',
      })(light);
      expect(styles).toMatchInlineSnapshot(
        `"margin-top:12px;margin-right:16px;margin-bottom:12px;margin-left:24px;"`,
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
        `"margin-top:0;margin-right:16px;margin-bottom:12px;margin-left:24px;"`,
      );
    });

    it('should support `0` spacing value', () => {
      const { styles } = spacing(0)(light);
      expect(styles).toMatchInlineSnapshot(`"margin:0;"`);
    });

    it('should support the `auto` spacing value', () => {
      const { styles } = spacing('auto')(light);
      expect(styles).toMatchInlineSnapshot(`"margin:auto;"`);
    });
  });

  describe('shadow', () => {
    it('should match the snapshot', () => {
      const { styles } = shadow({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"box-shadow:0 3px 8px 0 rgba(0,0,0,0.2);"`,
      );
    });

    it('should match the snapshot with options', () => {
      const { styles } = shadow()({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"box-shadow:0 3px 8px 0 rgba(0,0,0,0.2);"`,
      );
    });
  });

  describe('shadowSingle', () => {
    it('should match the snapshot', () => {
      const { styles } = shadowSingle({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"box-shadow:0 0 0 1px rgba(12, 15, 20, 0.07),0 0 1px 0 rgba(12, 15, 20, 0.07),0 2px 2px 0 rgba(12, 15, 20, 0.07);"`,
      );
    });
  });

  describe('shadowDouble', () => {
    it('should match the snapshot', () => {
      const { styles } = shadowDouble({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"box-shadow:0 0 0 1px rgba(12, 15, 20, 0.07),0 2px 2px 0 rgba(12, 15, 20, 0.07),0 4px 4px 0 rgba(12, 15, 20, 0.07);"`,
      );
    });
  });

  describe('shadowTriple', () => {
    it('should match the snapshot', () => {
      const { styles } = shadowTriple({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"box-shadow:0 0 0 1px rgba(12, 15, 20, 0.07),0 4px 4px 0 rgba(12, 15, 20, 0.07),0 8px 8px 0 rgba(12, 15, 20, 0.07);"`,
      );
    });
  });

  describe('typography', () => {
    type Size = keyof Theme['typography']['body'];
    const snapshots: { size: Size; snapshot: string }[] = [
      { size: 'one', snapshot: `"font-size:16px;line-height:24px;"` },
      { size: 'two', snapshot: `"font-size:14px;line-height:20px;"` },
    ];
    it.each(snapshots)(
      'should match the snapshot for size %#',
      ({ size, snapshot }) => {
        const { styles } = typography(size)(light);
        expect(styles).toMatchInlineSnapshot(snapshot);
      },
    );
  });

  describe('disableVisually', () => {
    it('should match the snapshot', () => {
      const { styles } = disableVisually();
      expect(styles).toMatchInlineSnapshot(
        `"opacity:0.5;pointer-events:none;box-shadow:none;"`,
      );
    });
  });

  describe('hideVisually', () => {
    it('should match the snapshot', () => {
      const { styles } = hideVisually();
      expect(styles).toMatchInlineSnapshot(
        `"border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px;"`,
      );
    });
  });

  describe('focusOutline', () => {
    it('should match the snapshot', () => {
      const { styles } = focusOutline({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"outline:0;box-shadow:0 0 0 4px #AFD0FE;&::-moz-focus-inner{border:0;}"`,
      );
    });

    it('should match the snapshot with an inset outline', () => {
      const { styles } = focusOutline('inset')({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"outline:0;box-shadow:inset 0 0 0 4px #AFD0FE;&::-moz-focus-inner{border:0;}"`,
      );
    });
  });

  describe('focusVisible', () => {
    it('should match the snapshot', () => {
      const { styles } = focusVisible({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"&:focus{outline:0;box-shadow:0 0 0 4px #AFD0FE;&::-moz-focus-inner{border:0;}}&:focus:not(:focus-visible){box-shadow:none;}"`,
      );
    });

    it('should match the snapshot with an inset outline', () => {
      const { styles } = focusVisible('inset')({ theme: light });
      expect(styles).toMatchInlineSnapshot(
        `"&:focus{outline:0;box-shadow:inset 0 0 0 4px #AFD0FE;&::-moz-focus-inner{border:0;}}&:focus:not(:focus-visible){box-shadow:none;}"`,
      );
    });
  });

  describe('clearfix', () => {
    it('should match the snapshot', () => {
      const { styles } = clearfix();
      expect(styles).toMatchInlineSnapshot(
        `"&::before,&::after{content:' ';display:table;}&::after{clear:both;}"`,
      );
    });
  });

  describe('hideScrollbar', () => {
    it('should match the snapshot', () => {
      const { styles } = hideScrollbar();
      expect(styles).toMatchInlineSnapshot(
        `"-ms-overflow-style:none;scrollbar-width:none;&::-webkit-scrollbar{display:none;}"`,
      );
    });
  });

  describe('inputOutline', () => {
    it('should match the snapshot', () => {
      const { styles } = inputOutline(light);
      expect(styles).toMatchInlineSnapshot(
        `"box-shadow:0 0 0 1px #999;&:hover{box-shadow:0 0 0 1px #666;}&:focus{box-shadow:0 0 0 2px #3063E9;}&:active{box-shadow:0 0 0 1px #3063E9;}"`,
      );
    });

    it('should match the snapshot when disabled', () => {
      const { styles } = inputOutline({
        theme: light,
        disabled: true,
      });
      expect(styles).toMatchInlineSnapshot(`"box-shadow:0 0 0 1px #999;"`);
    });

    it('should match the snapshot when invalid', () => {
      const { styles } = inputOutline({
        theme: light,
        invalid: true,
      });
      expect(styles).toMatchInlineSnapshot(
        `"box-shadow:0 0 0 1px #D23F47;&:hover{box-shadow:0 0 0 1px #B22426;}&:focus{box-shadow:0 0 0 2px #D23F47;}&:active{box-shadow:0 0 0 1px #D23F47;}"`,
      );
    });

    it('should match the snapshot when it has a warning', () => {
      const { styles } = inputOutline({
        theme: light,
        hasWarning: true,
      });
      expect(styles).toMatchInlineSnapshot(
        `"box-shadow:0 0 0 1px #F5C625;&:hover{box-shadow:0 0 0 1px #AD7A14;}&:focus{box-shadow:0 0 0 2px #F5C625;}&:active{box-shadow:0 0 0 1px #F5C625;}"`,
      );
    });
  });

  describe('listItem', () => {
    it('should match the snapshot', () => {
      const { styles } = listItem(light);
      expect(styles).toMatchInlineSnapshot(
        `"background-color:#FFF;padding:12px 32px 12px 16px;border:0;color:#1A1A1A;text-decoration:none;position:relative;&:hover{background-color:#F5F5F5;cursor:pointer;}&:focus{outline:0;box-shadow:inset 0 0 0 4px #AFD0FE;&::-moz-focus-inner{border:0;}}&:focus:not(:focus-visible){box-shadow:none;};;&:active{background-color:#E6E6E6;}&:disabled,&[disabled]{opacity:0.5;pointer-events:none;box-shadow:none;;;}"`,
      );
    });

    it('should match the snapshot when it is destructive', () => {
      const { styles } = listItem({
        theme: light,
        destructive: true,
      });
      expect(styles).toMatchInlineSnapshot(
        `"background-color:#FFF;padding:12px 32px 12px 16px;border:0;color:#D23F47;text-decoration:none;position:relative;&:hover{background-color:#F5F5F5;cursor:pointer;}&:focus{outline:0;box-shadow:inset 0 0 0 4px #AFD0FE;&::-moz-focus-inner{border:0;}}&:focus:not(:focus-visible){box-shadow:none;};;&:active{background-color:#E6E6E6;}&:disabled,&[disabled]{opacity:0.5;pointer-events:none;box-shadow:none;;;}"`,
      );
    });
  });

  describe('navigationItem', () => {
    it('should match the snapshot', () => {
      const { styles } = navigationItem(light);
      expect(styles).toMatchInlineSnapshot(
        `"display:flex;align-items:center;border:none;outline:none;color:#1A1A1A;background-color:#FFF;text-align:left;cursor:pointer;transition:color 120ms ease-in-out,background-color 120ms ease-in-out;&:hover{background-color:#F5F5F5;}&:active{background-color:#E6E6E6;}&:focus{outline:0;box-shadow:inset 0 0 0 4px #AFD0FE;&::-moz-focus-inner{border:0;}}&:focus:not(:focus-visible){box-shadow:none;};;&:disabled{opacity:0.5;pointer-events:none;box-shadow:none;;;}"`,
      );
    });

    it('should match the snapshot when it is active', () => {
      const { styles } = navigationItem({
        theme: light,
        isActive: true,
      });
      expect(styles).toMatchInlineSnapshot(
        `"display:flex;align-items:center;border:none;outline:none;color:#3063E9;background-color:#F0F6FF;text-align:left;cursor:pointer;transition:color 120ms ease-in-out,background-color 120ms ease-in-out;&:hover{background-color:#F0F6FF;}&:active{background-color:#E6E6E6;}&:focus{outline:0;box-shadow:inset 0 0 0 4px #AFD0FE;&::-moz-focus-inner{border:0;}}&:focus:not(:focus-visible){box-shadow:none;};;&:disabled{opacity:0.5;pointer-events:none;box-shadow:none;;;}"`,
      );
    });
  });
});
