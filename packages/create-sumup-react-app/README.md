# create-sumup-react-app

## Prerequisites

## Steps to start a new project

1. Run the following command, and pick the name of your project. It will create a new directory inside your current directory.

```javascript
curl -L https://raw.githubusercontent.com/sumup/create-sumup-react-app/master/create-sumup-react-app.sh | bash -s -- {project-name}
```

2. Edit `package.json` and amend the `test` script:

```
"test": "react-app-rewired test --env=jsdom --transformIgnorePatterns \"node_modules/\\(?!\\(@sumup/circuit-ui\\)/\\)\"/g"
```

This is temporary ;)

3. Start your app with `yarn start`

## Troubleshooting

### Engine node is incompatible
```
error eslint@5.0.1: The engine "node" is incompatible with this module. Expected version "^6.14.0 || ^8.10.0 || >=9.10.0".
error Found incompatible module
```

Use a version of node that is compatible with ESLint. This is easy to accomplish with [nvm](https://github.com/creationix/nvm).

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

Make sure you have watchman installed.

```
brew install watchman
```
