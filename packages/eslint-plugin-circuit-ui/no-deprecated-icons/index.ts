import { ESLintUtils, type TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleDocs } from '../utils/meta.js';

import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

type DeprecatedIcon = {
  name: string;
  deprecation: string;
  alternative: string[];
  alternativeProps?: Record<string, string>;
};

const ICONS_PACKAGE = '@sumup-oss/icons';

const iconsCache = new Map<string, DeprecatedIcon[]>();

function findPackageRoot(startDir: string): string {
  let dir = startDir;

  while (dir !== path.dirname(dir)) {
    if (existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }

  return startDir;
}

function getProjectRoot(cwd: string, filename?: string): string {
  return findPackageRoot(filename ? path.dirname(filename) : cwd);
}

function hasDeclaredDependency(projectRoot: string): boolean {
  try {
    const pkg = JSON.parse(
      readFileSync(path.join(projectRoot, 'package.json'), 'utf8'),
    ) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
      optionalDependencies?: Record<string, string>;
    };

    return [
      pkg.dependencies,
      pkg.devDependencies,
      pkg.peerDependencies,
      pkg.optionalDependencies,
    ].some((deps) => deps && ICONS_PACKAGE in deps);
  } catch {
    return false;
  }
}

function formatAlternativeText(alternative: string[]): string {
  if (alternative.length === 1) {
    return alternative[0];
  }
  if (alternative.length === 2) {
    return `${alternative[0]} or ${alternative[1]}`;
  }
  const commaSeparated = alternative.slice(0, -1).join(', ');
  return `${commaSeparated} or ${alternative[alternative.length - 1]}`;
}

function getDeprecatedIcons(projectRoot: string): DeprecatedIcon[] {
  if (iconsCache.has(projectRoot)) {
    return iconsCache.get(projectRoot)!;
  }

  if (!hasDeclaredDependency(projectRoot)) {
    iconsCache.set(projectRoot, []);
    return [];
  }

  try {
    const require = createRequire(path.join(projectRoot, 'package.json'));
    // eslint-disable-next-line import-x/no-dynamic-require
    const manifest = require(`${ICONS_PACKAGE}/manifest.json`) as {
      icons: DeprecatedIcon[];
    };
    const icons = manifest.icons
      .filter(({ deprecation }) => Boolean(deprecation))
      .map(({ name, ...rest }) => ({
        name: getIconReactName(name),
        ...rest,
      }));
    iconsCache.set(projectRoot, icons);
    return icons;
  } catch {
    iconsCache.set(projectRoot, []);
    return [];
  }
}

function getIconReactName(name: string): string {
  // Split on non-word characters
  const words = name.split(/[^a-z0-9]/i);
  // Uppercase the first letter and lowercase the rest
  const pascalCased = words.map(
    (part) => part.charAt(0).toUpperCase() + part.substring(1).toLowerCase(),
  );
  return pascalCased.join('');
}

const createRule = ESLintUtils.RuleCreator<RuleDocs>(
  (name) =>
    `https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/${name}`,
);

type TrackedImport = {
  key: string;
  node: TSESTree.Node;
  specifier: TSESTree.ImportSpecifier;
  alternative?: string[];
  deprecation?: string;
  localName: string;
  alternativeProps?: Record<string, string>;
};

type TrackedUsage = {
  key: string;
  node: TSESTree.Node;
  alternative?: string[];
  deprecation?: string;
  localName: string;
  alternativeProps?: Record<string, string>;
  kind: 'jsx' | 'expression';
};

function referencesImportBinding(
  node: TSESTree.Identifier | TSESTree.JSXIdentifier,
  specifier: TSESTree.ImportSpecifier,
  localName: string,
  sourceCode: Readonly<TSESLint.SourceCode>,
): boolean {
  if (node.name !== localName) {
    return false;
  }

  const variables = sourceCode.getDeclaredVariables(specifier);
  const binding = variables.find((variable) => variable.name === localName);

  return (
    binding?.references.some((reference) => reference.identifier === node) ??
    false
  );
}

export const noDeprecatedIcons = createRule({
  name: 'no-deprecated-icons',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [],
    hasSuggestions: true,
    docs: {
      description: 'Deprecated icons should be removed or replaced',
      recommended: 'warn',
    },
    messages: {
      deprecated: 'The {{name}} icon has been deprecated. {{deprecation}}',
      deprecatedWithAlternative:
        'The {{name}} icon has been deprecated. Use the {{alternative}} icon instead',
      deprecatedWithSuggestion:
        'Replace the deprecated {{name}} icon with the {{alternative}} icon',
    },
  },
  create(context) {
    const projectRoot = getProjectRoot(context.cwd, context.filename);
    const icons = getDeprecatedIcons(projectRoot);

    // skip if the current project does not depend on the icons package
    if (icons.length === 0) {
      return {};
    }

    const trackedImports = new Map<TSESTree.Node, TrackedImport[]>(); // Track imported icons and their sources.
    const trackedUsages: TrackedUsage[] = [];
    const { sourceCode } = context;

    return {
      ImportDeclaration(node) {
        //check source
        if (node.source.value === '@sumup-oss/icons') {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === TSESTree.AST_NODE_TYPES.ImportSpecifier) {
              const importedName =
                specifier.imported.type === TSESTree.AST_NODE_TYPES.Identifier
                  ? specifier.imported.name
                  : specifier.imported.value;
              const renamedIcon = icons.find(
                (icon) => icon.name === importedName,
              );
              if (!renamedIcon) {
                return;
              }

              // group imports by node
              if (!trackedImports.has(node)) {
                trackedImports.set(node, []);
              }
              trackedImports.get(node)!.push({
                node,
                specifier,
                key: renamedIcon.name,
                alternative: renamedIcon.alternative,
                localName: specifier.local.name ?? importedName,
                alternativeProps: renamedIcon.alternativeProps,
                deprecation: renamedIcon.deprecation,
              });
            }
          });
        }
      },
      JSXIdentifier(node) {
        // Check if the JSX element matches the tracked icon
        for (const value of Array.from(trackedImports.values()).flat()) {
          const { key, alternative, localName, alternativeProps, specifier } =
            value;
          if (referencesImportBinding(node, specifier, localName, sourceCode)) {
            trackedUsages.push({
              key,
              node,
              alternative,
              localName,
              alternativeProps,
              kind: 'jsx',
            });
          }
        }
      },
      Identifier(node) {
        if (
          node.parent?.type === TSESTree.AST_NODE_TYPES.ImportSpecifier ||
          (node.parent?.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
            node.parent.property === node &&
            !node.parent.computed) ||
          (node.parent?.type === TSESTree.AST_NODE_TYPES.Property &&
            node.parent.key === node &&
            !node.parent.method &&
            !node.parent.shorthand &&
            node.parent.value !== node)
        ) {
          return;
        }

        for (const value of Array.from(trackedImports.values()).flat()) {
          const { key, alternative, localName, alternativeProps, specifier } =
            value;

          if (referencesImportBinding(node, specifier, localName, sourceCode)) {
            trackedUsages.push({
              key,
              node,
              alternative,
              localName,
              alternativeProps,
              kind: 'expression',
            });
          }
        }
      },
      'Program:exit': () => {
        if (trackedImports.size === 0) {
          return;
        }
        for (const [_, imports] of trackedImports) {
          // Report each tracked import
          imports.forEach(
            ({ key, node, alternative, deprecation, specifier }) => {
              if (!alternative) {
                context.report({
                  node,
                  data: {
                    name: key,
                    deprecation,
                  },
                  messageId: 'deprecated',
                });
              } else {
                const hasMultipleAlternatives =
                  alternative?.length && alternative.length > 1;
                const alternativeName = formatAlternativeText(alternative);
                context.report({
                  node,
                  data: {
                    name: key,
                    alternative: alternativeName,
                  },
                  suggest: hasMultipleAlternatives
                    ? alternative.map((alt) => ({
                        messageId: 'deprecatedWithSuggestion',
                        data: {
                          name: key,
                          alternative: alt,
                        },
                        fix(fixer) {
                          return fixer.replaceText(specifier?.imported, alt);
                        },
                      }))
                    : undefined,
                  messageId: hasMultipleAlternatives
                    ? 'deprecatedWithSuggestion'
                    : 'deprecatedWithAlternative',
                  fix: hasMultipleAlternatives
                    ? undefined
                    : (fixer) =>
                        fixer.replaceText(specifier?.imported, alternativeName),
                });
              }
            },
          );
        }

        // replace icons and add potential props
        trackedUsages.forEach(
          ({ node, key, alternative, localName, alternativeProps, kind }) => {
            if (!alternative) {
              return;
            }
            const hasMultipleAlternatives =
              alternative?.length && alternative.length > 1;
            const alternativeName = formatAlternativeText(alternative);
            context.report({
              node,
              data: {
                name: key,
                alternative: alternativeName,
              },
              messageId: 'deprecatedWithAlternative',
              suggest: hasMultipleAlternatives
                ? alternative.map((alt) => ({
                    messageId: 'deprecatedWithSuggestion',
                    data: {
                      name: key,
                      alternative: alt,
                    },
                    fix(fixer) {
                      const fixes =
                        localName === key
                          ? [
                              fixer.replaceText(
                                node,
                                sourceCode.getText(node).replace(key, alt),
                              ),
                            ]
                          : [];

                      // insert alternative props for JSX usages only
                      if (
                        kind === 'jsx' &&
                        alternativeProps &&
                        node.parent?.type ===
                          TSESTree.AST_NODE_TYPES.JSXOpeningElement
                      ) {
                        fixes.push(
                          fixer.insertTextAfter(
                            node,
                            ` ${Object.entries(alternativeProps)
                              .map(([name, value]) => `${name}="${value}"`)
                              .join(' ')}`,
                          ),
                        );
                      }
                      return fixes;
                    },
                  }))
                : undefined,
              fix: hasMultipleAlternatives
                ? undefined
                : (fixer) => {
                    const fixes =
                      localName === key
                        ? [
                            fixer.replaceText(
                              node,
                              sourceCode
                                .getText(node)
                                .replace(key, alternativeName),
                            ),
                          ]
                        : [];

                    // insert alternative props for JSX usages only
                    if (
                      kind === 'jsx' &&
                      alternativeProps &&
                      node.parent?.type ===
                        TSESTree.AST_NODE_TYPES.JSXOpeningElement
                    ) {
                      fixes.push(
                        fixer.insertTextAfter(
                          node,
                          ` ${Object.entries(alternativeProps)
                            .map(([name, value]) => `${name}="${value}"`)
                            .join(' ')}`,
                        ),
                      );
                    }
                    return fixes;
                  },
            });
          },
        );
      },
    };
  },
});
