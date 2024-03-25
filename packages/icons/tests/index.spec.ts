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

import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

import { CATEGORIES, ICON_DIR, SIZES } from '../constants.js';
import { icons } from '../manifest.json' assert { type: 'json' };

describe('Icons', () => {
  const files = fs
    .readdirSync(ICON_DIR)
    .filter((fileName) => fileName.endsWith('.svg'))
    .map((fileName) => {
      const { name, size } = parseFileName(fileName);
      const file = fs.readFileSync(path.join(ICON_DIR, fileName)).toString();
      return { name, size, file } as {
        name?: string;
        size?: string;
        file: string;
      };
    });

  describe.each(files)('$name ($size)', ({ name, size, file }) => {
    it('should be valid XML', () => {
      const isValidXML = XMLValidator.validate(file);

      expect(isValidXML).toBeTruthy();
    });

    it('should have a valid manifest', () => {
      const manifest = getIconManifest(name, size);

      expect(manifest.name).toBeTypeOf('string');
      expect(SIZES).toContain(manifest.size);
      expect(CATEGORIES).toContain(manifest.category);
    });

    it('should match the size in the file name', () => {
      const manifest = getIconManifest(name, size);

      expect(manifest.size).toBe(size);

      const attributes = parseSVGAttributes(file);

      if (manifest.category === 'Card scheme') {
        expect(attributes.width).toBe(size);
      } else {
        expect(attributes.height).toBe(size);
      }
    });

    it("should have valid  'width', 'height' and 'viewBox' attributes", () => {
      const attributes = parseSVGAttributes(file);

      expect(attributes.width).toMatch(/^\d+$/);
      expect(attributes.height).toMatch(/^\d+$/);
      expect(attributes.viewBox).toBe(
        `0 0 ${attributes.width} ${attributes.height}`,
      );
    });
  });
});

function parseFileName(fileName: string) {
  try {
    const [, name, size] = fileName.match(/(.+)_(\d+)\.svg$/);
    return { name, size };
  } catch (error) {
    throw new Error(`Failed to parse the '${fileName}' file name.`);
  }
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  attributesGroupName: 'attributes',
});

function parseSVGAttributes(file: string) {
  const ast = parser.parse(file) as {
    svg: {
      attributes: {
        width: string;
        height: string;
        viewBox: `${number} ${number} ${number} ${number}`;
      };
    };
  };

  return ast.svg.attributes;
}

function getIconManifest(name?: string, size?: string) {
  if (!name || !size) {
    return null;
  }

  return icons.find((icon) => icon.name === name && icon.size === size);
}
