import fs from 'node:fs/promises';
import path from 'node:path';

import { Biome, type Configuration } from '@biomejs/js-api/nodejs';
import { transformSync } from '@babel/core';

import {
  BASE_DIR,
  DIST_DIR,
  THEMES,
  NAMES,
  CATEGORIES,
  BASE_URL,
} from '../constants.js';
import manifest from '../manifest.json' with { type: 'json' };

// eslint-disable-next-line import-x/no-relative-packages
import config from '../../../biome.json' with { type: 'json' };

type Illustration = {
  name: (typeof NAMES)[number];
  category: (typeof CATEGORIES)[number];
  keywords?: string[];
  theme: (typeof THEMES)[number];
};

type IllustrationsByName = Record<string, (typeof THEMES)[number][]>;

function aggregateIllustrationsFromManifest(): IllustrationsByName {
  return (manifest.illustrations as Illustration[]).reduce(
    (acc, { name, theme }) => {
      acc[name] = acc[name] || [];
      const illustration = acc[name];
      illustration.push(theme);
      return acc;
    },
    {} as IllustrationsByName,
  );
}

function buildIllustrationUrlMapType(): string {
  const illustrations = aggregateIllustrationsFromManifest();
  const ordered = Object.keys(illustrations).sort((a, b) => a.localeCompare(b));

  const entries = ordered.flatMap((name) => {
    const themes = illustrations[name];

    if (themes.length === 0) {
      return [];
    }

    const nameLiteral = `${JSON.stringify(name)}`;
    return [
      `  ${nameLiteral}: \n${themes.map((t) => JSON.stringify(t)).join(' | ')}\n  ;`,
    ];
  });

  return `{\n${entries.join('\n')}\n}`;
}

function buildHelpersFile(): string {
  return `
    export function getIllustrationUrl(name, theme = 'light') {
      return '${BASE_URL}/illustrations/' + name + (theme ? '_' + theme : '') + '.svg';
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
    export type Name = ${NAMES.map((name) => `"${name}"`).join(' | ')};
    export type Category = ${CATEGORIES.map((name) => `"${name}"`).join(' | ')};
    export type IllustrationManifest = {
      illustrations: {
        name: Name,
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

    export function getIllustrationUrl <N extends keyof IllustrationUrlMap,
      >(
        name: N,
        theme?: IllustrationUrlMap[N]): string;

    export interface IllustrationProps extends HTMLAttributes<HTMLDivElement> {
       /**
       * The illustration name.
       */  
      name: Name;
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

  const invalidNameError = `@sumup-oss/illustrations has no '\${name}' illustration. Please use one of the available names: \${Object.keys(illustrationData).join(', ')}`;

  return `
    ${helperImport}
    ${stylesImport}
    
    export function Illustration({ name, theme, size = 240, alt, style: styleProp, className: classNameProp, ...props }) {
      
      const illustrationData = ${JSON.stringify(illustrations)};
      const illustration = illustrationData[name];

      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        !illustration 
      ) {
        throw new Error(\`${invalidNameError}\`)
      }
      let themeToUse = theme;
      const availableThemes = illustration;

      // if the requested theme is supported, use it exclusively
      // otherwise, make the illustration available in all available themes according to
      // the theme configuration
      const style = (theme && theme === themeToUse) ? {
      '--illustration-url-light': 'url("' + getIllustrationUrl(name, themeToUse) + '")',
      } : availableThemes.reduce((acc, theme) => {
        acc['--illustration-url-' + theme] = 'url("' + getIllustrationUrl(name, theme) + '")';
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
