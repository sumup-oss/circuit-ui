import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

import {
  CATEGORIES,
  ILLUSTRATIONS_DIR,
  SIZE_MAP,
  SIZES,
  THEMES,
} from '../constants.js';
import manifest from '../manifest.json' with { type: 'json' };

describe('Illustrations', () => {
  const files = fs
    .readdirSync(ILLUSTRATIONS_DIR)
    .filter((fileName) => fileName.endsWith('.svg'))
    .map((fileName) => {
      const { name, size, theme } = parseFileName(fileName);
      const filePath = path.join(ILLUSTRATIONS_DIR, fileName);
      const file = fs.readFileSync(filePath).toString();
      const fileStats = fs.statSync(filePath);
      const fileSize = fileStats.size / 1024; // kilobytes
      return { name, size, theme, file, fileSize };
    });

  describe.each(files)('$name ($size) ($theme)', ({
    name,
    size,
    theme,
    file,
    fileSize,
  }) => {
    it('should be valid XML', () => {
      const isValidXML = XMLValidator.validate(file);

      expect(isValidXML).toBeTruthy();
    });

    it('should weigh less than 40kb', () => {
       
      expect(fileSize).toBeLessThan(40);
    });

    it('should have a valid manifest', () => {
      const illustrationManifest = getIllustrationManifest(name, size, theme);

      expect(illustrationManifest.name).toBeTypeOf('string');
      expect(SIZES).toContain(illustrationManifest.size);
      expect(THEMES).toContain(illustrationManifest.theme);
      expect(CATEGORIES).toContain(illustrationManifest.category);
    });

    it('should match the size in the file name', () => {
      const illustrationManifest = getIllustrationManifest(name, size, theme);

      const attributes = parseSVGAttributes(file);
      expect(illustrationManifest.size).toBe(size);

      expect(attributes.height).toBe(SIZE_MAP[size]);
    });

    it('should match the theme in the file name', () => {
      const illustrationManifest = getIllustrationManifest(name, size, theme);

      expect(illustrationManifest.theme).toBe(theme);
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
    const [, name, size, theme] = fileName.match(
      /^(.+)_([^_]+)_([^_]+)\.svg$/,
    )!;
    return { name, size, theme };
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

function getIllustrationManifest(name: string, size: string, theme: string) {
  return manifest.illustrations.find(
    (illustration) =>
      illustration.name === name &&
      illustration.size === size &&
      illustration.theme === theme,
  ) as {
    name: string;
    category: string;
    keywords: string[];
    size: string;
    theme: string;
  };
}
