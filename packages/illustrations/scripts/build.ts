import fs from 'node:fs/promises';
import path from 'node:path';

import {
  BASE_DIR,
  BUILD_DIR,
  COLOR_SCHEMES,
  NAMES,
  CATEGORIES,
  BASE_URL,
} from '../constants.js';
import manifest from '../manifest.json' with { type: 'json' };

type Illustration = {
  name: (typeof NAMES)[number];
  category: (typeof CATEGORIES)[number];
  keywords?: string[];
  'color-scheme': (typeof COLOR_SCHEMES)[number];
};

type IllustrationsByName = Record<string, (typeof COLOR_SCHEMES)[number][]>;

function aggregateIllustrationsFromManifest(): IllustrationsByName {
  return (manifest.illustrations as Illustration[]).reduce(
    (acc, { name, 'color-scheme': colorScheme }) => {
      acc[name] = acc[name] || [];
      const illustration = acc[name];
      illustration.push(colorScheme);
      return acc;
    },
    {} as IllustrationsByName,
  );
}

function buildIllustrationUrlMapType(): string {
  const illustrations = aggregateIllustrationsFromManifest();
  const ordered = Object.keys(illustrations).sort((a, b) => a.localeCompare(b));

  const entries = ordered.flatMap((name) => {
    const illustrationThemes = illustrations[name];

    if (illustrationThemes.length === 0) {
      return [];
    }

    const nameLiteral = `${JSON.stringify(name)}`;
    return [
      `  ${nameLiteral}: \n${illustrationThemes.map((t) => JSON.stringify(t)).join(' | ')}\n  ;`,
    ];
  });

  return `{\n${entries.join('\n')}\n}`;
}

function buildHelpersFile(): string {
  return `
    export function getIllustrationUrl(name, colorScheme = 'light') {
      return '${BASE_URL}/illustrations/' + name + (colorScheme ? '_' + colorScheme : '') + '.svg';
    }
  `;
}
function buildDeclarationFile(): string {
  const illustrationUrlMap = buildIllustrationUrlMapType();

  return `
    import type { HTMLAttributes, ReactElement } from 'react';

    export type ColorScheme = ${COLOR_SCHEMES.map((theme) => `"${theme}"`).join(' | ')};
    export type Name = ${NAMES.map((name) => `"${name}"`).join(' | ')};
    export type Category = ${CATEGORIES.map((name) => `"${name}"`).join(' | ')};
    export type IllustrationManifest = {
      illustrations: {
        name: Name,
        category: Category,
        'color-scheme': ColorScheme,
        keywords?: string[],
      }[]
    };
    type IllustrationUrlMap = ${illustrationUrlMap};

    type ManifestIllustration = {
      [V in keyof IllustrationUrlMap]: {
        
          name: V,
          category: Category,
          'color-scheme': IllustrationUrlMap[V],
          keywords?: string[],
        
      }[keyof IllustrationUrlMap[V]];
    }[keyof IllustrationUrlMap];

    export function getIllustrationUrl <N extends keyof IllustrationUrlMap,
      >(
        name: N,
        colorScheme?: IllustrationUrlMap[N]): string;

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
       * The color scheme of the illustration. 
       * @default 'light', if supported, or to the first available color scheme.
       */
      'color-scheme'?: ColorScheme;
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

  const helperImport = `import { getIllustrationUrl } from '../helpers.js';`;
  const stylesImport = `import classes from './Illustration.module.css';`;

  const invalidNameError = `@sumup-oss/illustrations has no '\${name}' illustration. Please use one of the available names: \${Object.keys(illustrationData).join(', ')}`;

  return `
    ${helperImport}
    ${stylesImport}
    
    export function Illustration({ name, 'color-scheme': colorScheme, size = 240, alt, style: styleProp, className: classNameProp, ...props }) {
      
      const illustrationData = ${JSON.stringify(illustrations)};
      const illustrationThemes = illustrationData[name];

      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        !illustrationThemes 
      ) {
        throw new Error(\`${invalidNameError}\`)
      }

      // if the requested theme is supported, use it exclusively
      // otherwise, make the illustration available in all available themes according to
      // the theme configuration
      const style = colorScheme  ? {
      '--illustration-url-light': 'url("' + getIllustrationUrl(name, colorScheme) + '")',
      } : illustrationThemes.reduce((acc, theme) => {
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
  const illustrationExport = `export * from './components/Illustration.jsx';`;
  return `
    ${helpersExport}
    ${illustrationExport}
  `;
}

async function writeFile(
  dir: string,
  fileName: string,
  fileContent: string,
  subPath?: string,
) {
  const filePath = path.join(dir, subPath ?? '', fileName);
  const directory = path.dirname(filePath);

  if (directory && directory !== '.') {
    await fs.mkdir(directory, { recursive: true });
  }
  return fs.writeFile(filePath, fileContent, { flag: 'w' });
}

async function main() {
  const indexRaw = buildIndexFile();
  const helpersRaw = buildHelpersFile();
  const declarationFile = buildDeclarationFile();
  const illustrationComponentRaw = buildIllustrationComponentFile();

  const illustrationCss = await fs.readFile(
    path.join(BASE_DIR, 'styles/Illustration.module.css'),
    'utf8',
  );
  await writeFile(
    BUILD_DIR,
    'Illustration.jsx',
    illustrationComponentRaw,
    'components',
  );
  await writeFile(BUILD_DIR, 'index.js', indexRaw);
  await writeFile(BUILD_DIR, 'helpers.js', helpersRaw);
  await writeFile(
    BUILD_DIR,
    'Illustration.module.css',
    illustrationCss,
    'components',
  );
  await writeFile(BUILD_DIR, 'index.d.ts', declarationFile);
}

void main();
