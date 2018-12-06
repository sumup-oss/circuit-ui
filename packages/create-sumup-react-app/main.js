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
  // Our beautiful component library 💄
  '@sumup/circuit-ui',
  // CSS-in-JS 🚀
  'react-emotion@^9.0.0',
  'emotion@^9.0.0',
  'emotion-theming@^9.0.0'
];
const DEV_DEPENDENCIES = [
  // The toolkit 🛠
  '@sumup/foundry',
  // Testing 📏
  'react-testing-library@^5.3.1',
  'jest-emotion@^9.0.0',
  'jest-dom'
];

const options = util.isDebugging()
  ? {
      renderer: VerboseRenderer
    }
  : {};

const tasks = new Listr(
  [
    {
      title: 'Running Create React App',
      // task: () => runCreateReactApp(APP_NAME)
      task: () => runCreateReactApp(APP_NAME)
    },
    {
      title: 'Install additional dependencies',
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
            title: 'Replace Create React App files',
            task: () =>
              Promise.all([deleteCraFiles(APP_PATH), copyReactFiles(APP_PATH)])
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
      chalk`  yarn create sumup-react-app {italic.bold my-app}`,
      '\n'
    ]);
    process.exit(1);
  }

  logger.log(`
🎉 Yay, you did it. Thanks for starting a fresh SumUp React app.
🚀 Hang tight while we get you all set up.
`);

  await tasks.run().catch(handleErrors);

  logger.log(`
🏁 All done. Here's what to do next.
1.) Check out your new project: "cd ${APP_NAME}".
2.) Start your development process: "yarn start".

If you have questions, check our docs or file an issue on Github.

Docs: https://github.com/sumup/create-sumup-react-app/blob/master/README.md
Issues: https://github.com/sumup/create-sumup-react-app/issues
File issue: https://github.com/sumup/create-sumup-react-app/issues/new
`);
}

function runCreateReactApp(appName) {
  const cmd = 'yarn';
  const args = ['create', 'react-app', appName];

  return spawn(cmd, args, { cwd: WORKING_DIR });
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
    '--babel',
    'react',
    '--prettier',
    'base',
    '--plop',
    'react'
  ];
  return spawn(cmd, args, { cwd: appPath, ...childProcessOptions });
}

function deleteCraFiles(appPath) {
  const cmd = 'rm';
  const filesToDelete = [
    'logo.svg',
    'App.js',
    'App.test.js',
    'App.css',
    'index.js',
    'index.css'
  ];
  const args = ['-rf', ...filesToDelete.map(file => `src/${file}`)];
  return spawn(cmd, args, { cwd: appPath });
}

function copyReactFiles(appPath, sourcePath = FILES_PATH) {
  const cmd = 'cp';
  const filesToCopy = [
    'App.js',
    'App.spec.js',
    'setupTests.js',
    'index.js',
    'assets'
  ];
  const args = [
    '-r',
    ...filesToCopy.map(file => resolve(sourcePath, file)),
    `${appPath}/src`
  ];
  return spawn(cmd, args, { cwd: appPath });
}

async function updatePackageJson(appPath) {
  const filepath = resolve(appPath, 'package.json');
  const { default: packageJson } = await import(filepath);
  const scripts = {
    lint: 'foundry run eslint src/**/*.js',
    'create-component': 'foundry run plop component'
  };
  const updatedPackageJson = {
    ...packageJson,
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
