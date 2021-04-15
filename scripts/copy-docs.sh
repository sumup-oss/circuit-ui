#!/usr/bin/env bash

# Copies documentation files to be included in Storybook

# Package READMEs

packages=(./packages/*)

mkdir -p ./docs/packages

for package in "${packages[@]}"; do
  package_name=$(echo ${package} | cut -d'/' -f 3)
  src_file_path="${package}/README.md"
  dest_file_path="./docs/packages/${package_name}.stories.mdx"

  echo -e "import { Meta } from '../../.storybook/components';\n\n<Meta title=\"Packages/${package_name}\" />\n\n$(cat ${src_file_path})" > "${dest_file_path}"
done

# CONTRIBUTING.md

echo -e "import { Meta } from '../../.storybook/components';\n\n<Meta title=\"Introduction/Contributing/Overview\" />\n\n$(cat "./CONTRIBUTING.md")" > "./docs/contributing/overview.stories.mdx"
