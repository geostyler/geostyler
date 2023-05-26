![GeoStyler Logo](/docs/Geo_Styler_Logo_300_RGB.jpg)

[![Test, Coverage & Docs (main)](https://github.com/geostyler/geostyler/actions/workflows/on-push-main.yml/badge.svg)](https://github.com/geostyler/geostyler/actions/workflows/on-push-main.yml)
[![Create & publish versioned documentation](https://github.com/geostyler/geostyler/actions/workflows/on-publish.yml/badge.svg)](https://github.com/geostyler/geostyler/actions/workflows/on-publish.yml)
[![Coverage Status](https://coveralls.io/repos/github/geostyler/geostyler/badge.svg?branch=main)](https://coveralls.io/github/geostyler/geostyler?branch=main)
[![License](https://img.shields.io/github/license/geostyler/geostyler)](https://github.com/geostyler/geostyler/blob/main/LICENSE)

Code: [github](https://github.com/geostyler/geostyler)
Package: [npm](https://www.npmjs.com/package/geostyler)
<!-- DO NOT TOUCH next line. It will be replaced auotmaticaly via RELEASE.yml -->
Documentation: [main](https://geostyler.github.io/geostyler/main/index.html) / [latest](https://geostyler.github.io/geostyler/latest/index.html) / [11.1.1](https://geostyler.github.io/geostyler/v11.1.1/index.html)

Examples:
[Demo application](https://geostyler.github.io/geostyler-demo/)

Developer Guide:
[Developer Guide](#developer-guide)

[![Discord Banner 2](https://discordapp.com/api/guilds/1016992288028762132/widget.png?style=banner2)](https://discord.gg/yrXHDpcFcB)

## 📆 Monthly meetings

On the first tuesday of every month, there is a video meeting on the [GeoStyler Discord](https://discord.gg/yrXHDpcFcB) at 2pm CET. The meeting is for all contributors, users or other people interested in GeoStyler.

## <a name="what-is-this-all-about"></a>What is this all about?

The GeoStyler is a generic styler for geodata*.

GeoStyler provides a set of UI Components for map styling. Just like a modular building block system all components can be stacked together to create a nice UI for your web applications. To simplify the setup, we also provide some high-level components (based on our building blocks) that already do the work for you. These include among many others `Symbolizer Editors`, `RuleTables` and a fully-fledged `StyleEditor including filters and scaleDenominators`.

Furthermore, GeoStyler allows for the translation between multiple styling formats, i.e. SLD, OpenLayers, QGIS, Mapbox. Since we are following the concept of micro packages, these translators (we call them parsers) can be used as standalone libraries, without the need to include the UI components as a dependency. Just take a look at [StyleParser Implementations](#styleparser-implementations).

\* *geodata as a single dataset (layer) not a complete map appearance.*

**If you are missing any UI components, formats or even have a custom style format, feel free to open a PR. We are happy for any kind of contributions.**

To see the GeoStyler in action have a look at the [demo application](https://geostyler.github.io/geostyler-demo/).
It demonstrates the GeoStyler UI components as a standalone application.

Every parser works as a standalone library, too. So you can easily translate between style formats.

For example a small SLD to OpenLayers-Style parser (untested code :smile:):

```js static
import SLDParser from "geostyler-sld-parser";
import OpenLayersParser from "geostyle-openlayers-parser";
const sldParser = new SLDParser();
const olParser = new OpenLayersParser();

const sldToOL = async (sld) => {
  const { output: geostylerStyle } = await sldParser.readStyle(someSld);
  const { output: olStyle } = await olParser.writeStyle(geostylerStyle);
  return olStyle;
};

export default sldToOl;
```
## <a name="installation"></a>Installation

Run

```bash
npm i geostyler
```
from within your project directory to add GeoStyler as a dependency. Please be aware of the peerDependencies that come along with GeoStyler.

Components can be used as follows:
```js static
import {wanted-geostyler-compoment} from 'geostyler';

//... your component code
render() {
  return (
    <wanted-geostyler-component
      foo=""
      bar={}
    />
  );
}
```

## <a name="geostyler-behind-the-scenes"></a>GeoStyler - Behind the Scenes

Internally we are using our own style definition called `GeoStyler Style` (see [TypeScript Declaration Files](#typescript-declaration-files)), which takes the best from SLD and Mapbox. We are not trying to establish just another standard, but we need an exchange format that is flexible and highly compatible with current styling standards. **Understanding GeoStyler Style is only necessary for developers of the project, not for users!** Our style parsers all read and write from and to GeoStyler Style to keep the complexity low. As a positive side effect this lets you translate from any supported style to any other supported style.

Imagine your previous project was based on QGIS and now you want to setup your own web application. With GeoStyler you can still use your QGIS styles and either save all future formats in qml as well, or you simply translate all your old styles to another format e.g. OpenLayers styles or SLD. It's simple as that!

To populate the UI with information from imported data we provide a set of data parsers (defined in [GeoStyler Data](#typescript-declaration-files)). Currently, we support GeoJSON, Shapefile and WFS.

With these two formats there come two interfaces.
You can implement these interfaces to create a parser.
Compare the list of existing parsers below.

![Architecture](/docs/ComponentView.jpg)

<!-- Code: https://github.com/geostyler/geostyler-demo -->

## <a name="related-projects"></a>Related projects

### <a name="typescript-declaration-files"></a>TypeScript Declaration Files

  - GeoStyler Data ([github](https://github.com/geostyler/geostyler-data) /
      [npm](https://www.npmjs.com/package/geostyler-data))
  - GeoStyler Style ([github](https://github.com/geostyler/geostyler-style) /
      [npm](https://www.npmjs.com/package/geostyler-style))

### <a name="dataparser-implementations"></a>DataParser Implementations

  - GeoJSON ([github](https://github.com/geostyler/geostyler-geojson-parser) /
      [npm](https://www.npmjs.com/package/geostyler-geojson-parser))
  - Shapefile ([github](https://github.com/geostyler/geostyler-shapefile-parser) /
      [npm](https://www.npmjs.com/package/geostyler-shapefile-parser))
  - Web Feature Service (WFS) ([github](https://github.com/geostyler/geostyler-wfs-parser) /
      [npm](https://www.npmjs.com/package/geostyler-wfs-parser))

### <a name="styleparser-implementations"></a>StyleParser Implementations

  - SLD ([github](https://github.com/geostyler/geostyler-sld-parser) /
      [npm](https://www.npmjs.com/package/geostyler-sld-parser))
  - OpenLayers Style ([github](https://github.com/geostyler/geostyler-openlayers-parser) /
      [npm](https://www.npmjs.com/package/geostyler-openlayers-parser))
  - Mapbox Style ([github](https://github.com/geostyler/geostyler-mapbox-parser) /
      [npm](https://www.npmjs.com/package/geostyler-mapbox-parser))
  - MapServer Mapfiles ([github](https://github.com/geostyler/geostyler-mapfile-parser) /
      [npm](https://www.npmjs.com/package/geostyler-mapfile-parser))
  - QGIS Style [*.qml] ([github](https://github.com/geostyler/geostyler-qgis-parser) /
      [npm](https://www.npmjs.com/package/geostyler-qgis-parser))

### <a name="more"></a>More
  - CQL Filter ([github](https://github.com/geostyler/geostyler-cql-parser) /
      [npm](https://www.npmjs.com/package/geostyler-cql-parser))
  - Legend ([github](https://github.com/geostyler/geostyler-legend) /
      [npm](https://www.npmjs.com/package/geostyler-legend))
  - CLI (Command Line Interface) ([github](https://github.com/geostyler/geostyler-cli) /
      [npm](https://www.npmjs.com/package/geostyler-cli))


## <a name="developer-guide"></a>Developer Guide

For our guidelines for contributions, please take a look at [`CONTRIBUTING.md`](./CONTRIBUTING.md). Head there if you need general advice for first contributing steps (code or documentation).

More detailed information to ensure a great development experience when working on geostyler is summarized in [`DEVELOPING.md`](./DEVELOPING.md). You'll find hints with regard to developing UI components or guidance when you want to enhance (or create) parsers for style formats or data formats there.

Additionally, please read through our [code of conduct](./CODE_OF_CONDUCT.md).

We look forward to seeing you contribute soon!

## <a name="license"></a>License

GeoStyler is released under the BSD 2-Clause license. Please see the file
[`LICENSE`](https://github.com/geostyler/geostyler/blob/main/LICENSE) in the
root of this repository.

## Thanks to all contributors ❤

[![Avatars of contributors of GeoStyler](https://contrib.rocks/image?repo=geostyler/geostyler "Avatars of contributors of GeoStyler")](https://github.com/geostyler/geostyler/graphs/contributors)

## <a name="funding"></a>Funding & financial sponsorship

Maintenance and further development of this code can be funded through the
[GeoStyler Open Collective](https://opencollective.com/geostyler). All contributions and
expenses can transparently be reviewed by anyone; you see what we use the donated money for.
Thank you for any financial support you give the GeoStyler project 💞

