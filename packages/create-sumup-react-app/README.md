<div align="center">
<h1>⚛️ @sumup/cra-template ⚛️</h1>

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

This will create the folder `my-app` and initialize a new project inside. The project will be based on [`create-react-app`](https://github.com/facebook/create-react-app) and will use SumUp's [`Circuit UI`](https://circuit.sumup.com/) component library and [Foundry](https://github.com/sumup/foundry) toolkit.

> **Optional**: CRA will use React version `^17.0.0` with the new JSX runtime. You can remove any synthetic default React import statements from the codebase (i.e. `import React from 'react'`). If you do, make sure you disable the corresponding ESLint rules in `.eslintrc.js`, by providing overrides to Foundry in [a second argument](https://github.com/sumup-oss/foundry/blob/main/src/configs/eslint/config.ts#L341). See the [React team's blog post](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint) covering the new runtime for details about the ESLint rules.

## 🛠 Development workflow

### Firing up the tools

Run `yarn start` to start the development build. The app should automatically open in your browser. Changes you make to `src/App.js` should be visible on the page almost immediately.

To create a production build of your app, run `yarn build`. `react-scripts` will create an optimized production build of your application inside the `build` folder of your project. It will also provide you with additional details on what to do with them.

### Adding a new component

We try to make adding new components as easy as possible. Run `yarn create:component YourComponentName` to launch the plop CLI exposed and configured by Foundry.

<div align="center">

![A GIF of how to use the create:component script.](./github/create-component.gif 'Using create:component')

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
- Foundry [docs](https://github.com/sumup/foundry#table-of-contents).
- Circuit UI [docs](https://circuit.sumup.com/#/) and [storybook](https://circuit.sumup.com/storybook/).
- The [README](https://testing-library.com/docs/react-testing-library/intro/) for`react-testing-library`.

## ⚠️ Troubleshooting

### Debug mode

`create-react-app` has a debug mode. To output verbose logging to your console, add the `--debug` flag when creating your app. For example:

```
yarn create react-app my-debugging-app --debug --template @sumup
```

### Broken build due to ESLint version

Because we depend on `create-react-app@latest` there is a chance that the shipped ESLint version in `react-scripts` is different from the one shipped with Foundry. Both projects are toolkits. When the build for your application fails, try to create your app with a version of CRA that ships the same version of ESLint as the Foundry's canary channel.

## Code of conduct (CoC)

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [Connor Bär](mailto:connor.baer@sumup.com)
- [Felix Jung](mailto:felix.jung@sumup.com)

## About SumUp

<svg width="125" height="37" viewBox="0 0 214 63" xmlns="http://www.w3.org/2000/svg">
    <title>
        SumUp
    </title>
    <g fill-rule="evenodd">
        <path d="M144.5 17.6h-.1c-2.4 0-4.5 1-6 2.5-1.5-1.5-3.7-2.5-6-2.5h-.1c-4.6 0-8.4 3.7-8.4 8.4v16.3c.1 1.3 1.1 2.3 2.4 2.3 1.3 0 2.3-1 2.4-2.3V26c0-2 1.6-3.6 3.6-3.6h.1c2 0 3.5 1.5 3.6 3.5V42.3c.121 1.182.953 2.3 2.3 2.3 1.3 0 2.3-1 2.4-2.3V26v-.2c.1-1.9 1.7-3.5 3.6-3.5h.1c2 0 3.6 1.6 3.6 3.6v16.4c.1 1.3 1.1 2.3 2.4 2.3 1.3 0 2.3-1 2.4-2.3V26c.1-4.6-3.7-8.4-8.3-8.4zM116.1 17.6c-1.3 0-2.3 1-2.4 2.3v16.3c0 2-1.6 3.6-3.7 3.6h-.1c-2 0-3.7-1.6-3.7-3.6V19.8c-.1-1.3-1.1-2.3-2.4-2.3-1.3 0-2.3 1-2.4 2.3v16.3c0 4.6 3.8 8.4 8.5 8.4h.1c4.7 0 8.5-3.8 8.5-8.4V19.9c0-1.3-1.1-2.3-2.4-2.3zM172.9 17.6c-1.3 0-2.3 1-2.4 2.3v16.3c0 2-1.6 3.6-3.7 3.6h-.1c-2 0-3.7-1.6-3.7-3.6V19.8c-.1-1.3-1.1-2.3-2.4-2.3-1.3 0-2.3 1-2.4 2.3v16.3c0 4.6 3.8 8.4 8.5 8.4h.1c4.7 0 8.5-3.8 8.5-8.4V19.9c-.1-1.3-1.1-2.3-2.4-2.3z"/>
        <path d="M188.8 17.6h-.1c-4.8 0-8.6 3.8-8.6 8.5v29.6c0 1.3 1.1 2.4 2.4 2.4 1.3 0 2.4-1.1 2.4-2.4V43.4c.9.8 2.4 1.2 3.8 1.2h.1c4.8 0 8.4-4.1 8.4-8.8v-9.9c0-4.7-3.6-8.3-8.4-8.3zm3.8 18.4c0 2.6-1.7 3.7-3.7 3.7h-.1c-2.1 0-3.7-1.1-3.7-3.7v-9.9c0-2 1.7-3.7 3.7-3.7h.1c2.1 0 3.7 1.6 3.7 3.7V36z" fill-rule="nonzero"/>
        <path d="M89.6 28.3c-2.7-1.1-4.4-1.8-4.4-3.4 0-1.3 1-2.5 3.3-2.5 1.4 0 2.6.6 3.5 1.8.6.7 1.2 1.1 1.9 1.1 1.4 0 2.5-1.1 2.5-2.4 0-.5-.1-1-.4-1.3-1.5-2.3-4.6-3.9-7.5-3.9-4 0-8.1 2.5-8.1 7.3 0 4.9 4 6.5 7.3 7.7 2.6 1 4.9 1.9 4.9 4 0 1.6-1.5 3.2-4.3 3.2-.9 0-2.5-.2-3.6-1.5-.6-.7-1.3-1-1.9-1-1.3 0-2.5 1.1-2.5 2.4 0 .5.2 1 .5 1.4 1.5 2.3 4.9 3.4 7.5 3.4 4.4 0 9.2-2.8 9.2-7.9-.1-5.4-4.4-7.1-7.9-8.4z"/>
        <path d="M58.2.5H5.1C2.7.5.7 2.5.7 4.9v52.8c0 2.4 2 4.4 4.4 4.4h53.1c2.4 0 4.4-2 4.4-4.4V4.9c0-2.5-2-4.4-4.4-4.4zM39.5 46.8c-5.4 5.4-14 5.6-19.7.7l-.1-.1c-.3-.3-.4-.9 0-1.3L38.9 27c.4-.3.9-.3 1.3 0 5 5.8 4.8 14.4-.7 19.8zm4-30.5L24.3 35.4c-.4.3-.9.3-1.3 0-5-5.7-4.8-14.3.6-19.7 5.4-5.4 14-5.6 19.7-.7 0 0 .1 0 .1.1.5.3.5.9.1 1.2z" fill-rule="nonzero"/>
        <g fill-rule="nonzero">
            <path d="M208.4 17.6c-2.6 0-4.8 2.1-4.8 4.8 0 2.6 2.1 4.8 4.8 4.8 2.6 0 4.8-2.1 4.8-4.8 0-2.6-2.1-4.8-4.8-4.8zm0 8.4c-2 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6 3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6z"/>
            <path d="M208.9 22.6c.6-.1 1-.6 1-1.2 0-.8-.6-1.3-1.5-1.3h-1.2c-.3 0-.5.2-.5.5v3.3c0 .3.2.5.5.5s.5-.2.5-.5v-1.2l1.2 1.5c.1.2.2.2.5.2.4 0 .5-.3.5-.5s-.1-.3-.2-.4l-.8-.9zm-.4-.7h-.6v-1h.6c.3 0 .5.2.5.5 0 .2-.2.5-.5.5z"/>
        </g>
    </g>
</svg>

It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir and more. Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
