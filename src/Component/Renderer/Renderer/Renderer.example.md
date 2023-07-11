<!--
 * Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

This demonstrates the usage of the `Renderer` component with 'OpenLayers' renderer.

```jsx
import React, { useState } from 'react';
import { Renderer } from 'geostyler';
import './Renderer.example.css';

function RendererExample () {

  const symbolizers = [{
    kind: 'Mark',
    wellKnownName: 'circle',
    color: '#ff0000',
    strokeColor: '000000',
    strokeWidth: 3,
    radius: 10
  }];

  return (
    <Renderer
      rendererType='OpenLayers'
      symbolizers={symbolizers}
    />
  );
}

<RendererExample />
```

This demonstrates the usage of the `Renderer` component with 'SLD' renderer.

```jsx
import React, { useState } from 'react';
import { Renderer } from 'geostyler';

function RendererExample () {

  const symbolizers = [{
    kind: 'Mark',
    wellKnownName: 'circle',
    color: '#ff0000',
    strokeColor: '000000',
    strokeWidth: 3,
    radius: 10
  }];

  return (
    <Renderer
      rendererType='SLD'
      symbolizers={symbolizers}
      hideEditButton={true}
      wmsBaseUrl='https://ows-demo.terrestris.de/geoserver/ows?'
      layer='terrestris:bundeslaender'
    />
  );
}

<RendererExample />
```

This shows a Renderer with a geostyler function. When using "property" function
it is needed to pass it via GeoStylerContext.

```jsx
import React, { useState } from 'react';
import { InputNumber } from 'antd';
import { Renderer, GeoStylerContext } from 'geostyler';

function RendererExample () {

  const [size, setSize] = useState(8);

  const symbolizers = [{
    kind: 'Mark',
    wellKnownName: 'circle',
    color: {
      name: 'property',
      args: ['color']
    },
    radius: {
      name: 'min',
      args: [{
        name: 'property',
        args: ['size']
      }, 36]
    },
    strokeWidth: {
      name: 'sqrt',
      args: [{
        name: 'property',
        args: ['size']
      }]
    }
  }];

  const ctx = {
    data: {
      exampleFeatures: {
        features: [{
          properties: {
            color: '#00ff00',
            size
          }
        }]
      }
    }
  };

  return (
    <div>
      property value of "size":
      <InputNumber
        value={size}
        min={0}
        onChange={setSize}
      />
      <GeoStylerContext.Provider value={ctx}>
        <Renderer
          symbolizers={symbolizers}
          hideEditButton={true}
        />
      </GeoStylerContext.Provider>
    </div>
  );
}

<RendererExample />
```
