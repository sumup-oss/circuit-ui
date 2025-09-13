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
import manifest from '../manifest.json' with { type: 'json' };

describe('Icons', () => {
  const files = fs
    .readdirSync(ICON_DIR)
    .filter((fileName) => fileName.endsWith('.svg'))
    .map((fileName) => {
      const { name, size } = parseFileName(fileName);
      const filePath = path.join(ICON_DIR, fileName);
      const file = fs.readFileSync(filePath).toString();
      const fileStats = fs.statSync(filePath);
      const fileSize = fileStats.size / 1024; // kilobytes
      return { name, size, file, fileSize } as {
        name: string;
        size: string;
        file: string;
        fileSize: number;
      };
    });

  describe.each(files)('$name ($size)', ({ name, size, file, fileSize }) => {
    it('should be valid XML', () => {
      const isValidXML = XMLValidator.validate(file);

      expect(isValidXML).toBeTruthy();
    });

    (size === '480' ? it.skip : it)('should weigh less than 12kb', () => {
      expect(fileSize).toBeLessThan(12);
    });

    it('should have a valid manifest', () => {
      const iconManifest = getIconManifest(name, size);

      expect(iconManifest.name).toBeTypeOf('string');
      expect(SIZES).toContain(iconManifest.size);
      expect(CATEGORIES).toContain(iconManifest.category);
    });

    it('should match the size in the file name', () => {
      const iconManifest = getIconManifest(name, size);

      const attributes = parseSVGAttributes(file);
      if (iconManifest.category === 'Flag') {
        expect(iconManifest.size).toBe('480');
        expect(attributes.height).toBe(iconManifest.size);
        expect(attributes.width).toBe('640');
      } else {
        expect(iconManifest.size).toBe(size);
        if (iconManifest.category === 'Card scheme') {
          expect(attributes.width).toBe(size);
        } else {
          expect(attributes.height).toBe(size);
        }
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
    const [, name, size] = fileName.match(/(.+?)(?:_(\d+))?\.svg$/)!;
    // assign size of 480 for flag icons when size not specified in file name
    if (!size && name.match(/^flag_[a-z]{2}$/)) {
      return { name, size: '480' };
    }
    return { name, size };
  } catch (_error) {
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

function getIconManifest(name: string, size: string) {
  return manifest.icons.find(
    (icon) => icon.name === name && icon.size === size,
  ) as {
    name: string;
    category: string;
    keywords: string[];
    size: string;
    deprecation: string;
    skipComponentFile?: undefined;
  };
}
