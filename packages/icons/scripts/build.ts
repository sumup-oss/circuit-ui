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

import fs from 'node:fs/promises';
import path from 'node:path';

import prettier from 'prettier';
import { transformSync } from '@babel/core';

import {
  BASE_DIR,
  DIST_DIR,
  ICON_DIR,
  type CATEGORIES,
  type SIZES,
} from '../constants.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Import assertions are fine
import manifest from '../manifest.json' assert { type: 'json' };

const Variants = ['regular', 'outlined'] as const;

type Icon = {
  name: string;
  category: (typeof CATEGORIES)[number];
  keywords?: string[];
  size: (typeof SIZES)[number];
  variant?: (typeof Variants)[number];
  deprecation?: string;
  skipComponentFile?: boolean;
};

type Component = {
  name: string;
  icons: Icon[];
  deprecation?: string;
};

const DEPRECATED_CATEGORIES = ['Card scheme', 'Payment method'];

function createDeprecationComment(component: Component) {
  if (component.deprecation) {
    return `
    /**
     * @deprecated ${component.deprecation}
     */`;
  }
  if (
    component.icons.some((icon) =>
      DEPRECATED_CATEGORIES.includes(icon.category),
    )
  ) {
    return `
    /**
     * @deprecated This icon is too heavy to be inlined as a React component. [Load it from a URL instead](https://circuit.sumup.com/?path=/docs/packages-icons--docs#load-from-a-url).
     */`;
  }
  return '';
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

function capitalizeVariant(name: string) {
  if (name === 'regular') {
    return '';
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getFilePath(icon: Icon): string {
  const { name, size, variant = 'regular' } = icon;
  return path.join(
    ICON_DIR,
    `${name}_${size}${variant !== 'regular' ? `_${variant}` : ''}.svg`,
  );
}

function buildComponentFile(component: Component): string {
  const icons = component.icons
    .filter((icon) => !icon.skipComponentFile)
    .map((icon) => {
      const { name, size, variant = 'regular' } = icon;
      return {
        size,
        filePath: getFilePath(icon),
        variant,
        name: getComponentName(
          `${name}-${size}${variant !== 'regular' ? `-${icon.variant}` : ''}`,
        ),
      };
    });

  const iconImports = icons.map(
    (icon) =>
      `import { ReactComponent as ${icon.name} } from '${icon.filePath}';`,
  );

  const sizes = icons.map((icon) => Number.parseInt(icon.size, 10)).sort();
  const defaultSize = sizes.includes(24) ? '24' : Math.min(...sizes).toString();

  const iconsMap = icons.map(
    (icon) => `'${icon.size}${capitalizeVariant(icon.variant)}': ${icon.name},`,
  );
  const invalidSizeWarning = `The '\${size}' size is not supported by the '${
    component.name
  }' icon. Please use one of the available sizes: '${sizes.join("', '")}'.`;

  const invalidVariantWarning = `The outlined variant is not supported for the '${
    component.name
  }' icon in size '\${size}'. It will be ignored.`;

  return `
    import React from 'react';
    import { capitalizeVariant } from './helpers.js';

    ${iconImports.join('\n')}

    const iconsMap = {
      ${iconsMap.join('\n')}
    }

    ${createDeprecationComment(component)}
    export function ${component.name}({ size = '${defaultSize}', variant = 'regular', ...props }) {
      const requestedIcon = size + capitalizeVariant(variant);
      const defaultSizeWithVariantId = '${defaultSize}' + capitalizeVariant(variant);
      // prioritise size over variant
      const Icon = iconsMap[requestedIcon] ?? iconsMap[size] ?? iconsMap[defaultSizeWithVariantId] ?? iconsMap['${defaultSize}'];
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        !iconsMap[requestedIcon] &&
        iconsMap[defaultSizeWithVariantId]
      ) {
        console.warn(new Error(\`${invalidSizeWarning}\`));
      }

      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        iconsMap[size] &&
        !iconsMap[requestedIcon]
      ) {
        console.warn(new Error(\`${invalidVariantWarning}\`));
      }

      return <Icon {...props} />;
    };
  `;
}

function buildHelpersFile(): string {
  return `
    export function getIconURL(name, size, variant) {
      return 'https://circuit.sumup.com/icons/v2/' + name + (size ? '_' + size : '') + (variant ? '_' + variant : '') + '.svg';
    }
    
    export function capitalizeVariant(name) {
      if (name === 'regular') return '';
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  `;
}

function buildIndexFile(components: Component[]): string {
  const componentExports = components
    .map(({ name }) => `export { ${name} } from './${name}.js';`)
    .join('\n');
  const helpersExport = `export * from './helpers.js';`;
  return `
    ${helpersExport}
    ${componentExports}
  `;
}

function buildDeclarationFile(components: Component[]): string {
  const declarationStatements = components
    .filter(({ icons }) => icons.some((icon) => !icon.skipComponentFile))
    .map((component) => {
      const sizes = component.icons.map(({ size }) => `'${size}'`).sort();
      const SizesType = sizes.join(' | ');
      return `
      ${createDeprecationComment(component)}
      declare const ${component.name}: IconComponentType<${SizesType}>;`;
    });
  const exportNames = components
    .filter(({ icons }) => icons.some((icon) => !icon.skipComponentFile))
    .map((component) => component.name);
  const iconNames = components.map(
    (component) => `'${component.icons[0].name}'`,
  );
  const iconSizes = components.map((component) => {
    const iconName = component.icons[0].name;
    const sizes = component.icons.map(({ size }) => `'${size}'`).sort();
    const SizesType = sizes.join(' | ');
    return `${iconName}: ${SizesType};`;
  });
  return `
    import type { FunctionComponent, SVGProps } from 'react';

    export interface IconProps<Sizes extends string = any, Variants extends string = any> extends SVGProps<SVGSVGElement> {
      /**
       * Choose between one of the available sizes. Defaults to '24', if supported, or to the smallest available size.
       */
      size?: Sizes;
      /**
       * Choose between one of the available variants. Defaults to 'regular'.
       */
      variant?: Variants;
    }

    export type IconComponentType<Sizes extends string = any, Variants extends string = any> = FunctionComponent<IconProps<Sizes, Variants>>;

    ${declarationStatements.join('\n')}

    export { ${exportNames.join(', ')} };

    export type IconName = ${iconNames.join(' | ')};

    export type IconsManifest = {
      icons: {
        name: IconName;
        category: string;
        skipComponentFile?: boolean;
        keywords?: string[];
        size: '16' | '24' | '32';
        deprecation?: string;
      }[];
    };

    type Icons = {
      ${iconSizes.join('\n')}
    }

    export function getIconURL<Name extends IconName>(name: Name, size?: Icons[Name]): string;
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
      '@babel/preset-react',
    ],
    plugins: [
      [
        path.join(BASE_DIR, './vendor/babel-plugin-inline-react-svg/index.js'),
        { svgo: false, spreadDefaultProps: true },
      ],
    ],
    filename: fileName,
  })?.code as string;
  return writeFile(DIST_DIR, fileName, output);
}

async function writeFile(dir: string, fileName: string, fileContent: string) {
  const filePath = path.join(dir, fileName);
  const directory = path.dirname(filePath);
  const formattedContent = await prettier.format(fileContent, {
    filepath: filePath,
  });
  if (directory && directory !== '.') {
    await fs.mkdir(directory, { recursive: true });
  }
  return fs.writeFile(filePath, formattedContent, { flag: 'w' });
}

async function main() {
  const iconsByName = (manifest.icons as Icon[]).reduce(
    (acc, icon) => {
      acc[icon.name] = acc[icon.name] || [];
      acc[icon.name].push(icon);
      return acc;
    },
    {} as Record<string, Icon[]>,
  );
  const components = Object.entries(iconsByName).map(
    ([name, icons]): Component => ({
      name: getComponentName(name),
      icons,
      deprecation: icons.find((icon) => icon.deprecation)?.deprecation,
    }),
  );

  const indexRaw = buildIndexFile(components);
  const helpersRaw = buildHelpersFile();
  const declarationFile = buildDeclarationFile(components);

  await Promise.all(
    components.map((component) => {
      const componentFileName = `${component.name}.js`;
      const componentRaw = buildComponentFile(component);
      return transpileModule(componentFileName, componentRaw);
    }),
  );

  await transpileModule('index.js', indexRaw);
  await transpileModule('helpers.js', helpersRaw);

  await writeFile(DIST_DIR, 'index.d.ts', declarationFile);
}

void main();
