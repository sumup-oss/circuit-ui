<div align="center">

# @sumup/cra-template

A [create-react-app template](https://create-react-app.dev/docs/custom-templates) for JavaScript React apps with SumUp's frontend stack.

</div>

## Table of Contents <!-- omit in toc -->

- [💻 Prerequisites](#-prerequisites)
- [✨ Setting up a new JavaScript SumUp React project](#-setting-up-a-new-javascript-sumup-react-project)
- [🛠 Development workflow](#-development-workflow)
  - [Firing up the tools](#firing-up-the-tools)
  - [Adding a new component](#adding-a-new-component)
  - [Linting your code](#linting-your-code)
  - [Writing tests](#writing-tests)
- [📖 Useful resources](#-useful-resources)
- [⚠️ Troubleshooting](#️-troubleshooting)
  - [Debug mode](#debug-mode)
  - [Broken build due to ESLint version](#broken-build-due-to-eslint-version)
- [Code of conduct (CoC)](#code-of-conduct-coc)
  - [Maintainers](#maintainers)
- [About SumUp](#about-sumup)

## 💻 Prerequisites

- You should have **[Node.js](https://nodejs.org/)** installed at a version equal or above **`v14.0.0`**. If you cannot do that, see the [Troubleshooting](#troubleshooting) section for ways around this requirement.
- At the moment this project reqires **[`yarn`](https://classic.yarnpkg.com/)** (classic) to be installed on your system. Yarn is a package manager for JavaScript. You can read how to install the Yarn CLI in [their documentation](https://classic.yarnpkg.com/en/docs/install).

## ✨ Setting up a new JavaScript SumUp React project

1. Open your terminal.
2. Navigate to the directory you would like to place your project in.
3. Run `yarn create react-app my-app --template @sumup`, where `my-app` is the name of your project.

This will create the folder `my-app` and initialize a new project inside. The project will be based on [`create-react-app`](https://github.com/facebook/create-react-app) and will use SumUp's [`Circuit UI`](https://circuit.sumup.com/) component library and [Foundry](https://github.com/sumup-oss/foundry) toolkit.

> **Optional**: CRA will use React version `^17.0.0` with the new JSX runtime. You can remove any synthetic default React import statements from the codebase (i.e. `import React from 'react'`). If you do, make sure you disable the corresponding ESLint rules in `.eslintrc.js`, by providing overrides to Foundry in [a second argument](https://github.com/sumup-oss/foundry/blob/main/src/configs/eslint/config.ts#L341). See the [React team's blog post](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint) covering the new runtime for details about the ESLint rules.

## 🛠 Development workflow

### Firing up the tools

Run `yarn start` to start the development build. The app should automatically open in your browser. Changes you make to `src/App.js` should be visible on the page almost immediately.

To create a production build of your app, run `yarn build`. `react-scripts` will create an optimized production build of your application inside the `build` folder of your project. It will also provide you with additional details on what to do with them.

### Adding a new component

We try to make adding new components as easy as possible. Run `yarn create:component YourComponentName` to launch the plop CLI exposed and configured by Foundry.

<div align="center">

![A GIF of how to use the create:component script.](https://github.com/sumup-oss/circuit-ui/tree/main/assets/create-component.gif?raw=true 'Using create:component')

</div>

### Linting your code

A linter is a tool that checks your code for

- problems that will cause it to break when run, or
- code style that violates a given set of rules the project is following.

Linting serves as a first line of defence against evil bugs on production.​ Your project will be set up to use a version of the popular [ESLint](https://eslint.org) linter for JavaScript provided by Foundry. You can lint your code and apply automatic fixes by running `yarn lint`. Usually, your editor is able to integrate with ESLint.

### Writing tests

Writing tests is great. Tests are the second line of defence against bugs ending up on production. By covering your application in unit and integration tests, you can be sure you did not break anything when, for example, shipping refactored code to production. Your new React project comes with testing built in. By running `yarn test` you will start the test runner, [Jest](https://jestjs.io/en/). As you add tests or make changes to your code, Jest will re-run tests and show you the results. The app will come with `react-testing-library` set up for writing UI tests for your React components. Check out `src/App.spec.js` for examples.

For component tests we export a custom `render` method for `testing-library/react` from `src/test-utils.js`. The custom render method ensures components are wrapped in a `ThemeProvider` with the Circuit UI theme. Components created with the `create:component` script will have a `*.spec.js` file with the local `render` method imported. The import should look something like this. The [Testing Library docs for React](https://testing-library.com/docs/react-testing-library/setup#custom-render) contain more details on how to add more React providers for your tests.

```js
import { render } from '../../test-utils';
```

## 📖 Useful resources

- The [docs](https://create-react-app.dev/docs/documentation-intro) for `create-react-app` contain a lot of solutions for common problems when writing a React application.
- Foundry [docs](https://github.com/sumup-oss/foundry#table-of-contents).
- Circuit UI [docs](https://circuit.sumup.com/#/) and [storybook](https://circuit.sumup.com/storybook/).
- The [README](https://testing-library.com/docs/react-testing-library/intro/) for`@testing-library/react`.

## ⚠️ Troubleshooting

### Debug mode

`create-react-app` has a debug mode. To output verbose logging to your console, add the `--debug` flag when creating your app. For example:

```
yarn create react-app my-debugging-app --debug --template @sumup
```

### Broken build due to ESLint version

Because we depend on `create-react-app@latest` there is a chance that the shipped ESLint version in `react-scripts` is different from the one shipped with Foundry. Both projects are toolkits. When the build for your application fails, try to create your app with a version of CRA that ships the same version of ESLint as the Foundry's canary channel.
