<div align="center">

# Circuit UI + Next.js

A [create-next-app template](https://nextjs.org/docs/api-reference/create-next-app) for TypeScript Next.js apps with SumUp's frontend stack.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup/circuit-ui)](https://www.npmjs.com/package/@sumup/circuit-ui) [![License](https://img.shields.io/github/license/sumup-oss/circuit-ui)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/circuit-ui/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## 💻 Prerequisites

- You should have **Node.js** installed at a version equal to or above **`v18.0.0`**.

## ✨ Setting up a new Circuit UI + Next.js project

1. Open your terminal.
2. Navigate to the directory you would like to place your project in.
3. Run `npx create-next-app --example "https://github.com/sumup-oss/circuit-ui/tree/main/packages/cna-template/template" my-app`, where `my-app` is the name of your project.

This will create the folder `my-app` and initialize a new project inside. The project will be based on [Next.js](https://github.com/vercel/next.js/) and will use SumUp's [Circuit UI](https://circuit.sumup.com/) component library and [Foundry](https://github.com/sumup-oss/foundry) toolkit.

## 🛠 Development workflow

### Firing up the tools

Run `npm run dev` to start the development build. The app should automatically open in your browser. Changes you make to `pages/index.tsx` should be visible on the page almost immediately.

To create a production build of your app, run `npm run build`. Next.js will create an optimized production build of your application inside the `.next/` folder of your project. It will also provide you with additional details on what to do with them.

### Linting your code

A linter is a tool that checks your code for

- problems that will cause it to break when run, or
- code style that violates a given set of rules the project is following.

Linting serves as a first line of defense against bugs in production.​ Your project will be set up to use a version of the popular [ESLint](https://eslint.org) linter for TypeScript provided by Foundry. You can lint your code and apply automatic fixes by running `npm run lint`.

### Writing tests

Writing tests is great. Tests are the second line of defense against bugs ending up in production. By covering your application in unit and integration tests, you can be sure you did not break anything when, for example, shipping refactored code to production. Your new React project comes with testing built in. By running `npm run test` you will start the test runner, [Jest](https://jestjs.io/en/). As you add tests or make changes to your code, Jest will re-run tests and show you the results. The app will come with `@testing-library/react` set up for writing UI tests for your React components. Check out `components/DocCard.spec.tsx` for examples.

## 📖 Useful resources

- The [docs](https://nextjs.org/docs/getting-started/installation) for `create-next-app` contain a lot of solutions for common problems when writing a React application.
- Foundry [docs](https://github.com/sumup-oss/foundry#table-of-contents).
- Circuit UI [docs](https://circuit.sumup.com/).
- The [README](https://github.com/testing-library/react-testing-library/#readme) for`@testing-library/react`.
