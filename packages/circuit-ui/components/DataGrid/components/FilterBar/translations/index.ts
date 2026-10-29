import { transformModulesToTranslations } from '../../../../../util/i18n.js';

export const translations = transformModulesToTranslations<
  typeof import('./en-US.json')
>(
  import.meta.glob('./*.json', {
    eager: true,
  }),
);
