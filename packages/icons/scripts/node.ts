/**
 * Copyright 2020, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs';
import path from 'path';
import dedent from 'dedent';
import { transformSync } from '@babel/core';

import manifest from '../manifest.json';

const BASE_DIR = path.join(__dirname, '..');
const ICONS_DIR = path.join(BASE_DIR, 'icons');
const DIST_DIR = path.join(BASE_DIR, 'dist');

enum IconSize {
  SMALL = 'small',
  LARGE = 'large',
}

type Icon = {
  name: string;
  category: string;
  size: IconSize;
  full: boolean;
};

type File = {
  filePath: string;
  componentName: string;
};

function getComponentName(name: string): string {
  // Split on non-word characters
  const words = name.split(/\W/);
  // Uppercase the first letter and lowercase the rest
  const pascalCased = words.map(
    (part) => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase(),
  );
  return pascalCased.join('');
}

function buildIndexFile(files: File[]): string {
  const importStatements = files.map(
    ({ componentName, filePath }) =>
      `import { ReactComponent as ${componentName} } from '${filePath}';`,
  );
  const exportNames = files.map((file) => file.componentName);
  return dedent`
    ${importStatements.join('\n')}
    export { ${exportNames.join(', ')} };
  `;
}

function buildDeclarationFile(files: File[]): string {
  const importStatement = "import { FC, SVGProps } from 'react';";
  const declarationStatements = files.map(
    ({ componentName }) =>
      `declare const ${componentName}: FC<SVGProps<SVGSVGElement>>;`,
  );
  const exportNames = files.map((file) => file.componentName);
  return dedent`
    ${importStatement};
    ${declarationStatements.join('\n')}
    export { ${exportNames.join(', ')} };
  `;
}

function writeFile(dir: string, fileName: string, fileContent: string): void {
  const filePath = path.join(dir, fileName);
  const directory = path.dirname(filePath);
  if (directory && directory !== '.') {
    fs.mkdirSync(directory, { recursive: true });
  }
  return fs.writeFile(filePath, fileContent, { flag: 'w' }, (err) => {
    if (err) {
      throw err;
    }
  });
}

function main(): void {
  const files = manifest.icons.map(({ name }) => {
    const filePath = path.join(ICONS_DIR, `${name}.svg`);
    const componentName = getComponentName(name);
    return { filePath, componentName };
  });

  const indexRaw = buildIndexFile(files);
  const indexFile = transformSync(indexRaw, {
    cwd: BASE_DIR,
    filename: 'index.js',
    presets: [['@babel/preset-env', { modules: false }]],
    plugins: ['inline-react-svg'],
  }).code;

  const declarationFile = buildDeclarationFile(files);

  writeFile(DIST_DIR, 'index.js', indexFile);
  writeFile(DIST_DIR, 'index.d.ts', declarationFile);
}

main();
