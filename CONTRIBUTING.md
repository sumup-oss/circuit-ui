# Contributing

## Code of Conduct (CoC)

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our [maintainers](README.md#maintainers). We will enforce the CoC.

![Overview diagram of the contribution model](https://github.com/sumup-oss/circuit-ui/tree/main/assets/contribution-model.jpg?raw=true)

## Submitting an issue

In most cases, submitting an issue is the first step to contributing to Circuit UI. Check the existing issues and verify that your issue is not already submitted. Then use one of the templates to [ask a question](https://github.com/sumup-oss/circuit-ui/issues/new?template=question.md), [report a bug](https://github.com/sumup-oss/circuit-ui/issues/new?template=report-a-bug.md), [amend an existing component](https://github.com/sumup-oss/circuit-ui/issues/new?template=amend-existing-component.md), or [propose a new one](https://github.com/sumup-oss/circuit-ui/issues/new?template=propose-new-component.md).

SumUp employees can also reach out in our internal Slack channel #design-system-web, although we strive to keep all communication in the open.

## Submitting a pull request

We appreciate pull requests (PRs) for smaller changes and bug fixes. For larger changes, we encourage you to [submit an issue](https://github.com/sumup-oss/circuit-ui/issues/new) to collect feedback first. The normal workflow looks as follows:

1. Let others know that you're working on an issue by leaving a comment or assigning it to yourself.
2. Clone the repository (you might need to fork it first) and branch out from the latest `main` branch.
3. Code, add, commit, and push your changes in your feature branch.
4. Submit a pull request and make sure that the CI checks pass. Don't forget to add a [changeset](#changesets) and accept the [contributor license agreement](#contributor-license-agreement-cla).
5. Collaborate with the codeowners/reviewers to merge your changes to `main`.

### Contributor License Agreement (CLA)

To start contributing to SumUp Open Source projects, please accept our [Contributor License Agreement](https://opensource.sumup.com/cla). Should you have any questions or concerns, please get in touch with [opensource@sumup.com](mailto:opensource@sumup.com).

## Quick Start

### Prerequisites

- [Node.js v14](https://nodejs.org/)
- [Yarn 1](https://classic.yarnpkg.com/en/docs/install)

### Installation

- Run `yarn` in the repository's root directory to install everything you need for development.
- Run `yarn bootstrap` in the root directory to build and set up the packages.

### Available Scripts

All packages related to the design system are organized in this monorepo. Thanks to [`yarn workspaces`](https://classic.yarnpkg.com/en/docs/workspaces) packages that depend on each other always use the latest version. [`lerna`](https://lerna.js.org/) makes it possible to run scripts across all packages at the same time. The list of scripts below can be run in each package directory individually, or in the repository's root directory for all packages at once.

- `yarn start` — will build packages on every change
- `yarn build` — will build packages once
- `yarn test` — will run unit tests on every change
- `yarn lint` — will lint the code once
- `yarn docs` — will run the [Storybook](https://circuit.sumup.com) in development mode

Refer to the `package.json` files in each package for other helpful scripts.

### Changesets

Circuit UI uses [changesets](https://github.com/atlassian/changesets) for versioning. As a contributor you can add a changeset for your changes by running `yarn changeset`. Read more in our [release process docs](https://circuit.sumup.com/?path=/docs/introduction-contributing-release-process--page).

### Troubleshooting

**Changes in one package aren't recognized in another package**

You need to rebuild a package after making changes to it. The easiest way to do so is to run `yarn start` in the repository's root directory which will continuously rebuild all packages on change.

If the changes aren't picked up even after a rebuild, try restarting or reloading your editor.

**An error is thrown when creating a changeset**

`Error: Failed to find where HEAD diverged from main. Does main exist?`

This error occurs when the `main` branch doesn't exist locally. Check out the `main` branch (`git checkout -b main`), pull the latest changes (`git pull`), then check out your feature branch (`git checkout -`) and try again.
