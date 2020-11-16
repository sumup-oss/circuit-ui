/**
 * Copyright 2019, SumUp Ltd.
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

import prettier from 'prettier';

import { components } from './config';
import { ComponentDoc, ComponentWithDocGen } from './types';

async function extractDocgenInfo() {
  try {
    const docgen = components.reduce((acc, { name, component }) => {
      // The `__docgenInfo` property is added by the react-docgen-typescript
      // babel plugin which TypeScript doesn't know about.
      const componentWithDocGen = (component as unknown) as ComponentWithDocGen;
      // eslint-disable-next-line no-underscore-dangle
      acc[name] = componentWithDocGen.__docgenInfo;
      return acc;
    }, {} as { [name: string]: ComponentDoc });

    // Saving as a TypeScript file (as opposed to JSON) is the simplest way
    // to have the file copied over to the dist folder.
    const filePath = path.join(__dirname, 'docgen.ts');

    // Formatting with prettier isn't strictly necessary,
    // but it makes debugging the output much easier.
    const prettierConfig = await prettier.resolveConfig(filePath);
    const content = prettier.format(
      `/**
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

      import { ComponentDoc } from './types';
      
      export const docgen = (${JSON.stringify(
        docgen,
      )} as unknown) as { [name: string]: ComponentDoc };`,
      { ...prettierConfig, parser: 'typescript' },
    );

    await fs.promises.writeFile(filePath, content);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

extractDocgenInfo();
