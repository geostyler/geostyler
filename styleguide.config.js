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

const path = require('path');
const webpackConfig = require('./webpack.dev.config');
const rdt = require('react-docgen-typescript');

module.exports = {
  title: 'GeoStyler',
  styleguideDir: './build/styleguide',
  webpackConfig: {
    ...webpackConfig,
    mode: process.env.NODE_ENV
  },
  minimize: process.env.NODE_ENV === 'production',
  assetsDir: './docs',
  propsParser: process.env.NODE_ENV === 'production' ?
    rdt
      .withCustomConfig('./tsconfig.json', {propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      }})
      .parse :
    undefined,
  components: 'src/Component/**/*.tsx',
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.tsx?$/, '.example.md')
  },
  ignore: [
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    'src/index.ts'
  ],
  moduleAliases: {
    'geostyler': path.resolve(__dirname, 'src')
  },
  usageMode: 'expand',
  pagePerSection: true,
  sections: [{
    name: 'Introduction',
    content: './docs/README.md',
    sectionDepth: 0
  }, {
    name: 'Components',
    sections: [{
      name: 'CodeEditor',
      components: 'src/Component/CodeEditor/**/*.tsx'
    }, {
      name: 'DataInput',
      components: 'src/Component/DataInput/**/*.tsx'
    }, {
      name: 'FieldSet',
      components: 'src/Component/FieldSet/**/*.tsx'
    }, {
      name: 'Filter',
      components: 'src/Component/Filter/**/*.tsx'
    }, {
      name: 'LocaleWrapper',
      components: 'src/Component/LocaleWrapper/**/*.tsx'
    }, {
      name: 'NameField',
      components: 'src/Component/NameField/**/*.tsx'
    }, {
      name: 'Rule',
      components: 'src/Component/Rule/**/*.tsx'
    }, {
      name: 'RuleGenerator',
      components: 'src/Component/RuleGenerator/**/*.tsx'
    }, {
      name: 'RuleTable',
      components: 'src/Component/RuleTable/**/*.tsx'
    }, {
      name: 'ScaleDenominator',
      components: 'src/Component/ScaleDenominator/**/*.tsx'
    }, {
      name: 'Style',
      components: 'src/Component/Style/**/*.tsx'
    }, {
      name: 'CardStyle',
      components: 'src/Component/CardStyle/**/*.tsx'
    }, {
      name: 'Symbolizer',
      components: 'src/Component/Symbolizer/**/*.tsx'
    }, {
      name: 'UploadButton',
      components: 'src/Component/UploadButton/**/*.tsx'
    }, {
      name: 'Breadcrumb',
      components: 'src/Component/Breadcrumb/**/*.tsx'
    }, {
      name: 'PreviewMap',
      components: 'src/Component/PreviewMap/**/*.tsx'
    }, {
      name: 'FieldContainer',
      components: 'src/Component/FieldContainer/**/*.tsx'
    }, {
      name: 'StyleFieldContainer',
      components: 'src/Component/StyleFieldContainer/**/*.tsx'
    }, {
      name: 'RuleFieldContainer',
      components: 'src/Component/RuleFieldContainer/**/*.tsx'
    }],
    sectionDepth: 2
  }, {
    name: 'Context',
    sections: [{
      name: 'CompositionContext',
      content: 'src/context/CompositionContext/CompositionContext.example.md'
    }],
    sectionDepth: 1
  }],
  require: [
    path.join(__dirname, 'node_modules/antd/dist/antd.css')
  ]
};
