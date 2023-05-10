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

This demonstrates the usage of the `RuleCard` component.

```jsx
import React from 'react';
import { RuleCard } from 'geostyler';

function RuleCardExample() {
  const rule = {
    name: 'myRule',
    scaleDenominator: {
      min: 500,
      max: 1000
    },
    symbolizers: [{
      kind: 'Mark',
      wellKnownName: 'circle'
    }]
  };

  return (
    <div style={{height: '300px'}}>
      <RuleCard
        rule={rule}
      />
    </div>
  );
}

<RuleCardExample />
```

With provided data property and filter.

```jsx
import * as React from 'react';
import { RuleCard } from 'geostyler';

function RuleCardExample() {
  const rule = {
    name: 'myRule',
    scaleDenominator: {
      min: 500,
      max: 1000
    },
    filter: [
      '==',
      'foo',
      '2'
    ],
    symbolizers: [{
      kind: 'Mark',
      wellKnownName: 'circle'
    }]
  };
  const data = {
    exampleFeatures: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            foo: '1'
          },
          geometry: {
            type: 'Point',
            coordinates: [7, 50]
          }
        },
        {
          type: 'Feature',
          properties: {
            foo: '2'
          },
          geometry: {
            type: 'Point',
            coordinates: [6, 50]
          }
        }
      ]
    }
  };

  return (
    <div style={{height: '300px'}}>
      <RuleCard
        rule={rule}
        data={data}
      />
    </div>
  );
}

<RuleCardExample />
```

`RuleCard` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { RuleCard, GeoStylerContext } from 'geostyler';

function RuleCardExample() {

  const [myContext, setMyContext] = useState({
    composition: {
      Rule: {
        amount: {
          visibility: true
        },
        duplicate: {
          visibility: true
        },
        filter: {
          visibility: true
        },
        name: {
          visibility: true
        },
        minScale: {
          visibility: true
        },
        maxScale: {
          visibility: true
        }
      }
    }
  });

  const rule = {
    name: 'myRule',
    scaleDenominator: {
      min: 500,
      max: 1000
    },
    filter: [
      '==',
      'foo',
      '2'
    ],
    symbolizers: [{
      kind: 'Mark',
      wellKnownName: 'circle'
    }]
  };

  const data = {
    exampleFeatures: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            foo: '1'
          },
          geometry: {
            type: 'Point',
            coordinates: [7, 50]
          }
        },
        {
          type: 'Feature',
          properties: {
            foo: '2'
          },
          geometry: {
            type: 'Point',
            coordinates: [6, 50]
          }
        }
      ]
    }
  };

  const onVisibilityChange = (visibility, prop) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition.Rule[prop].visibility = visibility;
      return newContext;
    });
  };

  return (
    <div style={{height: '300px'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.Rule.amount.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'amount')}}
          checkedChildren="Amount"
          unCheckedChildren="Amount"
        />
        <Switch
          checked={myContext.composition.Rule.duplicate.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'duplicate')}}
          checkedChildren="Duplicate"
          unCheckedChildren="Duplicate"
        />
        <Switch
          checked={myContext.composition.Rule.filter.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'filter')}}
          checkedChildren="Filters"
          unCheckedChildren="Filters"
        />
        <Switch
          checked={myContext.composition.Rule.name.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'name')}}
          checkedChildren="Name"
          unCheckedChildren="Name"
        />
        <Switch
          checked={myContext.composition.Rule.minScale.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'minScale')}}
          checkedChildren="Min. Scale"
          unCheckedChildren="Min. Scale"
        />
        <Switch
          checked={myContext.composition.Rule.maxScale.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'maxScale')}}
          checkedChildren="Max. Scale"
          unCheckedChildren="Max. Scale"
        />
      </div>
      <hr />
      <GeoStylerContext.Provider value={myContext}>
        <RuleCard
          rule={rule}
          data={data}
        />
      </GeoStylerContext.Provider>
    </div>
  );
}

<RuleCardExample />
```
