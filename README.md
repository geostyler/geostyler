# GeoStyler

[github](https://github.com/terrestris/geostyler) /
[npm](https://www.npmjs.com/package/geostyler)

Generic styler for geodata.

[![Build Status](https://travis-ci.org/terrestris/geostyler.svg?branch=master)](https://travis-ci.org/terrestris/geostyler)
[![Greenkeeper badge](https://badges.greenkeeper.io/terrestris/geostyler.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/terrestris/geostyler/badge.svg?branch=master)](https://coveralls.io/github/terrestris/geostyler?branch=master)

## Related projects

### TypeScript Declaration Files

  - GeoStyler Data (
      [github](https://github.com/terrestris/geostyler-data) /
      [npm](https://www.npmjs.com/package/geostyler-data)
    )
  - GeoStyler Style (
      [github](https://github.com/terrestris/geostyler-style) /
      [npm](https://www.npmjs.com/package/geostyler-style)
    )

### DataParser Implementations

  - GeoJSON (
      [github](https://github.com/terrestris/geostyler-geojson-parser) /
      [npm](https://www.npmjs.com/package/geostyler-geojson-parser)
    )
  - Web Feature Service (WFS) (
      [github](https://github.com/terrestris/geostyler-wfs-parser) /
      [npm](https://www.npmjs.com/package/geostyler-wfs-parser)
    )

### StyleParser Implementations

  - SLD (
      [github](https://github.com/terrestris/geostyler-sld-parser) /
      [npm](https://www.npmjs.com/package/geostyler-sld-parser)
    )
  - OpenLayers Style (
      [github](https://github.com/terrestris/geostyler-openlayers-parser) /
      [npm](https://www.npmjs.com/package/geostyler-openlayers-parser)
    )
    
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
The most recent version of the Create React App README can be found [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Development

It often makes sense, setting up a local development environment where changes in one module will directly reflect in the other modules.

For this usecase, `npm link` is very helpful. However, when a linked package has the same dependency as the linking package, npm does not resolve dependencies very well. This might lead to unexpected errors, because multiple instances of the same dependency exist. In our case this might happen with openlayers, which is being used in `geostyler` and `geostyler-openlayers-parser`.

To counteract this problem, an alias must be defined in `geostyler`. To do so, in `geostyler/node_modules/react-scripts-ts/config/webpack.config.dev.js` following line needs to be added:

```
(Line 118): 'ol': path.join(__dirname, '../..', 'ol')
```