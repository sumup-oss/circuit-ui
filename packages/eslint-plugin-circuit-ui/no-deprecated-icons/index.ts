import { ESLintUtils, type TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { RuleDocs } from '../utils/meta.js';
import iconsManifest from '@sumup-oss/icons/manifest.json' with {
  type: 'json',
};

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
  alternative: string;
  localName: string;
  alternativeProps?: Record<string, string>;
};

type TrackedUsage = {
  key: string;
  node: TSESTree.Node;
  alternative: string;
  localName: string;
  alternativeProps?: Record<string, string>;
  kind: 'jsx' | 'expression';
};

function referencesImportBinding(
  node: TSESTree.Identifier,
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

const icons = iconsManifest.icons
  .filter(
    ({ deprecation, alternative }) =>
      Boolean(deprecation) && Boolean(alternative),
  )
  .map(({ name, ...rest }) => ({
    name: getIconReactName(name),
    ...rest,
  })) as {
  name: string;
  alternative: string;
  alternativeProps?: Record<string, string>;
}[];

export const noDeprecatedIcons = createRule({
  name: 'no-deprecated-icons',
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [],
    docs: {
      description: 'Deprecated icons should be removed or replaced',
      recommended: 'warn',
    },
    messages: {
      deprecated:
        'The {{name}} icon has been deprecated. Use the {{alternative}} icon instead',
    },
  },
  create(context) {
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
              });
            }
          });
        }
      },
      JSXIdentifier(node) {
        // Check if the JSX element matches the tracked icon
        for (const value of Array.from(trackedImports.values()).flat()) {
          const { key, alternative, localName, alternativeProps } = value;
          if (node.name === key || node.name === localName) {
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
          imports.forEach(({ key, node, alternative, specifier }) => {
            context.report({
              node,
              data: {
                name: key,
                alternative,
              },
              messageId: 'deprecated',
              fix(fixer) {
                return fixer.replaceText(specifier?.imported, alternative);
              },
            });
          });
        }

        // replace icons and add potential props
        trackedUsages.forEach(
          ({ node, key, alternative, localName, alternativeProps, kind }) => {
            context.report({
              node,
              data: {
                name: key,
                alternative,
              },
              messageId: 'deprecated',
              fix(fixer) {
                const fixes =
                  localName === key
                    ? [
                        fixer.replaceText(
                          node,
                          sourceCode.getText(node).replace(key, alternative),
                        ),
                      ]
                    : [];

                // insert alternative props for JSX usages only
                if (kind === 'jsx' && alternativeProps) {
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
