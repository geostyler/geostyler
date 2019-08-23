![GeoStyler Logo](./Geo_Styler_Logo_300_RGB.jpg)

Code: [github](https://github.com/terrestris/geostyler)
Package: [npm](https://www.npmjs.com/package/geostyler)

Documentation:
[master](https://terrestris.github.io/geostyler/master/index.html) /
[latest](https://terrestris.github.io/geostyler/latest/index.html) /
[4.3.0](https://terrestris.github.io/geostyler/4.3.0/index.html)

Examples:
[Demo application](https://terrestris.github.io/geostyler-demo/)

[![Build Status](https://travis-ci.org/terrestris/geostyler.svg?branch=master)](https://travis-ci.org/terrestris/geostyler)
[![Greenkeeper badge](https://badges.greenkeeper.io/terrestris/geostyler.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/terrestris/geostyler/badge.svg?branch=master)](https://coveralls.io/github/terrestris/geostyler?branch=master)

## What is this all about?

The geostyler is a generic styler for geodata*.

On the one hand it provides a lot of UI Components for styling. On the other hand
it comes with an open architecture which lets you translate between style formats.

The architectural concept is to outsource the parsing of style and example data.
Therefore two exchange formats where developed:

The `GeoStyler Style` definition and the `GeoStyler Data` definition (compare below).

With these two formats there come two interfaces.
You can implement these interfaces to create a parser.
Compare the list of existing parsers below.

\* *geodata as a single dataset (layer) not a complete map appearance.*

![Architecture](./ComponentView.png)


To see the GeoStyler in action have a look at the [demo application](https://terrestris.github.io/geostyler-demo/).
It demonstrates the GeoStyler UI components as a standalone application.

Every parser works as a standalone library, too. So you can easily translate between style formats.

For example a small SLD to OpenLayers-Style parser (untested code :smile:):

```js
import SLDParser from "geostyler-sld-parser";
import OpenLayersParser from "geostyle-openlayers-parser";
const sldParser = new SLDParser();
const olParser = new OpenLayersParser();

const sldToOL = async (sld) => {
  const geostylerStyle = await sldParser.readStyle(someSld);
  const olStyle = await olParser.writeStyle(geostylerStyle);
  return olStyle;
};

export default sldToOl;
```


<!-- Code: https://github.com/terrestris/geostyler-demo -->

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
  - Shapefile (
      [github](https://github.com/terrestris/geostyler-shapefile-parser) /
      [npm](https://www.npmjs.com/package/geostyler-shapefile-parser)
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
  - Mapbox Style (
      [github](https://github.com/terrestris/geostyler-mapbox-parser) /
      [npm](https://www.npmjs.com/package/geostyler-mapbox-parser)
    )
  - QGIS Style [*.qml] (
      [github](https://github.com/terrestris/geostyler-qgis-parser) /
      [npm](https://www.npmjs.com/package/geostyler-qgis-parser)
    )

### More
  - CQL Filter (
      [github](https://github.com/terrestris/geostyler-cql-parser) /
      [npm](https://www.npmjs.com/package/geostyler-cql-parser)
    )
