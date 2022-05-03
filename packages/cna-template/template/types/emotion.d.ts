import { Theme as CircuitTheme } from '@sumup/design-tokens';
import {} from '@emotion/react/types/css-prop'; // See https://github.com/emotion-js/emotion/pull/1941

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CircuitTheme {}
}
