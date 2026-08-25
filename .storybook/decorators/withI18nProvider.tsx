import type { Decorator } from '@storybook/react-vite';

import { I18nProvider } from '../../packages/circuit-ui/components/I18nContext/I18nContext.js';

export const withI18nProvider: Decorator = (Story, context) => {
  const locale = context.globals.locale as string;

  return (
    <I18nProvider locale={locale}>
      <Story />
    </I18nProvider>
  );
};
