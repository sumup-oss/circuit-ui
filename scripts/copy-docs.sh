#!/usr/bin/env bash

# Copies documentation files to be included in Storybook

# Package READMEs

packages=(./packages/*)

mkdir -p ./docs/packages

for package in "${packages[@]}"; do
  package_name=$(echo ${package} | cut -d'/' -f 3)
  src_file_path="${package}/README.md"
  dest_file_path="./docs/packages/${package_name}.mdx"

  echo -e "import { Meta } from '../../.storybook/components';\n\n<Meta title=\"Packages/${package_name}\" />\n\n$(cat ${src_file_path})" > "${dest_file_path}"
done

templates=(./templates/*)

mkdir -p ./docs/templates

for template in "${templates[@]}"; do
  template_name=$(echo ${template} | cut -d'/' -f 3)
  src_file_path="${template}/README.md"
  dest_file_path="./docs/templates/${template_name}.mdx"

  echo -e "import { Meta } from '../../.storybook/components';\n\n<Meta title=\"Templates/${template_name}\" />\n\n$(cat ${src_file_path})" > "${dest_file_path}"
done

# CONTRIBUTING.md

echo -e "import { Meta } from '../../.storybook/components';\n\n<Meta title=\"Introduction/Changelog\" />\n\n$(cat "./packages/circuit-ui/CHANGELOG.md")" | sed -r 's/# @sumup\/circuit-ui/# Changelog/g' | sed -r 's/ >=18/ {` >=18`}/g' | sed -r 's/ <18/ {` <18`}/g' > "./docs/introduction/5-changelog.mdx"
echo -e "import { Meta } from '../../.storybook/components';\n\n<Meta title=\"Introduction/Migration\" />\n\n$(cat "./MIGRATION.md")" > "./docs/introduction/6-migration.mdx"
echo -e "import { Meta } from '../../.storybook/components';\n\n<Meta title=\"Contributing/Overview\" />\n\n$(cat "./CONTRIBUTING.md")" > "./docs/contributing/1-overview.mdx"
echo -e "import { Meta } from '../../.storybook/components';\n\n<Meta title=\"Contributing/Contributing Icons\" />\n\n$(cat "./packages/icons/CONTRIBUTING.md")" > "./docs/contributing/7-contributing-icons.mdx"
