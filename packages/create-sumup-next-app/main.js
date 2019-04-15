import { resolve } from 'path';
import { writeFile } from 'fs';
import { promisify } from 'util';

import chalk from 'chalk';
import Listr from 'listr';
import VerboseRenderer from 'listr-verbose-renderer';

import spawn from './lib/spawn';
import logger from './lib/logger';
import * as util from './lib/util';

const asyncWriteFile = promisify(writeFile);

const FILES_PATH = resolve(__dirname, 'files');
const WORKING_DIR = process.cwd();
const APP_NAME = process.argv[2];
const APP_PATH = resolve(WORKING_DIR, APP_NAME || '');
const DEPENDENCIES = [
  // React and Next.js ️⚛
  'react',
  'react-dom',
  'next',
  'prop-types',
  // Our beautiful component library 💄
  '@sumup/circuit-ui@beta',
  // CSS-in-JS 🚀
  '@emotion/core',
  '@emotion/styled',
  'emotion-theming',
  // Tools 🛠
  'lodash',
  // Server 🖥
  'express',
  'esm'
];
const DEV_DEPENDENCIES = [
  // The toolkit 🛠
  '@sumup/foundry',
  // Development 🏗
  'nodemon',
  // Testing 📏
  'react-testing-library',
  'react-test-renderer',
  'jest',
  'jest-emotion',
  'jest-dom',
  'jest-axe',
  // Loaders and plugins 🔌
  'babel-plugin-emotion',
  'babel-plugin-lodash',
  'babel-plugin-inline-react-svg',
  'babel-jest',
  'babel-core@7.0.0-bridge.0',
  'next-transpile-modules',
  'next-compose-plugins',
  'webpack-bundle-analyzer'
];

const options = util.isDebugging()
  ? {
      renderer: VerboseRenderer
    }
  : {};

const tasks = new Listr(
  [
    {
      title: 'Initialize project',
      task: () =>
        new Listr([
          {
            title: 'Create project folder',
            task: () => createProjectDirectory(APP_NAME)
          },
          {
            title: 'Initialize package.json',
            task: () => initProject(APP_PATH)
          }
        ])
    },
    {
      title: 'Install dependencies',
      task: () => addDependencies()
    },
    {
      title: 'Customize experience',
      task: () =>
        new Listr([
          {
            title: 'Set up SumUp Foundry',
            task: () => setUpFoundry(APP_PATH)
          },
          {
            title: 'Copy starter files',
            task: () => copyStarterFiles(APP_PATH, FILES_PATH)
          },
          {
            title: 'Customize package.json',
            task: () => updatePackageJson(APP_PATH)
          }
        ])
    }
  ],
  options
);

run();

async function run() {
  if (!APP_NAME) {
    logger.error([
      'Please pass a name for your app. For example, try',
      '\n',
      chalk`  yarn create @sumup/sumup-next-app {italic.bold my-app}`,
      '\n'
    ]);
    process.exit(1);
  }

  logger.log(`
🎉 Yay, you did it. Thanks for starting a fresh SumUp Next.js app.
🚀 Hang tight while we get you all set up.
`);

  await tasks.run().catch(handleErrors);

  logger.log(`
🏁 All done. Here's what to do next.
1.) Check out your new project: "cd ${APP_NAME}".
2.) Start your development process: "yarn dev".
3.) Read the documentation in the README.

If you have questions, check our docs or file an issue on Github.

Docs: https://github.com/sumup/create-sumup-next-app/blob/master/README.md
Issues: https://github.com/sumup/create-sumup-next-app/issues
File issue: https://github.com/sumup/create-sumup-next-app/issues/new
`);
}

function createProjectDirectory(appName) {
  const cmd = 'mkdir';
  const args = [appName];

  return spawn(cmd, args, { cwd: WORKING_DIR });
}

function initProject(cwd) {
  const cmd = 'yarn';
  const args = ['init', '-y'];

  return spawn(cmd, args, { cwd });
}

async function addDependencies({
  dependencies = DEPENDENCIES,
  devDepenencies = DEV_DEPENDENCIES,
  cwd = APP_PATH
} = {}) {
  const cmd = 'yarn';
  const args = ['add', ...dependencies];

  const devArgs = ['add', '--dev', ...devDepenencies];
  await spawn(cmd, args, { cwd });
  return spawn(cmd, devArgs, { cwd });
}

function setUpFoundry(appPath, childProcessOptions = {}) {
  const cmd = 'npx';
  const args = [
    'foundry',
    'bootstrap-config',
    '--eslint',
    'react',
    '--prettier',
    'base',
    '--plop',
    'react'
  ];
  return spawn(cmd, args, { cwd: appPath, ...childProcessOptions });
}

function copyStarterFiles(appPath = APP_PATH, sourcePath = FILES_PATH) {
  const cmd = 'cp';
  const args = ['-r', `${sourcePath}/.`, appPath];
  return spawn(cmd, args, { cwd: appPath });
}

async function updatePackageJson(appPath) {
  const filepath = resolve(appPath, 'package.json');
  const { default: packageJson } = await import(filepath);
  const main = 'server/index.js';
  const scripts = {
    lint: 'foundry run eslint src/**/*.js',
    analyze: 'ANALYZE=true yarn build',
    dev: 'nodemon --inspect --watch server server/index.js',
    build: 'next build src',
    start: 'NODE_ENV=production node server/index.js',
    'create:component': 'foundry run plop component',
    'test:ci': 'jest --ci --coverage --testResultsProcessor="jest-junit"',
    'test:unit': 'jest --coverage',
    'test:unit:watch': 'jest --watch'
  };
  const updatedPackageJson = {
    ...packageJson,
    main,
    scripts: {
      ...packageJson.scripts,
      ...scripts
    }
  };

  const fileContent = JSON.stringify(updatedPackageJson, null, 2);

  return asyncWriteFile(filepath, fileContent);
}

function handleErrors(err) {
  if (err.log) {
    logger.error('Check the execution log below. 👇');
    logger.log('\n');
    logger.log(err.log);
  }
  process.exit(1);
}
