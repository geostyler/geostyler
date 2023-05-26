# Developer Guide

Thank you for taking the time to read the following hints for developers!

Make sure to read the general [guidelines for contributions](./CONTRIBUTING.md) and our [code of conduct](./CODE_OF_CONDUCT.md).

## <a name="developing-geostyler-ui-components"></a>Developing GeoStyler UI Components

The easiest way to develop UI components is to use `styleguidist`. Just run `npm run styleguide` and the interactive documenation will be running on `http://localhost:6060`.

For more complex developments such as integrations with different parsers, it might be helpful to `npm link` your local repository to the GeoStyler Demo. If you include your component into one of our high-level components, you will be able to directly see the new components in your browser. To do so, follow these steps:

```bash
git clone https://github.com/geostyler/geostyler.git
cd geostyler
npm i
npm link
npm run build

cd ..
git clone https://github.com/geostyler/geostyler-demo.git
cd geostyler-demo
npm i
npm link geostyler
```

When working with npm link it may happen that some tools like webpack or typescript don't know how to resolve packages that are used in both packages (in this case `geostyler` and `geostyler-style`). So we have to configure this in the `geostyler-demo`:

Replace `rootDir` with `rootDirs` and add the linked packages to the `rootDirs` in `tsconfig.json`. If you link some parsers too just add them as well.

```diff
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -9,9 +9,12 @@
     "allowJs": true,
     "jsx": "react",
     "moduleResolution": "node",
-    "rootDir": ".",
     "rootDirs": [
-      "./src/"
+      "./src/",
+      "../geostyler",
     ],
     "forceConsistentCasingInFileNames": true,
     "noImplicitReturns": true,
```

Then uncomment or add resolve aliases to the webpack config:

```diff
--- a/config/webpack.common.config.js
+++ b/config/webpack.common.config.js
@@ -35,7 +35,9 @@ module.exports = {
     },
     alias: {
       react: require.resolve('react'),
-      'geostyler-style': path.resolve('node_modules', 'geostyler-style')
+      'geostyler-style': path.resolve('node_modules', 'geostyler-style'),
+      'geostyler-sld-parser': path.resolve('node_modules', 'geostyler-sld-parser'),
+      'antd': path.resolve('node_modules', 'antd')
     }
   },
   output: {
```

```
npm run start
```

The GeoStyler Demo will then be served on `localhost:3000`. When doing changes to GeoStyler you have to rebuild the project via one of the following commands:

```bash
npm run build
npm run build-dist
```
Changes will automatically be updated in the browser. Please also provide tests and a minimal code example as \<ComponentName\>.example.md, if you add a new component, so the api documentation will always be up to date and other users can benefit from your work.

## Troubleshooting
`Invalid hook call` error:
If the demo does not start but shows the above error, it means that `geostyler-demo` and `geostyler` are using different react sources. Please make sure to have the react alias in the `webpack.common.config.js` configured correctly.

If there is an issue with a UI component, you may need to do the same for the `antd` module and add the alias.

## <a name="developing-geostyler-style-parsers"></a>Developing GeoStyler Style Parsers

If you want to write your own style parser please take a look at the existing parsers for a consistent project setup. Developing them is a straighforward task, but don't forget: **style parsers have to implement the [GeoStyler Style interface](https://github.com/geostyler/geostyler-style).**

If you want to work on an existing parser, do following steps to setup the project:

```bash
git clone <wanted-parser-repo>
cd <wanted-parser>
npm i
```

Parsers can be directly tested within their repositories, respectively. The best way to integrate your local changes into the UI/Demo is using `npm link`.
Run

```bash
npm link
```
from within your style parser repo and

```bash
npm link <wanted-parser>
```

from within the GeoStyler Demo.

## <a name="developing-geostyler-data-parsers"></a>Developing GeoStyler Data Parsers

Developing GeoStyler data parsers follows the same pattern as described in [Developing GeoStyler Style Parser](#Developing-GeoStyler-Style-Parsers), but keep in mind that **data parsers have to implement the [GeoStyler Data interface](https://github.com/geostyler/geostyler-data).**
