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

This demonstrates the use of `RuleTable`.

```jsx
import React, { useState } from 'react';
import { RuleTable } from 'geostyler';

function RuleTableExample() {
  const [style, setStyle] = useState({
    name: "Demo Style",
    rules: [
      {
        name: "Rule 1",
        symbolizers: [
          {
            kind: "Mark",
            wellKnownName: "circle"
          }
        ]
      }
    ]
  });

  const onRulesChange = (rules) => {
    const newStyle = JSON.parse(JSON.stringify(style));
    newStyle.rules = rules;
    setStyle(newStyle);
  };

  return (
    <RuleTable
      rules={style.rules}
      onRulesChange={onRulesChange}
    />
  );
}

<RuleTableExample />
```

This demonstrates the use of `RuleTable` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { GeoStylerContext, RuleTable } from 'geostyler';

function RuleTableExample() {
  const [myContext, setMyContext] = useState({
    composition: {
      Rule: {
        nameField: {
          visibility: true
        },
        filterField: {
          visibility: true
        },
        minScaleField: {
          visibility: true
        },
        maxScaleField: {
          visibility: true
        },
        amountField: {
          visibility: true
        },
        duplicateField: {
          visibility: true
        }
      }
    }
  });
  const [style, setStyle] = useState({
    name: "Demo Style",
    rules: [
      {
        name: "Rule 1",
        symbolizers: [
          {
            kind: "Mark",
            wellKnownName: "circle"
          }
        ]
      }
    ]
  });

  const onRulesChange = (rules) => {
    const newStyle = JSON.parse(JSON.stringify(style));
    newStyle.rules = rules;
    setStyle(newStyle);
  };

  const onVisibilityChange = (visibility, fieldName) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition.Rule[fieldName].visibility = visibility;
      return newContext;
    });
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.Rule.nameField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'nameField')}}
          checkedChildren="Name"
          unCheckedChildren="Name"
        />
        <Switch
          checked={myContext.composition.Rule.filterField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'filterField')}}
          checkedChildren="Filter"
          unCheckedChildren="Filter"
        />
        <Switch
          checked={myContext.composition.Rule.minScaleField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'minScaleField')}}
          checkedChildren="Min. Scale"
          unCheckedChildren="Min. Scale"
        />
        <Switch
          checked={myContext.composition.Rule.maxScaleField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'maxScaleField')}}
          checkedChildren="Max. Scale"
          unCheckedChildren="Max. Scale"
        />
        <Switch
          checked={myContext.composition.Rule.amountField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'amountField')}}
          checkedChildren="Amount"
          unCheckedChildren="Amount"
        />
        <Switch
          checked={myContext.composition.Rule.duplicateField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'duplicateField')}}
          checkedChildren="Duplicate"
          unCheckedChildren="Duplicate"
        />
      </div>
      <hr/>
      <GeoStylerContext.Provider value={myContext}>
        <RuleTable
          rules={style.rules}
          onRulesChange={onRulesChange}
        />
      </GeoStylerContext.Provider>
    </div>
  );
}

<RuleTableExample />
```
