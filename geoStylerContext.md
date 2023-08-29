The `GeoStylerContext` lets you customize (`composition`) the GeoStyler UI as well as it supports the underlying
components with the needed `data`, localization (`locale`) and `unsupportedProperties`.

1. `data`

You can provide your own geodata with the `data` property. It has to be provided as [geostyler-data](https://github.com/geostyler/geostyler-data).
You can easily parse your existing [WFS](https://github.com/geostyler/geostyler-wfs-parser), [geojson](https://github.com/geostyler/geostyler-geojson-parser) or [shapefile](https://github.com/geostyler/geostyler-shapefile-parser) with the corresponding geostyler parsers. The data can then be used for auto-completion and auto-classification within GeoStyler.

2. `locale`

The default language used in the GeoStyler UI is English. To change the labels of the components you
can use one of the existing locales exported by GeoStyler or provide your own locale by implementing
the `GeoStylerLocale` interface.

3. `composition`

The `composition` lets you customize the appearance of many components of GeoStyler. This includes
all the editors and covers most of their fields. The example below shows how to disable the `RasterEditor`
in your component. But you can also modify many of the properties of the editors. Like the visibility or
the default values for explicit field. In general, all of the components covered in the `CompositionContext`
export "composableProps". These are the props that you can adjust and modify with the `composition` prop. Check out the component documentation for each component respectively, to see what exactly can be composed.

4. `unsupportedProperties`

Here you can tell the UI to what extent the used style supports the `geostyler-style` capabilities.
Normally you want to use the `unsupportedProperties` of one of the style-parsers. However, it is also
possible to specify your own configuration here. The example just uses the [`unsupportedProperties` of
the `MapboxStyleParser`](https://github.com/geostyler/geostyler-mapbox-parser/blob/master/src/MapboxStyleParser.ts#L109).


```tsx static
/* eslint-disable no-console */
import React, { useState } from 'react';
import { GeoStylerContext, GeoStylerContextInterface, Style, locale } from 'geostyler';
import MapboxStyleParser from 'geostyler-mapbox-parser';
import { Style as GSStyle } from 'geostyler-style';
import { Data as GSData } from 'geostyler-data';

const mapBoxParser = new MapboxStyleParser();

type Props = {
  data: GSData;
};

export const MyMapBoxPrinter: React.FC<Props> = ({
  data
}) => {
  const myContext: GeoStylerContextInterface = {
    data,
    locale: locale.de_DE,
    unsupportedProperties: mapBoxParser.unsupportedProperties,
    composition: {
      Editor: {
        rasterEditor: {
          visibility: false
        }
      }
    }
  };

  const [style, setStyle] = useState<GSStyle>();

  const onStyleChange = async (newStyle: GSStyle) => {
    setStyle(newStyle);
    const { output } = await mapBoxParser.writeStyle(newStyle);
    console.log(output);
  };

  return (
    <GeoStylerContext.Provider value={myContext}>
      <Style
        style={style}
        onStyleChange={onStyleChange}
      />
    </GeoStylerContext.Provider>
  );
};
```
