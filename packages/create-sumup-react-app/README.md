# create-sumup-react-app

```javascript
curl -L https://raw.githubusercontent.com/sumup/create-sumup-react-app/master/create-sumup-react-app.sh | bash -s -- {project-name}
```

## Troubleshooting

```
error eslint@5.0.1: The engine "node" is incompatible with this module. Expected version "^6.14.0 || ^8.10.0 || >=9.10.0".
error Found incompatible module
```

Use a version of node that is compatible with ESLint. This is easy to accomplish with [nvm](https://github.com/creationix/nvm).
