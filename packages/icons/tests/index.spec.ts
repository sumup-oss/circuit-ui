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
      return { name, size, file, fileSize };
    });

  describe.each(files)('$name ($size)', ({ name, size, file, fileSize }) => {
    const iconManifest = getIconManifest(name, size);
    const svg = parseSVG(file);

    it('should have a valid manifest', () => {
      expect(iconManifest.name).toBeTypeOf('string');
      expect(SIZES).toContain(iconManifest.size);
      expect(CATEGORIES).toContain(iconManifest.category);
    });

    it('should be valid XML', () => {
      const isValidXML = XMLValidator.validate(file);
      expect(isValidXML).toBeTruthy();
    });

    it("should have valid  'width', 'height' and 'viewBox' attributes", () => {
      expect(svg.attributes.width).toMatch(/^\d+$/);
      expect(svg.attributes.height).toMatch(/^\d+$/);
      expect(svg.attributes.viewBox).toBe(
        `0 0 ${svg.attributes.width} ${svg.attributes.height}`,
      );
    });

    const isMonochromatic = ![
      'Card scheme',
      'Country flag',
      'Flag',
      'Payment method',
    ].includes(iconManifest.category);

    if (isMonochromatic) {
      // Monochromatic icons that are exported as React components

      it('should weigh less than 12kb', () => {
        expect(fileSize).toBeLessThan(12);
      });

      it('should match the size in the file name', () => {
        expect(iconManifest.size).toBe(size);
        expect(svg.attributes.height).toBe(size);
      });

      it('should use currentColor for fill and stroke', () => {
        const colors = getColorAttributes(svg);

        colors.forEach((color) => {
          expect(color).toBe('currentColor');
        });
      });
    } else {
      // Multi-colored icons that are loaded via URL

      it('should weigh less than 120kb', () => {
        expect(fileSize).toBeLessThan(120);
      });

      if (iconManifest.category === 'Flag') {
        it('should be 640x480 in size', () => {
          expect(iconManifest.size).toBe('480');
          expect(svg.attributes.height).toBe('480');
          expect(svg.attributes.width).toBe('640');
        });
      } else if (iconManifest.category === 'Card scheme') {
        it('should match the size in the file name in width', () => {
          expect(svg.attributes.width).toBe(size);
        });
      } else {
        it('should match the size in the file name in height', () => {
          expect(svg.attributes.height).toBe(size);
        });
      }
    }
  });
});

function parseFileName(fileName: string) {
  try {
    const [, name, size] = fileName.match(/(.+?)(?:_(\d+))?\.svg$/)!;
    // assign size of 480 for flag icons when size not specified in file name
    if (!size && name.match(/^flag_[a-z]{2}(?:-[a-z]{2})?$/)) {
      return { name, size: '480' };
    }
    return { name, size };
  } catch {
    throw new Error(`Failed to parse the '${fileName}' file name.`);
  }
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  attributesGroupName: 'attributes',
});

type ColorAttributes = {
  fill?: string;
  stroke?: string;
};

type Path = {
  attributes: ColorAttributes;
};

type SVG = {
  attributes: {
    width: string;
    height: string;
    viewBox: `${number} ${number} ${number} ${number}`;
  } & ColorAttributes;
  path: Path | Path[];
};

function parseSVG(file: string) {
  const ast = parser.parse(file) as { svg: SVG };
  return ast.svg;
}

function getColorAttributes(svg: SVG) {
  const paths = Array.isArray(svg.path) ? svg.path : [svg.path];
  return paths
    .flatMap(({ attributes }) => [attributes.fill, attributes.stroke])
    .filter((color) => Boolean(color));
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
  };
}
