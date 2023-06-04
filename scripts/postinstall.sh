#!/usr/bin/env bash
#
# Provides "package management" for the version of remarkjs that's convenient
# to use in the browser (i.e. the version from remarkjs.com not via npm).
#
# Runs on npm's postinstall hook.
set -e

src='https://remarkjs.com/downloads/remark-latest.min.js'
dir='./web/js'
file="$(basename $src)"
filepath="${dir}/${file}"

if [ -f "$filepath" ]; then
  echo "  - Removing existing '${file}' file."
  rm "$filepath"
fi

echo "  - Downloading latest version of '${file}'."
echo
curl --location "$src" --output "$filepath"
