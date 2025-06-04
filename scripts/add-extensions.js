/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * This script adds .js extensions to all local imports in the compiled JavaScript files.
 * It is used as a post-build step to ensure proper module resolution in ESM environments.
 *
 * The script:
 * 1. Recursively finds all .js files in the dist directory
 * 2. For each file, it looks for import/export statements with relative paths
 * 3. Adds .js extension to these paths if they don't already have it
 * 4. Preserves the original file if no changes are needed
 */
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, '..', 'dist');

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = join(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else if (dirent.name.endsWith('.js')) {
      yield res;
    }
  }
}

async function addExtensions() {
  for await (const filePath of getFiles(distDir)) {
    let content = await readFile(filePath, 'utf8');

    const exportMatches = content.matchAll(/export\s*{[^}]+}\s*from\s*['"]([^'"]+)['"]/g);
    for (const match of Array.from(exportMatches)) {
      const [fullMatch, importPath] = match;
      if (importPath.startsWith('.') && !importPath.endsWith('.js')) {
        content = content.replace(fullMatch, fullMatch.replace(importPath, `${importPath}.js`));
      }
    }

    const importMatches = content.matchAll(/import\s*{[^}]+}\s*from\s*['"]([^'"]+)['"]/g);
    for (const match of Array.from(importMatches)) {
      const [fullMatch, importPath] = match;
      if (importPath.startsWith('.') && !importPath.endsWith('.js')) {
        content = content.replace(fullMatch, fullMatch.replace(importPath, `${importPath}.js`));
      }
    }

    const singleExportMatches = content.matchAll(/export\s*{\s*(\w+)\s*}\s*from\s*['"]([^'"]+)['"]/g);
    for (const match of Array.from(singleExportMatches)) {
      const [fullMatch, , importPath] = match;
      if (importPath.startsWith('.') && !importPath.endsWith('.js')) {
        content = content.replace(fullMatch, fullMatch.replace(importPath, `${importPath}.js`));
      }
    }

    await writeFile(filePath, content);
  }
}

addExtensions().catch(console.error);
