<div align="center">

# Circuit UI + Astro

A template for Circuit UI + Astro apps with SumUp's frontend stack.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup/circuit-ui)](https://www.npmjs.com/package/@sumup/circuit-ui) [![License](https://img.shields.io/github/license/sumup-oss/circuit-ui)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/circuit-ui/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## 💻 Prerequisites

- You should have **Node.js** installed at a version equal to or above **`v18.14.1`**.

## ✨ Setting up a new project

1. Open your terminal.
2. Navigate to the directory you would like to place your project in.
3. Run `npx create-astro@latest ./my-app --template sumup-oss/circuit-ui/packages/astro-template`, where `my-app` is the name of your project.

This will create the folder `my-app` and initialize a new project inside. The project will be based on [Astro](https://docs.astro.build) and will use SumUp's [Circuit UI](https://circuit.sumup.com/) component library and [Foundry](https://github.com/sumup-oss/foundry) toolkit.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📖 Useful resources

- [Astro docs](https://docs.astro.build)
- [Foundry docs](https://github.com/sumup-oss/foundry#table-of-contents).
- [Circuit UI docs](https://circuit.sumup.com/).
- [`@testing-library/react` docs](https://testing-library.com/docs/react-testing-library/intro/)
