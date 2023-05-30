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
      dataProjection="EPSG:32614"
      data={{
        schema: {
          type: '',
          properties: {}
        },
        exampleFeatures: {
          type: 'FeatureCollection',
          name: 'geojson32614',
          features: [
            {
              type: 'Feature',
              properties: { },
              geometry: {
                type: 'Point',
                coordinates: [ 785433.013395566958934, 2032298.458539120620117 ]
              }
            },
            {
              type: 'Feature',
              properties: { },
              geometry: {
                type: 'Point',
                coordinates: [ 787905.450309246662073, 2030118.025881822220981 ]
              }
            },
            {
              type: 'Feature',
              properties: { },
              geometry: {
                type: 'Point',
                coordinates: [ 786123.196085085393861, 2028597.680797176202759 ]
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
