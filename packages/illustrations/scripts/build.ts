import fs from 'node:fs/promises';
import path from 'node:path';

import { Biome, type Configuration } from '@biomejs/js-api/nodejs';
import { transformSync } from '@babel/core';

import {
  BASE_DIR,
  DIST_DIR,
  THEMES,
  SIZES,
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
  size: (typeof SIZES)[number];
  theme: (typeof THEMES)[number];
};

function buildHelpersFile(): string {
  return `
    export function getIllustrationUrl(variant, size, theme) {
      return '${BASE_URL}/illustrations/' + variant + (size ? '_' + size : '') + (theme ? '_' + theme : '') + '.svg';
    }
  `;
}
function buildDeclarationFile(): string {
  return `
    import type { HTMLAttributes, ReactElement } from 'react';

    declare module '*.module.css' {
      const classes: { readonly [key: string]: string };
      export default classes;
    }

    export type Size = ${SIZES.map((size) => `"${size}"`).join(' | ')};
    export type Theme = ${THEMES.map((theme) => `"${theme}"`).join(' | ')};
    export type Variant = ${VARIANTS.map((variant) => `"${variant}"`).join(' | ')};
    export type Category = ${CATEGORIES.map((variant) => `"${variant}"`).join(' | ')};
    export type IllustrationManifest = {
      illustrations: {
        name: Variant,
        category: Category,
        size: Size,
        theme: Theme,
        keywords?: string[],
      }[]
    };
    // TODO add type safety 
    export function getIllustrationUrl(name: Variant, size?: Size, theme?: Theme): string;

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
       * Choose between one of the 3 sizes: "s", "m" and "l". Defaults to 'm', if supported, or to the first available size.
       */
      size?: Size;
      /**
       * Defaults to 'light', if supported, or to the first available theme.
       */
      theme?: Theme;
    }

    export function Illustration(props: IllustrationProps): ReactElement;
  `;
}

function buildIllustrationComponentFile(): string {
  const illustrations = (manifest.illustrations as Illustration[]).reduce(
    (acc, { name, size, theme }) => {
      acc[name] = acc[name] || {};
      if (acc[name][size] !== undefined) {
        acc[name][size]?.push(theme);
      } else {
        acc[name][size] = [theme];
      }
      return acc;
    },
    {} as Record<
      string,
      {
        s?: string[];
        m?: string[];
        l?: string[];
      }
    >,
  );

  const helperImport = `import { getIllustrationUrl } from './helpers.js';`;
  const stylesImport = `import classes from './Illustration.module.css';`;

  const invalidSizeWarning = `The '\${size}' size is not supported by the '\${variant}' illustration in the '\${theme}' theme. Please use one of the available sizes: \${availableSizesString}`;
  const defaultSizeWarning = `No size was provided. Defaulting to size '\${sizeToUse}'.`;
  const defaultThemeWarning = `No theme was provided. Defaulting to '\${themeToUse}' theme.`;
  const invalidThemeWarning = `The '\${theme}' theme is not supported by the '\${variant}' illustration in the '\${size}' size. Please use one of the available themes: \${availableThemesString}`;
  const invalidVariantError = `@sumup-oss/illustrations has no '\${variant}' variant. Please use one of the available variants: \${Object.keys(illustrationData).join(', ')}`;

  return `
    ${helperImport}
    ${stylesImport}
    
    export function Illustration({ variant, size, theme, alt, style: styleProp, className: classNameProp, ...props }) {
      
      const illustrationData = ${JSON.stringify(illustrations)};
      const illustration = illustrationData[variant];

      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        !illustration
      ) {
        throw new Error(\`${invalidVariantError}\`)
      }
      
      const availableSizes = Object.entries(illustration).reduce((acc = [], [size, themes]) => {
        if(themes.length > 0) {
          acc.push(size);
        }
        return acc;
      }, []);
      let sizeToUse = size;
      
      // if no size is provided, default to the first available size and show a warning
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        !size
      ) {
        sizeToUse = availableSizes.includes('m') ? 'm' : availableSizes[0];
        console.warn(new Error(\`${defaultSizeWarning}\`));
      }
      // if the requested size is not supported, default to the first available size and show a warning
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        size &&
        !availableSizes.includes(size)
      ) {
        sizeToUse = availableSizes.includes('m') ? 'm' : availableSizes[0];
        const availableSizesString = availableSizes.join(', ');
        console.warn(new Error(\`${invalidSizeWarning}\`));
      }
      
      let themeToUse = theme;
      const availableThemes = illustration[sizeToUse];

      // if no theme is provided, default to the first available theme and show a warning
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        availableSizes.includes(size) &&
        !theme
      ) {
        themeToUse = availableThemes.includes('light') ? 'light': availablethemes[0];
        console.warn(new Error(\`${defaultThemeWarning}\`));
      }

      // if the requested theme is not supported, default to the first available theme and show a warning
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        availableSizes.includes(size) &&
        theme &&
        !availableThemes.includes(theme)
      ) {
        const availableThemesString = illustration[sizeToUse].join(', ');
        console.warn(new Error(\`${invalidThemeWarning}\`));
        themeToUse = availableThemes.includes('light') ? 'light': availablethemes[0];
      }
      // if the requested theme is supported, use it exclusively
      // otherwise, make the illustration available in all available themes according to
      // the theme configuration
      const style = (theme && theme === themeToUse) ? {
      '--illustration-url-light': 'url("' + getIllustrationUrl(variant, sizeToUse, themeToUse) + '")',
      } : availableThemes.reduce((acc, theme) => {
        acc['--illustration-url-' + theme] = 'url("' + getIllustrationUrl(variant, sizeToUse, theme) + '")';
        return acc;
      }, {})
      
      const mergedStyle = { ...style, ...(styleProp || {}) };
      const mergedClassName = [classes.base, classes[sizeToUse], classNameProp].filter(Boolean).join(' ');

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
