<div align="center">

# @sumup/cna-template

A
[create-next-app template](https://nextjs.org/docs/api-reference/create-next-app) for TypeScript Next.js apps with SumUp's frontend stack.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup/circuit-ui)](https://www.npmjs.com/package/@sumup/circuit-ui) [![License](https://img.shields.io/github/license/sumup-oss/circuit-ui)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/circuit-ui/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## 💻 Prerequisites

- You should have **Node.js** installed at a version equal to or above **`v16.0.0`**.
- At the moment this project requires **`yarn`** to be installed on your system. Yarn is a package manager for JavaScript. You can read how to install the Yarn CLI in [their documentation](https://yarnpkg.com/en/docs/install).

## ✨ Setting up a new SumUp Next.js project

1. Open your terminal.
2. Navigate to the directory you would like to place your project in.
3. Run `yarn create next-app --example "https://github.com/sumup-oss/circuit-ui/tree/main/packages/cna-template/template" my-app`, where `my-app` is the name of your project.

This will create the folder `my-app` and initialize a new project inside. The project will be based on [`Next.js`](https://github.com/vercel/next.js/) and will use SumUp's [`Circuit UI`](https://circuit.sumup.com/) component library and [`Foundry`](https://github.com/sumup-oss/foundry) toolkit.

## 🛠 Development workflow

### Firing up the tools

Run `yarn dev` to start the development build. The app should automatically open in your browser. Changes you make to `pages/index.js` should be visible on the page almost immediately.

To create a production build of your app, run `yarn build`. `Next.js` will create an optimized production build of your application inside the `.next/` folder of your project. It will also provide you with additional details on what to do with them.

### Linting your code

A linter is a tool that checks your code for

- problems that will cause it to break when run, or
- code style that violates a given set of rules the project is following.

Linting serves as a first line of defense against evil bugs in production.​ Your project will be set up to use a version of the popular [ESLint](https://eslint.org) linter for TypeScript provided by Foundry. You can lint your code and apply automatic fixes by running `yarn lint`. Usually, your editor is able to integrate with ESLint. Check your options and refer to the [Tips](#setting-up-foundry-s-eslint-in-your-editor) section for details on how to make this work with Foundry.

### Writing tests

Writing tests is great. Tests are the second line of defense against bugs ending up in production. By covering your application in unit and integration tests, you can be sure you did not break anything when, for example, shipping refactored code to production. Your new React project comes with testing built in. By running `yarn test` you will start the test runner, [Jest](https://jestjs.io/en/). As you add tests or make changes to your code, Jest will re-run tests and show you the results. The app will come with `@testing-library/react` set up for writing UI tests for your React components. Check out `components/Anchor.spec.tsx` for examples.

## 📖 Useful resources

- The [docs](https://nextjs.org/docs#setup) for `create-next-app` contain a lot of solutions for common problems when writing a React application.
- Foundry [docs](https://github.com/sumup-oss/foundry#table-of-contents).
- Circuit UI [docs](https://circuit.sumup.com/).
- The [README](https://github.com/testing-library/react-testing-library/#readme) for`@testing-library/react`.

## 💁‍♀ Tips

### Setting up Foundry's ESLint in your editor

The great strength of using a toolkit like Foundry is that you as a user do not have to care about developer dependencies like ESLint. Foundry manages and runs them for you via its `run` command. This, however, becomes a bit tricky when you want your text editor or IDE to run ESLint on your code as you edit it. To get this working, you need to tell your editor where to look for ESLint dependencies.

Your mileage may vary depending on your text editor, but we try to keep a list of instructions here.

#### Visual Studio Code

The ESLint extension for VSCode has a `nodePath` setting. It allows you to add additional paths where the plugin should look when resolving dependencies. By setting it to the default path of Foundry in a project's `node_modules`, you will make VSCode work with Foundry's version of ESLint. Put the following line in your `settings.json`.

```json
"eslint.nodePath": "node_modules/@sumup/foundry/node_modules",
```

Don't worry, this won't break ESLint for other projects. It just gives VSCode another relative path where it can look for ESLint.

## ⚠️ Troubleshooting

### Error watching file for changes

```
2017-05-02 09:49 node[8980] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2017-05-02 09:49 node[8980] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2017-05-02 09:49 node[8980] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
events.js:163
      throw er; // Unhandled 'error' event
      ^

Error: Error watching file for changes: EMFILE
    at exports._errnoException (util.js:1050:11)
    at FSEvent.FSWatcher._handle.onchange (fs.js:1376:11)
error Command failed with exit code 1.
```

Make sure you have `watchman` installed. On macOS and Homebrew as your package manager, you can install it with the following line.

```bash
brew install watchman
```
