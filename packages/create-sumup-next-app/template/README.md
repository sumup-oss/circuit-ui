<div align="center">

# Create SumUp Next App

A [Next.js](https://github.com/zeit/next.js/) starter app, preconfigured with SumUp's [Circuit UI](https://github.com/sumup/circuit-ui/) component library, SumUp's [Foundry](https://github.com/sumup/foundry/) CLI toolkit for writing JavaScript, and a minimal custom server.

</div>

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Available Commands](#available-scripts)
  - [yarn dev](#yarn-dev)
  - [yarn build](#yarn-build)
  - [yarn start](#yarn-start)
  - [yarn analyze](#yarn-analyze)
  - [yarn test:\*](#yarn-test)
  - [yarn create:\*](#yarn-create)
- [Custom Server](#custom-server)
- [Fetching Data](#fetching-data)
- [Styling with Emotion](#styling-with-emotion)
- [Contributing](#contributing)
- [Questions? Feedback?](#questions-feedback)
- [About SumUp](#about-sumup)

## Installation

The easiest way to bootstrap a new SumUp Next.js app is by running the following script from your terminal:

```bash
curl -L https://raw.githubusercontent.com/sumup/create-sumup-next-app/master/bin/create-sumup-next-app | bash -s -- <PROJECT_NAME>
```

The command will download the app template to a folder with your project name, install the latest dependencies and configure [eslint](https://eslint.org/), [prettier](https://prettier.io/), [Jest](https://facebook.github.io/jest/), and [plop](https://github.com/amwmedia/plop). The configurations are kept up to date with [@sumup/foundry](https://github.com/sumup/foundry).

## Folder Structure

After creating an app, it should look something like:

```
project-name/
├─ src/
│  ├─ components/
│  │  ├─ Container/
│  │  │  ├─ Container.js
│  │  │  ├─ Container.spec.js
│  │  │  └─ index.js
│  │  └─ Logo/
│  │  │  ├─ index.js
│  │  │  ├─ Logo.js
│  │  │  ├─ Logo.spec.js
│  │  │  └─ logo.svg
│  ├─ pages/
│  │  ├─ _app.js
│  │  ├─ _document.js
│  │  └─ index.js
│  └─ static/
│  │  └─ favicon.ico
├─ server/
│  ├─ app.js
│  └─ index.js
├─ .babelrc
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ jest.config.js
├─ jest.fileTransform.js
├─ jest.setup.js
├─ next.config.js
├─ package.json
├─ plopfile.js
├─ README.md
└─ yarn.lock
```

Routing in Next.js is based on the file system, so `./src/pages/index.js` maps to the `/` route and
`./src/pages/about.js` would map to `/about`.

The `./static` directory maps to `/static` in the `next` server, so you can put all your
other static resources like images or fonts in there.

Out of the box, we get:

- Automatic transpilation and bundling (with webpack and babel)
- Hot code reloading
- Server rendering and indexing of `./src/pages`
- Static file serving. `./src/static/` is mapped to `/static/`

Read more about [Next's Routing](https://github.com/zeit/next.js#routing).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits to the client-side code in `./src/`.<br>
The server will restart if you make edits to the server-side code in `./server/`.<br>
You will also see any errors in the console. Use the [Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27) to debug the server code.

### `yarn build`

Builds the app for production to the `./src/.next` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn start`

Starts the application in production mode.<br>
The application should be compiled with `yarn build` first.

See the section in Next docs about [deployment](https://github.com/zeit/next.js/wiki/Deployment) for more information.

### `yarn analyze`

Analyze the production bundle with [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer).<br>
Compiles the application and opens the analyzer on port[`8889`](http://127.0.0.1:8889/).

### `yarn test:*`

`yarn test:unit` runs all unit tests with Jest.<br>
`yarn test:unit:watch` watches your files and automatically runs the unit tests only for changed files.<br>
`yarn test:ci` runs all unit tests optimized for continuous integration (e.g. [Travis CI](https://travis-ci.org/)).

See the [Jest docs](https://facebook.github.io/jest/docs/en/tutorial-react.html) for more information.

### `yarn create:*`

This project uses [@sumup/foundry](https://github.com/sumup/foundry) and the provided `plop` command to generate new React components. To create a new component, run `yarn create:component` inside the project. You'll see a CLI that guides you through the process.

After the CLI has finished, all files will have been created in the location you specified.

## Custom Server

The project comes with a minimal [express server](https://expressjs.com/) out of the box. This enables route patterns, redirects, and other custom server logic.

The server code is not transpiled, so you are limited to the syntax and features that your version of Node supports. However, you can use `import` and `export` statements, thanks to the [`esm`](https://www.npmjs.com/package/esm) module loader.

The below example makes `/a` resolve to `./pages/b`, and `/b` resolve to `./pages/a`, and also matches individual `/posts` and forwards their `id` to the Next.js page:

```js
import express from 'express';
import next from 'next';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/a', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });

  server.get('/b', (req, res) => {
    return app.render(req, res, '/a', req.query);
  });

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```

Read more about [custom server and routing](https://github.com/zeit/next.js#custom-server-and-routing).

## Fetching Data

You can fetch data in `pages` components using `getInitialProps` like this:

### `./src/pages/stars.js`

```jsx
const Page = props => <div>Next stars: {props.stars}</div>;

Page.getInitialProps = async ({ req }) => {
  const rs = await fetch('https://api.github.com/repos/zeit/next.js');
  const json = await res.json();
  const stars = json.stargazers_count;
  return { stars };
};

export default Page;
```

For the initial page load, `getInitialProps` will execute on the server only. `getInitialProps` will only be executed on the client when navigating to a different route via the `Link` component or using the routing APIs.

_Note: `getInitialProps` can **not** be used in children components. Only in `pages`._

Read more about [fetching data and the component lifecycle](https://github.com/zeit/next.js#fetching-data-and-component-lifecycle).

## Styling with Emotion

The project uses [Emotion](https://emotion.sh/), a CSS-in-JS library, to style the components.

Check out the sample components, read our [developer guidelines](https://sumupteam.atlassian.net/wiki/spaces/DEV/pages/223871058/Circuit+UI+Developer+guide) or have a look at the [Emotion docs](https://emotion.sh/docs/introduction) for more information.

## Syntax Highlighting

To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

## Contributing

If you have ideas for how we could improve this readme or the project in general, [let us know](https://github.com/sumup/create-sumup-next-app/issues) or [contribute some](https://github.com/sumup/create-sumup-next-app/edit/master/template/README.md)!

## Questions? Feedback?

Check out [Next.js FAQ & docs](https://github.com/zeit/next.js#faq) or [let us know](https://github.com/sumup/create-sumup-next-app/issues) your feedback.

## About SumUp

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Elixir, Erlang, and much more. Want to come work and with us? [Head to our careers page](https://sumup.com/careers) to find out more.
