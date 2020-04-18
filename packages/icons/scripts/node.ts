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
import { entries, flow, groupBy, map } from 'lodash/fp';
import { transformSync } from '@babel/core';

import manifest from '../manifest.json';

const BASE_DIR = path.join(__dirname, '..');
const ICON_DIR = path.join(BASE_DIR, './web');
const DIST_DIR = path.join(BASE_DIR, 'dist');
const BABEL_CONFIG = {
  cwd: BASE_DIR,
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
  plugins: [['inline-react-svg', { svgo: false }]],
};

enum IconSize {
  SMALL = 'small',
  LARGE = 'large',
}

type Icon = {
  name: string;
  category: string;
  size: IconSize;
};

type Component = {
  name: string;
  icons: Icon[];
};

function getComponentName(name: string): string {
  // Split on non-word characters
  const words = name.split(/[^a-z0-9]/i);
  // Uppercase the first letter and lowercase the rest
  const pascalCased = words.map(
    (part) => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase(),
  );
  return pascalCased.join('');
}

function getFilePath(icon: Icon): string {
  return path.join(ICON_DIR, `${icon.name}_${icon.size}.svg`);
}

function buildComponentFile(component: Component): string {
  const icons = component.icons.map((icon) => ({
    size: icon.size,
    filePath: getFilePath(icon),
    name: getComponentName(`${icon.name}-${icon.size}`),
  }));

  if (icons.length === 1) {
    const icon = icons[0];
    return dedent`
      import { ReactComponent as ${component.name} } from '${icon.filePath}';

      export { ${component.name} };
    `;
  }

  const iconImports = icons.map(
    (icon) =>
      `import { ReactComponent as ${icon.name} } from '${icon.filePath}';`,
  );
  const sizeMap = icons.map((icon) => `${icon.size}: ${icon.name},`);
  return dedent`
    import React from 'react';
    ${iconImports.join('\n')}

    const sizeMap = {
      ${sizeMap.join('\n')}
    }

    export const ${component.name} = ({ size = 'large', ...props }) => {
      const Icon = sizeMap[size];
      return <Icon {...props} />;
    };
  `;
}

function buildIndexFile(components: Component[]): string {
  return components
    .map(({ name }) => `export { ${name} } from './${name}.js';`)
    .join('\n');
}

function buildDeclarationFile(components: Component[]): string {
  const declarationStatements = components.map((component) => {
    const hasMultipleSizes = component.icons.length === 1;
    const PropType = hasMultipleSizes ? 'SVGProps<SVGSVGElement>' : 'IconProps';
    return `declare const ${component.name}: FC<${PropType}>;`;
  });
  const exportNames = components.map((file) => file.name);
  return dedent`
    import { FC, SVGProps } from 'react';

    interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: 'small' | 'large';
    }

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
  const components = flow(
    groupBy('name'),
    entries,
    map((group) => ({ name: getComponentName(group[0]), icons: group[1] })),
  )(manifest.icons);

  const indexRaw = buildIndexFile(components);
  const indexFile = transformSync(indexRaw, {
    ...BABEL_CONFIG,
    filename: 'index.js',
  }).code;
  const declarationFile = buildDeclarationFile(components);

  components.forEach((component) => {
    const componentFileName = `${component.name}.js`;
    const componentRaw = buildComponentFile(component);
    const componentFile = transformSync(componentRaw, {
      ...BABEL_CONFIG,
      filename: componentFileName,
    }).code;
    writeFile(DIST_DIR, componentFileName, componentFile);
  });

  writeFile(DIST_DIR, 'index.js', indexFile);
  writeFile(DIST_DIR, 'index.d.ts', declarationFile);
}

main();
