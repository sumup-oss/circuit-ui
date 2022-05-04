<div align="center">

# Welcome to SumUp Next.js <!-- omit in toc -->

A [Next.js](https://nextjs.org) starter app, preconfigured with SumUp's [Circuit UI](https://circuit.sumup.com) component library and SumUp's [Foundry](https://www.npmjs.com/package/@sumup/foundry) CLI toolkit for writing TypeScript.

</div>

## Table of Contents <!-- omit in toc -->

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [`yarn dev`](#yarn-dev)
  - [`yarn build`](#yarn-build)
  - [`yarn start`](#yarn-start)
  - [`yarn test:*`](#yarn-test)
- [Fetching Data](#fetching-data)
  - [`./pages/stars.tsx`](#pagesstarstsx)
- [Styling with Emotion](#styling-with-emotion)
- [Syntax Highlighting](#syntax-highlighting)
- [Contributing](#contributing)
- [Questions? Feedback?](#questions-feedback)
- [About SumUp](#about-sumup)

## Folder Structure

Your app should look something like:

```
project-name/
├─ components/
│  ├─ Link/
│  │  ├─ Link.tsx
│  │  ├─ Link.spec.tsx
│  │  └─ index.ts
│  └─ ...
├─ pages/
│  ├─ _app.tsx
│  ├─ _document.tsx
│  ├─ _error.tsx
│  ├─ 404.tsx
│  └─ index.tsx
└─ types/
   └─ emotion.d.ts
```

Routing in Next.js is based on the file system, so `./pages/index.tsx` maps to the `/` route and `./pages/about.tsx` would map to `/about`.

The `./component` directory is meant for shared components; the `./types` directory for shared types. Any static assets that you want to serve can be added to a new `./public` directory, which will map to `/`.

Out of the box, you get:

- Automatic transpilation and bundling (with Webpack and Babel)
- Hot code reloading
- Server rendering and indexing of `./pages`
- Static file serving. `./public/` is mapped to `/`

Read more about [Next.js's Routing](https://nextjs.org/docs/routing/introduction).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits to the client-side code. You will also see any errors in the console.

### `yarn build`

Builds the app for production to the `./.next` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn start`

Starts the application in production mode. The application should be compiled with `yarn build` first.

See the section in Next docs about [deployment](https://nextjs.org/docs/deployment) for more information.

### `yarn test:*`

- `yarn test` runs all unit tests with Jest, and watch for changes.
- `yarn test:ci` runs all unit tests optimized for continuous integration (e.g. GitHub Actions).

See the [Jest docs](https://facebook.github.io/jest/docs/en/tutorial-react.html) for more information.

## Fetching Data

You can fetch data in `pages` components using `getInitialProps` like this:

### `./pages/stars.tsx`

```jsx
const Page = (props) => <div>Circuit UI stars: {props.stars}</div>;

export const getStaticProps = async () => {
  const res = await fetch('https://api.github.com/repos/sumup-oss/circuit-ui');
  const json = await res.json();
  const stars = json.stargazers_count;
  return { props: { stars } };
};

export default Page;
```

If you export an `async` function called `getStaticProps` from a page, Next.js will pre-render this page at build time using the props returned by `getStaticProps`.

Read more about [fetching data](https://nextjs.org/docs/basic-features/data-fetching).

## Styling with Emotion

The project uses [Emotion](https://emotion.sh/), a CSS-in-JS library, to style the components.

Check out the sample components or have a look at the [Emotion docs](https://emotion.sh/docs/introduction) for more information.

## Syntax Highlighting

To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

## Contributing

If you have ideas for how we could improve this README or the project in general, [let us know](https://github.com/sumup-oss/circuit-ui/issues) or [contribute](https://github.com/sumup-oss/circuit-ui/blob/main/CONTRIBUTING.md)!

## Questions? Feedback?

Check out [Next.js FAQ & docs](https://nextjs.org/docs) or [ask questions](https://github.com/sumup-oss/circuit-ui/issues).

## About SumUp

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Elixir, Erlang, and much more. Want to come work and with us? [Head to our careers page](https://sumup.com/careers) to find out more.
