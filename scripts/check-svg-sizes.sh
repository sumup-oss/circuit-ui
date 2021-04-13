#!/usr/bin/env bash

# Reports all SVGs that exceed the size limit.

size_limit=15
offenders=$(find ./packages -type f -name "*.svg" -size +${size_limit}k ! -path '*node_modules*')

if [ ! -z "$offenders" ]
then
  offender_array=()

  while read line; do
    offender_array+=("$line")
  done <<< "$offenders"

  file_count=${#offender_array[@]} # $(echo -n "$offenders" | grep -c '^')

  echo "The following $file_count SVG files exceed ${size_limit}kb and need to be optimized:"
  echo "Size | Path"

  for file_path in "${offender_array[@]}"
  do
    file_size=$(du -h "$file_path" | cut -f1)
    echo "$file_size | $file_path"
  done

  exit 1;
else
  echo "No SVG files exceed ${size_limit}kb. That's great!"

  exit 0;
fi
