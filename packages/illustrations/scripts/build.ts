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
  BASE_URL,
} from '../constants.js';

// eslint-disable-next-line import-x/no-relative-packages
import config from '../../../biome.json' with { type: 'json' };

function buildHelpersFile(): string {
  return `
    export function getIllustrationUrl(variant, size, theme) {
      return '${BASE_URL}/illustrations/' + variant + (size ? '_' + size : '') + (theme ? '_' + theme : '') + '.svg';
    }
  `;
}
function buildDeclarationFile(): string {
  return `
    export type Size = ${SIZES.join(' | ')};
    export type Theme = ${THEMES.join(' | ')};
    export type Variant = ${VARIANTS.join(' | ')};
    export function getIllustrationUrl<Variant extends Variants>(name: Variants, size?: SIZES, theme?: THEMES): string;
    
  `;
}

function buildIndexFile(): string {
  const helpersExport = `export * from './helpers.js';`;
  return `
    ${helpersExport}
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

  await transpileModule('index.js', indexRaw);
  await transpileModule('helpers.js', helpersRaw);

  await writeFile(DIST_DIR, 'index.d.ts', declarationFile);
}

void main();
