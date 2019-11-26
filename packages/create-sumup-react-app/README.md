<div align="center">
<h1>⚛️ create-sumup-react-app ⚛️</h1>

The easiest way to get started writing a React app with SumUp's standard frontend toolchain.

</div>

## Table of Contents <!-- omit in toc -->

- [💻 Prerequisites](#%f0%9f%92%bb-prerequisites)
- [✨ Setting up a new SumUp React project](#%e2%9c%a8-setting-up-a-new-sumup-react-project)
- [🛠 Development workflow](#%f0%9f%9b%a0-development-workflow)
  - [Firing up the tools](#firing-up-the-tools)
  - [Adding a new component](#adding-a-new-component)
  - [Linting your code](#linting-your-code)
  - [Writing tests](#writing-tests)
- [📖 Useful resources](#%f0%9f%93%96-useful-resources)
- [💁‍♀ Tips](#%f0%9f%92%81%e2%80%8d%e2%99%80-tips)
  - [Setting up Foundry's ESLint in your editor](#setting-up-foundrys-eslint-in-your-editor)
    - [Visual Studio Code](#visual-studio-code)
- [⚠️ Troubleshooting](#%e2%9a%a0%ef%b8%8f-troubleshooting)
  - [Debug mode](#debug-mode)
  - [Engine node is incompatible](#engine-node-is-incompatible)
  - [Error watching file for changes](#error-watching-file-for-changes)
- [Code of conduct (CoC)](#code-of-conduct-coc)
  - [Maintainers](#maintainers)
- [About SumUp](#about-sumup)

## 💻 Prerequisites

- You should have **[Node.js](https://nodejs.org/)** installed at a version equal or above **`v9.10.0`**. If you cannot do that, see the [Troubleshooting](#troubleshooting) section for ways around this requirement.
- At the moment this project reqires **[`yarn`](https://yarnpkg.com/)** to be installed on your system. Yarn is a package manager for JavaScript. You can read how to install the Yarn CLI in [their documentation](https://yarnpkg.com/en/docs/install).
- You will need **`npx`** installed. You can run `yarn global add npx` or `npm install -g npx` to make that happen.

## ✨ Setting up a new SumUp React project

1. Open your terminal.
2. Navigate to the directory you would like to place your project in.
3. Run `yarn create @sumup/sumup-react-app my-app`, where `my-app` is the name of your project.

This will create the folder `my-app` and initialize a new project inside. The project will be based on [`create-react-app`](https://github.com/facebook/create-react-app) and will use the SumUp's [`Circuit UI`](https://circuit.sumup.com/) component library and [Foundry](https://github.com/sumup/foundry) toolkit.

## 🛠 Development workflow

### Firing up the tools

Run `yarn start` to start the development build. The app should automatically open in your browser. Changes you make to `src/App.js` should be visible on the page almost immediately.

To create a production build of your app, run `yarn build`. `react-scripts` will create an optimized production build of your application inside the `build` folder of your project. It will also provide you with additional details on what to do with them.

### Adding a new component

We try making adding new components as easy as possible. Run `yarn create-component YourComponentName` to launch the plop CLI exposed and configured by Foundry.

<div align="center">

![A GIF of how to use the create-component script.](https://github.com/sumup/create-sumup-react-app/blob/master/.github/create-component.gif?raw=true 'Using create-component')

</div>

### Linting your code

A linter is a tool that checks your code for:

- problems that will cause it to break when run, or
- code style that violates a given set of rules the project is following.

Linting serves as a first line of defence against evil bugs on production.​ Your project will be set up to use a version of the popular [ESLint](https://eslint.org) linter for JavaScript provided by Foundry. You can lint your code and apply automatic fixes by running `yarn lint`. Usually, your editor is able to integrate with ESLint. Check your options and refer to the [Tips](#setting-up-foundry-s-eslint-in-your-editor) section for details on how to make this work with Foundry.

### Writing tests

Writing tests is great. Tests are the second line of defence against bugs ending up on production. By covering your application in unit and integration tests, you can be sure you did not break anything when, for example, shipping refactored code to production. Your new React project comes with testing built in. By running `yarn test` you will start the test runner, [Jest](https://jestjs.io/en/). As you add tests or make changes to your code, Jest will re-run tests and show you the results. The app will come with `react-testing-library` set up for writing UI tests for your React components. Check out `src/App.spec.js` for examples.

## 📖 Useful resources

- The [docs](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents) for `create-react-app` contain a lot of solutions for common problems when writing a React application.
- Foundry [docs](https://github.com/sumup/foundry#table-of-contents).
- Circuit UI [docs](https://circuit.sumup.com/#/) and [storybook](https://circuit.sumup.com/storybook/).
- The [README](https://github.com/kentcdodds/react-testing-library/blob/master/README.md#what-is-react-testing-library) for`react-testing-library`.

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

### Debug mode

`create-sumup-react-app` has a debug mode. To output verbose logging to your console, add the `--debug` flag when creating your app. For example:

```
yarn create @sumup/sumup-react-app my-debugging-app --debug
```

### Engine node is incompatible

```
error eslint@5.0.1: The engine "node" is incompatible with this module. Expected version "^6.14.0 || ^8.10.0 || >=9.10.0".
error Found incompatible module
```

Use a version of node that is compatible with ESLint. If you cannot install it globally, you may try [nvm](https://github.com/creationix/nvm), [nodenv](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=2ahUKEwinuL3IndneAhVLmbQKHRrJCAQQFjAAegQIBhAC&url=https%3A%2F%2Fgithub.com%2Fnodenv%2Fnodenv&usg=AOvVaw0v5LLFjnmygM4rB0ahbDrx), or similar tools.

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

Make sure you have watchman installed. On macOS and Homebrew as your package manager, you can install it with the following line.

```bash
brew install watchman
```

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
 
It is our mission to make easy and fast card payments a reality across the *entire* world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir and more. Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
