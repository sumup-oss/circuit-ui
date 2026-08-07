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

function buildTypesFile(): string {
  const illustrationUrlMap = buildIllustrationUrlMapType();

  return `
    export type Name = ${NAMES.map((name) => `"${name}"`).join(' | ')};
    export type Category = ${CATEGORIES.map((name) => `"${name}"`).join(' | ')};
    export type ColorScheme = ${COLOR_SCHEMES.map((theme) => `"${theme}"`).join(' | ')};
    export type IllustrationManifest = {
      illustrations: {
        name: Name,
        category: Category,
        'color-scheme': ColorScheme,
        keywords?: string[],
      }[]
    };
    export type IllustrationUrlMap = ${illustrationUrlMap};
`;
}

function buildHelpersFile(): string {
  return `
    import type {Name, IllustrationUrlMap} from './types.ts';
    export function getIllustrationUrl<N extends keyof IllustrationUrlMap>(name: N, colorScheme: IllustrationUrlMap[N]): string {
      return '${BASE_URL}/illustrations/' + name + (colorScheme ? '_' + colorScheme : '') + '.svg';
    }
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
    import type {Name, ColorScheme} from '../types.ts';
    import type { HTMLAttributes } from 'react';

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
    
    export function Illustration({ name, 'color-scheme': colorScheme, size = 240, alt, style: styleProp, className: classNameProp, ...props }: IllustrationProps) {
      
      const illustrationData: Record<Name, ColorScheme[]> = ${JSON.stringify(illustrations)} ;
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
      }, {} as Record<string, string>);
      
      
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
  const typesExport = `export * from './types.js';`;
  const namesArray = NAMES.map((name) => JSON.stringify(name)).join(', ');
  const names = `export const NAMES: Name[] = [${namesArray}] as const;`;
  return `
  import type {Name} from './types.ts';
  ${typesExport}
  ${helpersExport}
  ${illustrationExport}
  ${names}
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
  const typesRaw = buildTypesFile();
  const illustrationComponentRaw = buildIllustrationComponentFile();

  const illustrationCss = await fs.readFile(
    path.join(BASE_DIR, 'styles/Illustration.module.css'),
    'utf8',
  );
  await writeFile(
    BUILD_DIR,
    'Illustration.tsx',
    illustrationComponentRaw,
    'components',
  );
  await writeFile(BUILD_DIR, 'index.ts', indexRaw);
  await writeFile(BUILD_DIR, 'types.ts', typesRaw);
  await writeFile(BUILD_DIR, 'helpers.ts', helpersRaw);
  await writeFile(
    BUILD_DIR,
    'Illustration.module.css',
    illustrationCss,
    'components',
  );
}

void main();
