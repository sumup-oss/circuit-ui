/**
 * Copyright 2024, SumUp Ltd.
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

import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { file } from 'astro/loaders';

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  stories: defineCollection({
    loader: file('../public/index.json', {
      parser: (text) => {
        const json = JSON.parse(text);
        if (json.v !== 5) {
          throw new Error('Unsupported Storybook manifest version');
        }
        return Object.values(json.entries);
      },
    }),
    schema: z.object({
      id: z.string(),
      title: z.string(),
      name: z.string(),
      type: z.enum(['story', 'docs']),
      tags: z.array(z.string()),
      importPath: z.string(),
      componentPath: z.string().optional(),
    }),
  }),
};
