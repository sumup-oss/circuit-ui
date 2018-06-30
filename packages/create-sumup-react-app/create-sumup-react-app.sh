#!/usr/bin/env bash

# Variables
app_name=$1
gist_url=https://gist.github.com/felixjung/fe7d05033c53e9f6f77e3dba1be8f85a
files=( ".eslintrc.js" "prettier.config.js" "config-overrides.js" "App.js" "index.js" "logo.svg" "setupTests.js" )

# Set up project using create-react-app
npx create-react-app $app_name
cd $app_name

# Install dependencies
yarn add emotion react-emotion emotion-theming lodash @sumup/circuit-ui
yarn add --dev react-app-rewired react-app-rewire-react-svg-loader babel-plugin-emotion \
  babel-plugin-lodash prettier eslint-config-airbnb \
  eslint-config-prettier eslint-plugin-import eslint-plugin-jest \
  eslint-plugin-jsx-a11y eslint-plugin-prettier eslint eslint-plugin-react \
  jest-axe jest-emotion jest-enzyme react-with-direction enzyme enzyme-adapter-react-16 \
  react-test-renderer prop-types

# Download config files
for file in "${files[@]}"
do
  curl --location --remote-name "$gist_url/raw/$file"
done

# Replace npm scripts to use react-app-rewired
sed -i '' -e "s/react-scripts start/react-app-rewired start/g" package.json
sed -i '' -e "s/react-scripts build/react-app-rewired build/g" package.json
sed -i '' -e "s/react-scripts test/react-app-rewired test/g" package.json


# Replace files in src
rm -rf src/{index,App}.css src/logo.svg src/{index,App}.js
mv logo.svg {index,App}.js src