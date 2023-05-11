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

This demonstrates the usage of the `RuleOverview` component.

```jsx
import React, { useState } from 'react';
import { RuleOverview } from 'geostyler';

function RuleOverviewExample() {
  const [style, setStyle] = useState({
    rule: {
      name: 'myRule',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle'
      }]
    }
  });

  return (
    <div>
      <RuleOverview
        rule={style.rule}
        onRuleChange={(newRule) => {
          setStyle({rule: newRule});
        }}
      />
    </div>
  );
}

<RuleOverviewExample />
```

Rule with filter.

```jsx
import React, { useState } from 'react';
import { RuleOverview } from 'geostyler';

function RuleOverviewExample() {
  const [style, setStyle] = useState({
    rule: {
      name: 'myRule',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle'
      }],
      filter: [
        '&&',
        ['==', 'foo', 'bar'],
        ['!=', 'faz', 'baz']
      ]
    }
  });

  return (
    <div>
      <RuleOverview
        rule={style.rule}
        onRuleChange={(newRule) => {
          setStyle({rule: newRule});
        }}
      />
    </div>
  );
}

<RuleOverviewExample />
```

`RuleOverview` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { RuleOverview, GeoStylerContext } from 'geostyler';

function RuleOverviewExample() {
  const [myContext, setMyContext] = useState({
    composition: {
      Rule: {
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

  const [style, setStyle] = useState({
    rule: {
      name: 'myRule',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle'
      }]
    }
  });

  const onVisibilityChange = (visibility, prop) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition.Rule[prop].visibility = visibility;
      return newContext;
    });
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
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
        <RuleOverview
          rule={style.rule}
          onRuleChange={(newRule) => {
            setStyle({rule: newRule});
          }}
        />
      </GeoStylerContext.Provider>
    </div>
  );
}

<RuleOverviewExample />
```
