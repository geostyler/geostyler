<!--
 * Released under the BSD 2-Clause License
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
 *
-->

This demonstrates the usage of the `PreviewMap` component.

```jsx
import React, { useState } from 'react';
import { PreviewMap } from 'geostyler';

const PreviewMapExample = () => {
  const [style, setStyle] = useState({
          name: "Demo Style",
          rules: [
            {
              name: "Rule 1",
              symbolizers: [
                {
                  kind: "Mark",
                  wellKnownName: "circle",
                  color: "red"
                }
              ]
            }
          ]
        });

  return (
    <PreviewMap
      style={style}
      dataProjection="EPSG:3857"
      data={{
        schema: {
          type: '',
          properties: {}
        },
        exampleFeatures: {
          type: 'FeatureCollection',
          name: 'geojson3857',
          features: [
            {
              type: 'Feature',
              properties: { },
              geometry: {
                type: 'Point',
                coordinates: [ 775420.044491838547401, 6610942.653629330918193 ]
              }
            },
            {
              type: 'Feature',
              properties: { },
              geometry: {
                type: 'Point',
                coordinates: [ 775451.828557928558439, 6610064.409696962684393 ]
              }
            },
            {
              type: 'Feature',
              properties: { },
              geometry: {
                type: 'Point',
                coordinates: [ 775666.209234259324148, 6609062.071335445158184 ]
              }
            }
          ]
        }
      }}
    />
  );
}

<PreviewMapExample />
```
