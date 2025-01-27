# Update renamed components (`no-renamed-components`)

Occasionally, Circuit UI's components are renamed for consistency. This rule flags uses of outdated component imports and usages and can automatically update them with the new names.

## Rule Details

Components are renamed as part of a major release. When upgrading Circuit UI, run this rule once and update the components' usages and imports using the suggestions from this rule.

Examples of **incorrect** code for this rule:

```tsx
import {Popover} from '@sumup-oss/circuit-ui';

function Component() {
    return (
        <Popover isOpen={true}/>
    );
}
```

Examples of **correct** code for this rule:

```tsx
import {ActionMenu} from '@sumup-oss/circuit-ui/components/ActionMenu';

function Component() {
    return (
        <ActionMenu isOpen={true}/>

    );
}
```

### Options

n/a

## When Not To Use It

This rule is meant to run only once upon upgrading to a new major version of Circuit UI.
If you happen to run this rule multiple times, please check your code for unexpected changes.

## Further Reading

- [Migration guide](https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md)
- [Circuit UI release notes](https://github.com/sumup-oss/circuit-ui/blob/main/packages/circuit-ui/CHANGELOG.md)
