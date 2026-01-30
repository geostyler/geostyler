#!/bin/bash

# This script updates the documentation links in the specified README file
# Usage: ./scripts/update-readme.sh <version> <filepath>
# Example: ./scripts/update-readme.sh 3.5.0 ../README.md
# Note: The files path is relative to the directory in which the script is executed.

VERSION=$1
FILEPATH=$2

sed -i "s/Documentation:.*/Documentation: [main](https:\/\/geostyler.github.io\/geostyler\/main\/index.html) \/ [latest](https:\/\/geostyler.github.io\/geostyler\/latest\/index.html) \/ [${VERSION}](https:\/\/geostyler.github.io\/geostyler\/v${VERSION}\/index.html)/g" ${FILEPATH}
