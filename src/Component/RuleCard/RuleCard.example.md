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

This demonstrates the usage of the `RuleCard` component.

```jsx
import * as React from 'react';
import { RuleCard } from 'geostyler';

class RuleCardExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: {
        name: 'myRule',
        scaleDenominator: {
          min: 500,
          max: 1000
        },
        symbolizers: [{
          kind: 'Mark',
          wellKnownName: 'Circle'
        }]
      }
    }
  }

  render() {
    const {
      rule
    } = this.state;

    return (
      <div style={{height: '300px'}}>
        <RuleCard
          rule={rule}
        />
      </div>
    );
  }
}

<RuleCardExample />
```

With provided data property and filter.

```jsx
import * as React from 'react';
import { RuleCard } from 'geostyler';

class RuleCardExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: {
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
          wellKnownName: 'Circle'
        }]
      },
      data: {
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
      }
    }
  }

  render() {
    const {
      rule,
      data
    } = this.state;

    return (
      <div style={{height: '300px'}}>
        <RuleCard
          rule={rule}
          data={data}
        />
      </div>
    );
  }
}

<RuleCardExample />
```
