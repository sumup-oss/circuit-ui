import fs from 'node:fs/promises';
import path from 'node:path';

import { Biome, type Configuration } from '@biomejs/js-api/nodejs';
import { transformSync } from '@babel/core';

import {
  BASE_DIR,
  DIST_DIR,
  THEMES,
  VARIANTS,
  CATEGORIES,
  BASE_URL,
} from '../constants.js';
import manifest from '../manifest.json' with { type: 'json' };

// eslint-disable-next-line import-x/no-relative-packages
import config from '../../../biome.json' with { type: 'json' };

type Illustration = {
  name: (typeof VARIANTS)[number];
  category: (typeof CATEGORIES)[number];
  keywords?: string[];
  theme: (typeof THEMES)[number];
};

type IllustrationsByVariant = Record<string, (typeof THEMES)[number][]>;

function aggregateIllustrationsFromManifest(): IllustrationsByVariant {
  return (manifest.illustrations as Illustration[]).reduce(
    (acc, { name, theme }) => {
      acc[name] = acc[name] || [];
      const illustration = acc[name];
      illustration.push(theme);
      return acc;
    },
    {} as IllustrationsByVariant,
  );
}

function buildIllustrationUrlMapType(): string {
  const illustrations = aggregateIllustrationsFromManifest();
  const orderedVariants = Object.keys(illustrations).sort((a, b) =>
    a.localeCompare(b),
  );

  const entries = orderedVariants.flatMap((variantKey) => {
    const themes = illustrations[variantKey];

    if (themes.length === 0) {
      return [];
    }

    const variantLiteral = `${JSON.stringify(variantKey)}`;
    return [
      `  ${variantLiteral}: \n${themes.map((t) => JSON.stringify(t)).join(' | ')}\n  ;`,
    ];
  });

  return `{\n${entries.join('\n')}\n}`;
}

function buildHelpersFile(): string {
  return `
    export function getIllustrationUrl(variant, theme) {
      return '${BASE_URL}/illustrations/' + variant + (theme ? '_' + theme : '') + '.svg';
    }
  `;
}
function buildDeclarationFile(): string {
  const illustrationUrlMap = buildIllustrationUrlMapType();

  return `
    import type { HTMLAttributes, ReactElement } from 'react';

    declare module '*.module.css' {
      const classes: { readonly [key: string]: string };
      export default classes;
    }

    export type Theme = ${THEMES.map((theme) => `"${theme}"`).join(' | ')};
    export type Variant = ${VARIANTS.map((variant) => `"${variant}"`).join(' | ')};
    export type Category = ${CATEGORIES.map((variant) => `"${variant}"`).join(' | ')};
    export type IllustrationManifest = {
      illustrations: {
        name: Variant,
        category: Category,
        theme: Theme,
        keywords?: string[],
      }[]
    };
    type IllustrationUrlMap = ${illustrationUrlMap};

    type ManifestIllustration = {
      [V in keyof IllustrationUrlMap]: {
        
          name: V,
          category: Category,
          theme: IllustrationUrlMap[V],
          keywords?: string[],
        
      }[keyof IllustrationUrlMap[V]];
    }[keyof IllustrationUrlMap];

    export function getIllustrationUrl <V extends keyof IllustrationUrlMap,
      >(
        variant: V,
        theme: IllustrationUrlMap[V]): string;

    export interface IllustrationProps extends HTMLAttributes<HTMLDivElement> {
       /**
       * The illustration variant.
       */  
      variant: Variant;
      /**
       * Accessible label; rendered on the \`role="img"\` container.
       */
      alt?: string;
      /**
       * The theme of the illustration. 
       * @default 'light', if supported, or to the first available theme.
       */
      theme?: Theme;
      /**
       * The size in pixels of the illustration.
       * Illustrations have a 1:1 aspect ratio, so size will be used as both width and height.
       * @default 240
       */
      size?: number;
    }

    export function Illustration(props: IllustrationProps): ReactElement;
  `;
}

function buildIllustrationComponentFile(): string {
  const illustrations = aggregateIllustrationsFromManifest();

  const helperImport = `import { getIllustrationUrl } from './helpers.js';`;
  const stylesImport = `import classes from './Illustration.module.css';`;

  const defaultThemeWarning = `No theme was provided. Defaulting to '\${themeToUse}' theme.`;
  const invalidThemeWarning = `The '\${theme}' theme is not supported by the '\${variant}' illustration. Please use one of the available themes: \${availableThemesString}`;
  const invalidVariantError = `@sumup-oss/illustrations has no '\${variant}' variant. Please use one of the available variants: \${Object.keys(illustrationData).join(', ')}`;

  return `
    ${helperImport}
    ${stylesImport}
    
    export function Illustration({ variant, theme, size = 240, alt, style: styleProp, className: classNameProp, ...props }) {
      
      const illustrationData = ${JSON.stringify(illustrations)};
      const illustration = illustrationData[variant];

      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        !illustration 
      ) {
        throw new Error(\`${invalidVariantError}\`)
      }
      let themeToUse = theme;
      const availableThemes = illustration;

      // if no theme is provided, default to the first available theme and show a warning
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        !theme
      ) {
        themeToUse = availableThemes.includes('light') ? 'light': availableThemes[0];
        console.warn(new Error(\`${defaultThemeWarning}\`));
      }

      // if the requested theme is not supported, default to the first available theme and show a warning
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        theme &&
        !availableThemes.includes(theme)
      ) {
        const availableThemesString = availableThemes.join(', ');
        console.warn(new Error(\`${invalidThemeWarning}\`));
        themeToUse = availableThemes.includes('light') ? 'light': availableThemes[0];
      }
      // if the requested theme is supported, use it exclusively
      // otherwise, make the illustration available in all available themes according to
      // the theme configuration
      const style = (theme && theme === themeToUse) ? {
      '--illustration-url-light': 'url("' + getIllustrationUrl(variant, themeToUse) + '")',
      } : availableThemes.reduce((acc, theme) => {
        acc['--illustration-url-' + theme] = 'url("' + getIllustrationUrl(variant, theme) + '")';
        return acc;
      }, {});
      
      
      const mergedStyle = { ...style, width: size, height: size, ...(styleProp || {}) };
      const mergedClassName = [classes.base, classNameProp].filter(Boolean).join(' ');

      return <div
        role={alt ? 'img' : 'presentation'}
        className={mergedClassName}
        aria-label={alt}
        style={mergedStyle}
        {...props}
      />;
    }
  `;
}

function buildIndexFile(): string {
  const helpersExport = `export * from './helpers.js';`;
  const illustrationExport = `export * from './illustration.js';`;
  return `
    ${helpersExport}
    ${illustrationExport}
  `;
}

async function transpileModule(fileName: string, code: string) {
  const output = transformSync(code, {
    cwd: BASE_DIR,
    targets: { esmodules: true },
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          exclude: ['transform-object-rest-spread'],
        },
      ],
      [
        '@babel/preset-react',
        {
          'runtime': 'automatic',
        },
      ],
    ],
    filename: fileName,
  })?.code as string;
  return writeFile(DIST_DIR, fileName, output);
}

async function writeFile(dir: string, fileName: string, fileContent: string) {
  const filePath = path.join(dir, fileName);
  const directory = path.dirname(filePath);

  const biome = new Biome();
  const { projectKey } = biome.openProject();

  biome.applyConfiguration(projectKey, config as Configuration);

  const formatted = biome.formatContent(projectKey, fileContent, {
    filePath,
  });

  if (directory && directory !== '.') {
    await fs.mkdir(directory, { recursive: true });
  }
  return fs.writeFile(filePath, formatted.content, { flag: 'w' });
}

async function main() {
  const indexRaw = buildIndexFile();
  const helpersRaw = buildHelpersFile();
  const declarationFile = buildDeclarationFile();
  const illustrationComponentRaw = buildIllustrationComponentFile();

  await transpileModule('index.js', indexRaw);
  await transpileModule('illustration.js', illustrationComponentRaw);
  await transpileModule('helpers.js', helpersRaw);
  const illustrationCss = await fs.readFile(
    path.join(BASE_DIR, 'styles/Illustration.module.css'),
    'utf8',
  );
  await writeFile(DIST_DIR, 'Illustration.module.css', illustrationCss);
  const illustrationCssTypes = await fs.readFile(
    path.join(BASE_DIR, 'styles/Illustration.module.css.d.ts'),
    'utf8',
  );
  await writeFile(
    DIST_DIR,
    'Illustration.module.css.d.ts',
    illustrationCssTypes,
  );
  await writeFile(DIST_DIR, 'index.d.ts', declarationFile);
}

void main();
