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

import { JSCodeshift, Collection } from 'jscodeshift';

type Import = {
  type: 'default' | 'named';
  local: string;
  name?: string;
};

export function findImportsByPath(
  j: JSCodeshift,
  root: Collection,
  importPath: string
): Import[] {
  const imports: Import[] = [];

  root
    .find(j.ImportDeclaration, {
      source: {
        type: 'Literal',
        value: importPath
      }
    })
    .forEach(nodePath => {
      nodePath.value.specifiers.forEach(specifier => {
        // These TypeScript errors are incorrect,
        // but I (Connor) am too lazy to submit a fix ¯\_(ツ)_/¯
        /* eslint-disable @typescript-eslint/ban-ts-ignore */
        if (j.ImportDefaultSpecifier.check(specifier)) {
          imports.push({
            type: 'default',
            // @ts-ignore
            local: specifier.local.name
          });
        } else {
          imports.push({
            type: 'named',
            // @ts-ignore
            name: specifier.imported.name,
            // @ts-ignore
            local: specifier.local.name
          });
        }
        /* eslint-enable @typescript-eslint/ban-ts-ignore */
      });
    });

  return imports;
}

export function findStyledComponentNames(
  j: JSCodeshift,
  root: Collection,
  componentName: string
): string[] {
  const styledComponents: string[] = [];

  root
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: 'styled'
      },
      arguments: [
        {
          type: 'Identifier',
          name: componentName
        }
      ]
    })
    .forEach(path => {
      const styledComponent = j(path)
        .closest(j.VariableDeclaration)
        .find(j.Identifier)
        .get(0).node.name;
      styledComponents.push(styledComponent);
    });

  return styledComponents;
}

export function findLocalNames(
  j: JSCodeshift,
  root: Collection,
  componentName: string
): string[] | null {
  const imports = findImportsByPath(j, root, '@sumup/circuit-ui');

  const buttonImport = imports.find(i => i.name === componentName);

  if (!buttonImport) {
    return null;
  }

  const localName = buttonImport.local;

  const styledButtons = findStyledComponentNames(j, root, localName);

  return [localName, ...styledButtons];
}

