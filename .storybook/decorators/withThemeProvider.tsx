import { css, ThemeProvider, Global } from '@emotion/react';
import { Decorator } from '@storybook/react';
import { light } from '@sumup/design-tokens';

const lightTheme = css`
  body {
    /* Neutral backgrounds */
    --cui-bg-normal: #ffffff;
    --cui-bg-normal-hovered: #eef0f2;
    --cui-bg-normal-pressed: #d8dde1;
    --cui-bg-normal-disabled: rgba(255, 255, 255, 0.4);
    --cui-bg-subtle: #eef0f2;
    --cui-bg-subtle-hovered: #d8dde1;
    --cui-bg-subtle-pressed: #c9d0d6;
    --cui-bg-subtle-disabled: rgba(238, 240, 242, 0.4);
    --cui-bg-highlight: #d8dde1;
    --cui-bg-highlight-hovered: #d0d3d6;
    --cui-bg-highlight-pressed: #babec1;
    --cui-bg-highlight-disabled: rgba(216, 221, 225, 0.4);
    --cui-bg-strong: #0f131a;
    --cui-bg-strong-hovered: #0f131a;
    --cui-bg-strong-pressed: #0f131a;
    --cui-bg-strong-disabled: rgba(15, 19, 26, 0.4);
    /* Accent backgrounds */
    --cui-bg-accent: #f5f5f5;
    --cui-bg-accent-hovered: #d8dde1;
    --cui-bg-accent-pressed: #d8dde1;
    --cui-bg-accent-disabled: rgba(238, 240, 242, 0.4);
    --cui-bg-accent-strong: #0f131a;
    --cui-bg-accent-strong-hovered: #0f131a;
    --cui-bg-accent-strong-pressed: #0f131a;
    --cui-bg-accent-strong-disabled: rgba(15, 19, 26, 0.4);
    /* Success backgrounds */
    --cui-bg-success: #e9fbe9;
    --cui-bg-success-hovered: #d7f8d7;
    --cui-bg-success-pressed: #c1e8c1;
    --cui-bg-success-disabled: rgba(193, 232, 193, 0.4);
    --cui-bg-success-strong: #018850;
    --cui-bg-success-strong-hovered: #007a4e;
    --cui-bg-success-strong-pressed: #016c26;
    --cui-bg-success-strong-disabled: rgba(1, 135, 48, 0.4);
    /* Warning backgrounds */
    --cui-bg-warning: #fdf4db;
    --cui-bg-warning-hovered: #faeec6;
    --cui-bg-warning-pressed: #f5dea3;
    --cui-bg-warning-disabled: rgba(245, 222, 163, 0.4);
    --cui-bg-warning-strong: #e87c00;
    --cui-bg-warning-strong-hovered: #cc6d00;
    --cui-bg-warning-strong-pressed: #b25c00;
    --cui-bg-warning-strong-disabled: rgba(232, 124, 0, 0.4);
    /* Danger backgrounds */
    --cui-bg-danger: #fbe9e7;
    --cui-bg-danger-hovered: #fcddd9;
    --cui-bg-danger-pressed: #f7ccc7;
    --cui-bg-danger-disabled: rgba(247, 204, 199, 0.4);
    --cui-bg-danger-strong: #de331d;
    --cui-bg-danger-strong-hovered: #bd2c19;
    --cui-bg-danger-strong-pressed: #9e2415;
    --cui-bg-danger-strong-disabled: rgba(222, 51, 29, 0.4);
    /* Promo backgrounds */
    --cui-bg-promo: #f5edfe;
    --cui-bg-promo-hovered: #ede0fc;
    --cui-bg-promo-pressed: #e0c9f8;
    --cui-bg-promo-disabled: rgba(224, 201, 248, 0.4);
    --cui-bg-promo-strong: #9e33e0;
    --cui-bg-promo-strong-hovered: #8a1ecc;
    --cui-bg-promo-strong-pressed: #7219a9;
    --cui-bg-promo-strong-disabled: rgba(149, 53, 208, 0.4);
    /* Neutral foregrounds */
    --cui-fg-normal: #0f131a;
    --cui-fg-normal-hovered: #0f131a;
    --cui-fg-normal-pressed: #0f131a;
    --cui-fg-normal-disabled: rgba(15, 19, 26, 0.4);
    --cui-fg-subtle: #6a737c;
    --cui-fg-subtle-hovered: #4a535b;
    --cui-fg-subtle-pressed: #31383e;
    --cui-fg-subtle-disabled: rgba(106, 115, 124, 0.4);
    --cui-fg-placeholder: #9da7b1;
    --cui-fg-placeholder-hovered: #88929b;
    --cui-fg-placeholder-pressed: #79828b;
    --cui-fg-placeholder-disabled: rgba(157, 167, 177, 0.4);
    --cui-fg-on-strong: #ffffff;
    --cui-fg-on-strong-hovered: #ffffff;
    --cui-fg-on-strong-pressed: #ffffff;
    --cui-fg-on-strong-disabled: rgba(255, 255, 255, 0.4);
    /* Accent foregrounds */
    --cui-fg-accent: #0f131a;
    --cui-fg-accent-hovered: #0f131a;
    --cui-fg-accent-pressed: #0f131a;
    --cui-fg-accent-disabled: rgba(15, 19, 26, 0.4);
    /* Success foregrounds */
    --cui-fg-success: #018850;
    --cui-fg-success-hovered: #007a4e;
    --cui-fg-success-pressed: #016c26;
    --cui-fg-success-disabled: rgba(1, 135, 48, 0.4);
    /* Warning foregrounds */
    --cui-fg-warning: #e27900;
    --cui-fg-warning-hovered: #cc6d00;
    --cui-fg-warning-pressed: #b25c00;
    --cui-fg-warning-disabled: rgba(232, 124, 0, 0.4);
    /* Danger foregrounds */
    --cui-fg-danger: #de331d;
    --cui-fg-danger-hovered: #bd2c19;
    --cui-fg-danger-pressed: #9e2415;
    --cui-fg-danger-disabled: rgba(222, 51, 29, 0.4);
    /* Promo foregrounds */
    --cui-fg-promo: #9e33e0;
    --cui-fg-promo-hovered: #8a1ecc;
    --cui-fg-promo-pressed: #7219a9;
    --cui-fg-promo-disabled: rgba(149, 53, 208, 0.4);
    /* Neutral borders */
    --cui-border-normal: #9da7b1;
    --cui-border-normal-hovered: #8d959d;
    --cui-border-normal-pressed: #757c84;
    --cui-border-normal-disabled: rgba(157, 167, 177, 0.4);
    --cui-border-subtle: #d8dde1;
    --cui-border-subtle-hovered: #c6cdd2;
    --cui-border-subtle-pressed: #b0b9bf;
    --cui-border-subtle-disabled: rgba(216, 221, 225, 0.4);
    --cui-border-divider: #c0c6cc;
    --cui-border-divider-hovered: #8c939b;
    --cui-border-divider-pressed: #757c84;
    --cui-border-divider-disabled: rgba(157, 167, 177, 0.4);
    --cui-border-strong: #0f131a;
    --cui-border-strong-hovered: #0f131a;
    --cui-border-strong-pressed: #0f131a;
    --cui-border-strong-disabled: rgba(15, 19, 26, 0.4);
    /* Accent borders */
    --cui-border-accent: #0f131a;
    --cui-border-accent-hovered: #0f131a;
    --cui-border-accent-pressed: #0f131a;
    --cui-border-accent-disabled: rgba(15, 19, 26, 0.4);
    /* Success borders */
    --cui-border-success: #018850;
    --cui-border-success-hovered: #007a4e;
    --cui-border-success-pressed: #016c26;
    --cui-border-success-disabled: rgba(1, 135, 48, 0.4);
    /* Warning borders */
    --cui-border-warning: #e87c00;
    --cui-border-warning-hovered: #cc6d00;
    --cui-border-warning-pressed: #b25c00;
    --cui-border-warning-disabled: rgba(232, 124, 0, 0.4);
    /* Danger borders */
    --cui-border-danger: #de331d;
    --cui-border-danger-hovered: #bd2c19;
    --cui-border-danger-pressed: #9e2415;
    --cui-border-danger-disabled: rgba(222, 51, 29, 0.4);
    /* Promo borders */
    --cui-border-promo: #9e33e0;
    --cui-border-promo-hovered: #8a1ecc;
    --cui-border-promo-pressed: #7219a9;
    --cui-border-promo-disabled: rgba(149, 53, 208, 0.4);
    /* Special colors */
    --cui-bg-overlay: rgba(0, 0, 0, 0.4);
    --cui-bg-elevated: #ffffff;
    --cui-border-focus: #d8dde1;
  }
`;

const darkTheme = css`
  body {
    /* Neutral backgrounds */
    --cui-bg-normal: #000;
    --cui-bg-normal-hovered: #f5f5f5;
    --cui-bg-normal-pressed: #e6e6e6;
    --cui-bg-normal-disabled: rgba(255, 255, 255, 0.4);
    --cui-bg-subtle: #f5f5f5;
    --cui-bg-subtle-hovered: #e6e6e6;
    --cui-bg-subtle-pressed: #cccccc;
    --cui-bg-subtle-disabled: rgba(245, 245, 245, 0.4);
    --cui-bg-highlight: #e6e6e6;
    --cui-bg-highlight-hovered: #cccccc;
    --cui-bg-highlight-pressed: #999999;
    --cui-bg-highlight-disabled: rgba(230, 230, 230, 0.4);
    --cui-bg-strong: #000000;
    --cui-bg-strong-hovered: #000000;
    --cui-bg-strong-pressed: #000000;
    --cui-bg-strong-disabled: rgba(0, 0, 0, 0.4);
    /* Accent backgrounds */
    --cui-bg-accent: #ebf4ff;
    --cui-bg-accent-hovered: #dbe9ff;
    --cui-bg-accent-pressed: #c7dbff;
    --cui-bg-accent-disabled: rgba(235, 244, 255, 0.4);
    --cui-bg-accent-strong: #3064e3;
    --cui-bg-accent-strong-hovered: #1c51d3;
    --cui-bg-accent-strong-pressed: #10399e;
    --cui-bg-accent-strong-disabled: rgba(48, 100, 227, 0.4);
    /* Success backgrounds */
    --cui-bg-success: #e9fbe9;
    --cui-bg-success-hovered: #d7f8d7;
    --cui-bg-success-pressed: #c1e8c1;
    --cui-bg-success-disabled: rgba(193, 232, 193, 0.4);
    --cui-bg-success-strong: #018850;
    --cui-bg-success-strong-hovered: #007a4e;
    --cui-bg-success-strong-pressed: #016c26;
    --cui-bg-success-strong-disabled: rgba(1, 135, 48, 0.4);
    /* Warning backgrounds */
    --cui-bg-warning: #fdf4db;
    --cui-bg-warning-hovered: #faeec6;
    --cui-bg-warning-pressed: #f5dea3;
    --cui-bg-warning-disabled: rgba(245, 222, 163, 0.4);
    --cui-bg-warning-strong: #e87c00;
    --cui-bg-warning-strong-hovered: #cc6d00;
    --cui-bg-warning-strong-pressed: #b25c00;
    --cui-bg-warning-strong-disabled: rgba(232, 124, 0, 0.4);
    /* Danger backgrounds */
    --cui-bg-danger: #fbe9e7;
    --cui-bg-danger-hovered: #fcddd9;
    --cui-bg-danger-pressed: #f7ccc7;
    --cui-bg-danger-disabled: rgba(247, 204, 199, 0.4);
    --cui-bg-danger-strong: #de331d;
    --cui-bg-danger-strong-hovered: #bd2c19;
    --cui-bg-danger-strong-pressed: #9e2415;
    --cui-bg-danger-strong-disabled: rgba(222, 51, 29, 0.4);
    /* Promo backgrounds */
    --cui-bg-promo: #f5edfe;
    --cui-bg-promo-hovered: #ede0fc;
    --cui-bg-promo-pressed: #e0c9f8;
    --cui-bg-promo-disabled: rgba(224, 201, 248, 0.4);
    --cui-bg-promo-strong: #9e33e0;
    --cui-bg-promo-strong-hovered: #8a1ecc;
    --cui-bg-promo-strong-pressed: #7219a9;
    --cui-bg-promo-strong-disabled: rgba(149, 53, 208, 0.4);
    /* Neutral foregrounds */
    --cui-fg-normal: #fff;
    --cui-fg-normal-hovered: #1a1a1a;
    --cui-fg-normal-pressed: #1a1a1a;
    --cui-fg-normal-disabled: rgba(26, 26, 26, 0.4);
    --cui-fg-subtle: #666666;
    --cui-fg-subtle-hovered: #333333;
    --cui-fg-subtle-pressed: #1a1a1a;
    --cui-fg-subtle-disabled: rgba(102, 102, 102, 0.4);
    --cui-fg-placeholder: #999999;
    --cui-fg-placeholder-hovered: #999999;
    --cui-fg-placeholder-pressed: #999999;
    --cui-fg-placeholder-disabled: rgba(153, 153, 153, 0.4);
    --cui-fg-on-strong: #ffffff;
    --cui-fg-on-strong-hovered: #ffffff;
    --cui-fg-on-strong-pressed: #ffffff;
    --cui-fg-on-strong-disabled: rgba(255, 255, 255, 0.4);
    /* Accent foregrounds */
    --cui-fg-accent: #3064e3;
    --cui-fg-accent-hovered: #1c51d3;
    --cui-fg-accent-pressed: #10399e;
    --cui-fg-accent-disabled: rgba(48, 100, 227, 0.4);
    /* Success foregrounds */
    --cui-fg-success: #018850;
    --cui-fg-success-hovered: #007a4e;
    --cui-fg-success-pressed: #016c26;
    --cui-fg-success-disabled: rgba(1, 135, 48, 0.4);
    /* Warning foregrounds */
    --cui-fg-warning: #e27900;
    --cui-fg-warning-hovered: #cc6d00;
    --cui-fg-warning-pressed: #b25c00;
    --cui-fg-warning-disabled: rgba(232, 124, 0, 0.4);
    /* Danger foregrounds */
    --cui-fg-danger: #de331d;
    --cui-fg-danger-hovered: #bd2c19;
    --cui-fg-danger-pressed: #9e2415;
    --cui-fg-danger-disabled: rgba(222, 51, 29, 0.4);
    /* Promo foregrounds */
    --cui-fg-promo: #9e33e0;
    --cui-fg-promo-hovered: #8a1ecc;
    --cui-fg-promo-pressed: #7219a9;
    --cui-fg-promo-disabled: rgba(149, 53, 208, 0.4);
    /* Neutral borders */
    --cui-border-normal: #cccccc;
    --cui-border-normal-hovered: #999999;
    --cui-border-normal-pressed: #666666;
    --cui-border-normal-disabled: rgba(204, 204, 204, 0.4);
    --cui-border-subtle: #e6e6e6;
    --cui-border-subtle-hovered: #cccccc;
    --cui-border-subtle-pressed: #999999;
    --cui-border-subtle-disabled: rgba(230, 230, 230, 0.4);
    --cui-border-divider: #cccccc;
    --cui-border-divider-hovered: #999999;
    --cui-border-divider-pressed: #666666;
    --cui-border-divider-disabled: rgba(204, 204, 204, 0.4);
    --cui-border-strong: #1a1a1a;
    --cui-border-strong-hovered: #000000;
    --cui-border-strong-pressed: #000000;
    --cui-border-strong-disabled: rgba(0, 0, 0, 0.4);
    /* Accent borders */
    --cui-border-accent: #3064e3;
    --cui-border-accent-hovered: #1c51d3;
    --cui-border-accent-pressed: #10399e;
    --cui-border-accent-disabled: rgba(48, 100, 227, 0.4);
    /* Success borders */
    --cui-border-success: #018850;
    --cui-border-success-hovered: #007a4e;
    --cui-border-success-pressed: #016c26;
    --cui-border-success-disabled: rgba(1, 135, 48, 0.4);
    /* Warning borders */
    --cui-border-warning: #e87c00;
    --cui-border-warning-hovered: #cc6d00;
    --cui-border-warning-pressed: #b25c00;
    --cui-border-warning-disabled: rgba(232, 124, 0, 0.4);
    /* Danger borders */
    --cui-border-danger: #de331d;
    --cui-border-danger-hovered: #bd2c19;
    --cui-border-danger-pressed: #9e2415;
    --cui-border-danger-disabled: rgba(222, 51, 29, 0.4);
    /* Promo borders */
    --cui-border-promo: #9e33e0;
    --cui-border-promo-hovered: #8a1ecc;
    --cui-border-promo-pressed: #7219a9;
    --cui-border-promo-disabled: rgba(149, 53, 208, 0.4);
    /* Special colors */
    --cui-bg-overlay: rgba(0, 0, 0, 0.4);
    --cui-bg-elevated: #ffffff;
    --cui-border-focus: #ebf4ff;
  }
`;

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const withThemeProvider: Decorator = (Story, context) => {
  const theme = context.parameters.theme || context.globals.theme;
  return (
    <ThemeProvider theme={light}>
      <Global styles={themes[theme]} />
      <Story />
    </ThemeProvider>
  );
};
