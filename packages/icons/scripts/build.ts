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

import fs from 'node:fs';
import path from 'node:path';

import prettier from 'prettier';
import { transformSync } from '@babel/core';

import {
  BASE_DIR,
  DIST_DIR,
  ICON_DIR,
  CATEGORIES,
  SIZES,
} from '../constants.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Import assertions are fine
import manifest from '../manifest.json' assert { type: 'json' };

type Icon = {
  name: string;
  category: (typeof CATEGORIES)[number];
  keywords?: string[];
  size: (typeof SIZES)[number];
  deprecation?: string;
};

type Component = {
  name: string;
  icons: Icon[];
  deprecation?: string;
};

function createDeprecationComment(deprecation?: string) {
  if (!deprecation) {
    return '';
  }
  return `
    /**
     * @deprecated ${deprecation}
     */`;
}

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

  const iconImports = icons.map(
    (icon) =>
      `import { ReactComponent as ${icon.name} } from '${icon.filePath}';`,
  );
  const sizes = icons.map((icon) => parseInt(icon.size, 10)).sort();
  const defaultSize = sizes.includes(24) ? '24' : Math.min(...sizes).toString();
  const sizeMap = icons.map((icon) => `'${icon.size}': ${icon.name},`);
  const invalidSizeWarning = `The '\${size}' size is not supported by the '${
    component.name
  }' icon. Please use one of the available sizes: '${sizes.join("', '")}'.`;

  /**
   * TODO: look into whether we still need the React import here
   */
  return `
    import React from 'react';
    ${iconImports.join('\n')}

    const sizeMap = {
      ${sizeMap.join('\n')}
    }

    ${createDeprecationComment(component.deprecation)}
    export function ${component.name}({ size = '${defaultSize}', ...props }) {
      const Icon = sizeMap[size] || sizeMap['${defaultSize}'];

      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        !sizeMap[size]
      ) {
        console.warn(new Error(\`${invalidSizeWarning}\`));
      }

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
    const sizes = component.icons.map(({ size }) => `'${size}'`).sort();
    const SizesType = sizes.join(' | ');
    return `
      ${createDeprecationComment(component.deprecation)}
      declare const ${component.name}: IconComponentType<${SizesType}>;`;
  });
  const exportNames = components.map((file) => file.name);
  return `
    import type { FunctionComponent, SVGProps } from 'react';

    export interface IconProps<Sizes extends string = any> extends SVGProps<SVGSVGElement> {
      /**
       * Choose between one of the available sizes. Defaults to '24', if supported, or to the smallest available size.
       */
      size?: Sizes;
    }

    export type IconComponentType<Sizes extends string = any> = FunctionComponent<IconProps<Sizes>>;

    ${declarationStatements.join('\n')}

    export { ${exportNames.join(', ')} };

    export type IconsManifest = {
      icons: {
        name: string;
        category: string;
        keywords?: string[];
        size: '16' | '24' | '32';
        deprecation?: string;
      }[];
    };
  `;
}

function transpileModule(fileName: string, code: string): void {
  const output = transformSync(code, {
    cwd: BASE_DIR,
    targets: { esmodules: true },
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: [['inline-react-svg', { svgo: false }]],
    filename: fileName,
  })?.code as string;
  writeFile(DIST_DIR, fileName, output);
}

function writeFile(dir: string, fileName: string, fileContent: string): void {
  const filePath = path.join(dir, fileName);
  const directory = path.dirname(filePath);
  const formattedContent = prettier.format(fileContent, { filepath: filePath });
  if (directory && directory !== '.') {
    fs.mkdirSync(directory, { recursive: true });
  }
  return fs.writeFileSync(filePath, formattedContent, { flag: 'w' });
}

function main(): void {
  const iconsByName = (manifest.icons as Icon[]).reduce((acc, icon) => {
    acc[icon.name] = acc[icon.name] || [];
    acc[icon.name].push(icon);
    return acc;
  }, {} as Record<string, Icon[]>);
  const components = Object.entries(iconsByName).map(
    ([name, icons]): Component => ({
      name: getComponentName(name),
      icons,
      deprecation: icons.find((icon) => icon.deprecation)?.deprecation,
    }),
  );

  const indexRaw = buildIndexFile(components);
  const declarationFile = buildDeclarationFile(components);

  components.forEach((component) => {
    const componentFileName = `${component.name}.js`;
    const componentRaw = buildComponentFile(component);
    transpileModule(componentFileName, componentRaw);
  });

  transpileModule('index.js', indexRaw);

  writeFile(DIST_DIR, 'index.d.ts', declarationFile);
}

main();
