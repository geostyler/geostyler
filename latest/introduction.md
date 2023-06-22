<img src="./Geo_Styler_Logo_300_RGB.jpg" alt="GeoStyler Logo" style="max-width: 100%" />

GeoStyler is an Open Source React library that enables users to style maps with the help of a GUI.
GeoStyler works with multiple styling formats and is highly customizable.
Currently, we support [SLD](https://github.com/geostyler/geostyler-sld-parser), [OpenLayers](https://github.com/geostyler/geostyler-openlayers-parser), [Mapbox](https://github.com/geostyler/geostyler-mapbox-parser), [QGIS](https://github.com/geostyler/geostyler-qgis-parser) and [mapfiles](https://github.com/geostyler/geostyler-mapfile-parser).

For developer guide and issue tracking, please take a look at our [GitHub repo](https://github.com/geostyler/geostyler).

## Getting Started

### Installation

Install GeoStyler via [npm](https://www.npmjs.com/package/geostyler):

```bash
npm i geostyler
```

*Please be aware of the peerDependencies that come along with GeoStyler.*

Parsers for the different formats have to be installed separately, e.g. for installing the [geostyler-sld-parser](https://github.com/geostyler/geostyler-sld-parser), run

```bash
npm i geostyler-sld-parser
```

### Usage

Add `<Style />` to your application:

```jsx static
import React from 'react';
import { Style } from 'geostyler';

const App = () => {

  const onStyleChange = (geostylerStyle) => {
    console.log('New GeoStyler style ', geostylerStyle);
  };

  return (
    <Style
      onStyleChange={onStyleChange}
    />
  );
};
```

Providing a style:

```jsx static
import React, { useState } from 'react';
import { Style } from 'geostyler';

const App = () => {

  const [geostylerStyle, setGeostylerStyle] = useState({
    'name': 'Example Style',
    'rules': [
      {
        'name': 'Rule 1',
        'symbolizers': [
          {
            'kind': 'Line',
            'color': '#ff0000',
            'width': 5
          }
        ]
      }
    ]
  });

  const onStyleChange = (gsStyle) => {
    setGeostylerStyle(gsStyle);
  };

  return (
    <Style
      onStyleChange={onStyleChange}
      style={geostylerStyle}
    />
  );
};
```

Parsing output to different formats (e.g. SLD):

```jsx static
import React, { useState, useEffect } from 'react';
import { Style } from 'geostyler';
import SldStyleParser from 'geostyler-sld-parser';

const App = () => {

  const [geostylerStyle, setGeostylerStyle] = useState({
    'name': 'GeoStyler Demo',
    'rules': [
      {
        'name': 'Rule 1',
        'symbolizers': [
          {
            'kind': 'Line',
            'color': '#ff0000',
            'width': 5
          }
        ]
      }
    ]
  });

  const [sldStyle, setSldStyle] = useState();

  const onStyleChange = (gsStyle) => {
    setGeostylerStyle(gsStyle);
  };

  useEffect(() => {
    const sldParser = new SldStyleParser();
    sldParser.writeStyle(geostylerStyle)
      .then((response) => {
        if (response.errors) {
          console.log('Something went wrong');
          return;
        }
        const newSldStyle = response.output;
        setSldStyle(newSldStyle);
      });
  }, [geostylerStyle]);

  return (
    <Style
      onStyleChange={onStyleChange}
      style={geostylerStyle}
    />
  );
};
```

For more information see the [Style Component API](#/Components/Style/Style) and take a look at the other components (e.g. [CardStyle](#/Components/CardStyle/CardStyle)).
