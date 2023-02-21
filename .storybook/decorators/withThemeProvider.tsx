import { ThemeProvider } from '@emotion/react';
import { BaseStyles } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

export function withThemeProvider(Story) {
  return (
    <ThemeProvider theme={light}>
      <BaseStyles />
      <Story />
    </ThemeProvider>
  );
}
