# How to contribute

So you want to contribute to Circuit UI? That's awesome. Here are a few
things that can help you make it a reality.

## Code of conduct

We expect all participants to read and adhere to our [code of conduct](/CODE_OF_CONDUCT.md).

## Semantic versioning

Circuit UI follows semantic versioning. In short, this means we use patch versions
for bugfixes, minor versions for new features, and major versions for
breaking changes. Our release process is automated using [semantic-release](https://github.com/semantic-release/semantic-release)
which adheres to the [Angular commit message conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

As a result, our changelog is pretty tidy. You can [read our changelog on GitHub](https://github.com/sumup/circuit-ui/releases).

## Branch organization

We have a couple of special branches that are automatically released whenever
you merge code into them.

- `master` - A merge to master will release a new version of the library.
- `canary` - The step before master. This is where we prepare a group of
  changes for the next release.
- `beta` - Beta is a branch you can use to test your changes integrated with
  other branches before it is ready to be PR'd to canary.

## Releases

TODO

## Bugs

We use the [GitHub issues](https://github.com/sumup/circuit-ui/issues) to track
all our bugs and feature requests.

When [submitting a new issue](https://github.com/sumup/circuit-ui/issues/new),
please check that it hasn't already been raised by someone else. We've provided
a template for new issues which will help you structure your issue to ensure it
can be picked up and actioned easily.

Please provide as much information possible detailing what you're currently
experiencing and what you'd expect to experience.

## Proposing a change

![Component pattern addition](/component-addition-flowchart.png)

### Creating or changing a component

Our process for introducing changes to Circuit UI largely follow the Vanilla
design system process published by Canonical.

#### Creating new components

- You should favor using existing components rather than creating new ones.
- You should favor adapting existing components rather than creating new ones.
- You must contribute new components through the design system (rather than
  coding them directly in the application) if the component is likely to be
  used in more than one project.
- You should create an issue in the Circuit UI GitHub repo with the proposed
  components using the appropriate issue type, _before_ implementing the
  component.
- You should _not_ contribute components that are highly specific to the
  use-case of a single application. If possibly, generalize it!

#### Adapting an existing component

- You may open a pull request with your proposed changes without opening an
  issue in Circuit UI, so long as those changes could be classified as
  minor.

#### Workflow

- Either a designer or a developer must open the issue in Circuit UI to propose
  a new component or changes to an existing component.
- New components must be reviewed by two designers and two developers from
  different teams.
- We should strive to decide whether we adopt a new component, if it's needed
  for a feature, within one week of opening the issue.
- We should strive to decide whether we accept changes to an existing
  component within one week of opening the issue.

### Technical changes or improvements

- You should open an issue in Circuit UI with your proposed change using the
  "Suggest tech improvement" issue type.

## Your first pull request

## Development workflow

We develop our components in Storybook. To start running Storybook on your
local machine, run:

```
yarn storybook
```

To run unit tests in watch mode, run:

```
yarn test:unit:watch
```

As for linting and formatting, you can configure your editor to automatically
lint and format your code on save. For this purpose, we're using Prettier
and ESLint.

If you need to do it manually, you can run:

```
yarn unit:lint-js
yarn fix
```

### Deprecation process

The purpose of deprecating a component or a feature is to warn people that
it should not be used anymore, and that support will be removed in the future.
You can either offer a preferred solution, or it may be that the feature is
no longer needed.

1. **Communicate intent to deprecate.** Please open an issue in the repo with
   issue type "Deprecation", and share this issue with webchapter@sumup.com and
   productdesign@sumup.com. Go through the product repos and find instances of
   the component in use, and proactively communicate with the teams responsible
   for those features. Give your reasoning about _why_ you believe the feature
   should be deprecated, and discuss the impact on the teams that rely on
   that feature today. 
2. **Decide on a timeline.** Based on the feedback you receive, come up with
   a timeline, including the people who are affected by the change. Generally
   speaking, 3-6 months is ample time. Document the planned date of removal
   in the original deprecation issue.
3. **Add a notice to the docs and to the code.** Introduce the deprecation
   warning in a minor release. Change the status badge on the component page
   to "Deprecated" and add a `console.warn(`ComponentName is deprecated and will be removed in version X.0.0`)`
   to the `render()` function of the component, or generally on the first
   run of an instance of a component or feature.
4. **Wait for the deadline.** You may still need to fix critical bugs during the
   deprecation period, but we should try and offer alternatives where possible.
5. **Communicate it one more time!** Give one last warning to people involved
   that the deadline is imminent.
6. **Delete it.** Create a PR deleting the deprecated functionality, which should
   signal a major version bump.

In some cases, you can also introduce a completely new version of the component
alongside the old, especially in cases where teams need longer to migrate
to the new component. For example, changing the SideNav component.
