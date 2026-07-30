import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

import { CATEGORIES, ILLUSTRATIONS_DIR, THEMES } from '../constants.js';
import manifest from '../manifest.json' with { type: 'json' };

describe('Illustrations', () => {
  const files = fs
    .readdirSync(ILLUSTRATIONS_DIR)
    .filter((fileName) => fileName.endsWith('.svg'))
    .map((fileName) => {
      const { name, theme } = parseFileName(fileName);
      const filePath = path.join(ILLUSTRATIONS_DIR, fileName);
      const file = fs.readFileSync(filePath).toString();
      const fileStats = fs.statSync(filePath);
      const fileSize = fileStats.size / 1024; // kilobytes
      return { name, theme, file, fileSize };
    });

  describe.each(files)('$name ($theme)', ({ name, theme, file, fileSize }) => {
    it('should be valid XML', () => {
      const isValidXML = XMLValidator.validate(file);

      expect(isValidXML).toBeTruthy();
    });

    it('should weigh less than 40kb', () => {
      expect(fileSize).toBeLessThan(60);
    });

    it('should have a valid manifest', () => {
      const illustrationManifest = getIllustrationManifest(name, theme);

      expect(illustrationManifest.name).toBeTypeOf('string');
      expect(THEMES).toContain(illustrationManifest.theme);
      expect(CATEGORIES).toContain(illustrationManifest.category);
    });

    it('should be in the default size', () => {
      const attributes = parseSVGAttributes(file);

      expect(attributes.height).toBe('240');
      expect(attributes.width).toBe('240');
    });

    it('should match the theme in the file name', () => {
      const illustrationManifest = getIllustrationManifest(name, theme);

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
    const [, name, theme] = fileName.match(/^(.+)_([^_]+)\.svg$/)!;
    return { name, theme };
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

function getIllustrationManifest(name: string, theme: string) {
  return manifest.illustrations.find(
    (illustration) =>
      illustration.name === name && illustration.theme === theme,
  ) as {
    name: string;
    category: string;
    keywords: string[];
    theme: string;
  };
}
