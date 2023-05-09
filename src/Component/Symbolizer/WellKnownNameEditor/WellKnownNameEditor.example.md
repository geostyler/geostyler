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

This demonstrates the use of `WellKnownNameEditor`.

```jsx
import * as React from 'react';
import { WellKnownNameEditor } from 'geostyler';

class WellKnownNameEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Mark',
        wellKnownName: 'circle'
      }
    };

    this.onSymbolizerChange = this.onSymbolizerChange.bind(this);
  }

  onSymbolizerChange(symbolizer) {
    this.setState({
      symbolizer: symbolizer
    });
  }

  render() {
    const {
      symbolizer
    } = this.state;

    return (
      <WellKnownNameEditor
        symbolizer={symbolizer}
        onSymbolizerChange={this.onSymbolizerChange}
      />
    );
  }
}

<WellKnownNameEditorExample />
```

This demonstrates the usage of `WellKnownNameEditor` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { WellKnownNameEditor, GeoStylerContext } from 'geostyler';

function WellKnownNameEditorExample () {

  const [myContext, setMyContext] = useState({
    composition: {
      WellKnownNameEditor: {
        radiusField: {
          visibility: true
        },
        offsetXField: {
          visibility: true
        },
        offsetYField: {
          visibility: true
        },
        fillColorField: {
          visibility: true
        },
        opacityField: {
          visibility: true
        },
        fillOpacityField: {
          visibility: true
        },
        strokeColorField: {
          visibility: true
        },
        strokeWidthField: {
          visibility: true
        },
        strokeOpacityField: {
          visibility: true
        },
        rotateField: {
          visibility: true
        }
      }
    }
  });

  const [symbolizer, setSymbolizer] = useState({
    kind: 'Mark',
    wellKnownName: 'circle'
  });

  const onSymbolizerChange = (s) => {
    setSymbolizer(s);
  };

  const onVisibilityChange = (visibility, prop) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition.WellKnownNameEditor[prop].visibility = visibility;
      return newContext;
    });
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.WellKnownNameEditor.radiusField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'radiusField')}}
          checkedChildren="Radius"
          unCheckedChildren="Radius"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.offsetXField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'offsetXField')}}
          checkedChildren="Offset X"
          unCheckedChildren="Offset X"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.offsetYField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'offsetYField')}}
          checkedChildren="Offset Y"
          unCheckedChildren="Offset Y"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.fillColorField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'fillColorField')}}
          checkedChildren="Fill-Color"
          unCheckedChildren="Fill-Color"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.opacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'opacityField')}}
          checkedChildren="Opacity"
          unCheckedChildren="Opacity"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.fillOpacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'fillOpacityField')}}
          checkedChildren="Fill-Opacity"
          unCheckedChildren="Fill-Opacity"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.strokeColorField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'strokeColorField')}}
          checkedChildren="Stroke-Color"
          unCheckedChildren="Stroke-Color"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.strokeWidthField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'strokeWidthField')}}
          checkedChildren="Stroke-Width"
          unCheckedChildren="Stroke-Width"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.strokeOpacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'strokeOpacityField')}}
          checkedChildren="Stroke-Opacity"
          unCheckedChildren="Stroke-Opacity"
        />
        <Switch
          checked={myContext.composition.WellKnownNameEditor.rotateField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'rotateField')}}
          checkedChildren="Rotation"
          unCheckedChildren="Rotation"
        />
      </div>
      <hr />
      <GeoStylerContext.Provider value={myContext}>
        <WellKnownNameEditor
          symbolizer={symbolizer}
          onSymbolizerChange={onSymbolizerChange}
        />
      </GeoStylerContext.Provider>
    </div>
  );
};

<WellKnownNameEditorExample />
```
