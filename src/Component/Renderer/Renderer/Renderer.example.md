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
      wmsBaseUrl='https://ows-demo.terrestris.de/geoserver/wms?'
      layer='terrestris:bundeslaender'
    />
  );
}

<RendererExample />
```

If the passed symbolizers contain one or more geostyler functions the style of
the feature is related to the data and can not be previewed. In this case the
preview shows a placeholder symbolizer.

```jsx
import React from 'react';
import { Renderer } from 'geostyler';

function RendererExample () {

  const markSymbolizer = {
    kind: 'Mark',
    wellKnownName: 'circle',
    color: {
      name: 'property',
      args: ['color']
    },
    radius: 24,
    strokeWidth: 2
  };

  const fillSymbolizer = {
    kind: 'Fill',
    outlineColor: {
      name: 'property',
      args: ['color']
    }
  };

  const lineSymbolizer = {
    kind: 'Line',
    width: {
      name: 'property',
      args: ['width']
    }
  };

  return (
    <div>
      <div className="sample">
        MarkSymbolizer
        <Renderer
          symbolizers={[markSymbolizer]}
          hideEditButton={true}
        />
      </div>
      <div className="sample">
        FillSymbolizer
        <Renderer
          symbolizers={[fillSymbolizer]}
          hideEditButton={true}
        />
      </div>
      <div className="sample">
        LineSymbolizer
        <Renderer
          symbolizers={[lineSymbolizer]}
          hideEditButton={true}
        />
      </div>
    </div>
  );
}

<RendererExample />
```
