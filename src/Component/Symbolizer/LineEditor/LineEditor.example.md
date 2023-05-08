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

This demonstrates the use of `LineEditor`.

```jsx
import * as React from 'react';
import { LineEditor } from 'geostyler';

class LineEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Line'
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
      <LineEditor
        symbolizer={symbolizer}
        onSymbolizerChange={this.onSymbolizerChange}
      />
    );
  }
}

<LineEditorExample />
```

This demonstrates the usage of `LineEditor` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { LineEditor, GeoStylerContext } from 'geostyler';

function LineEditorExample () {

  const [myContext, setMyContext] = useState({
    composition: {
      LineEditor: {
        colorField: {
          visibility: true
        },
        widthField: {
          visibility: true
        },
        perpendicularOffsetField: {
          visibility: true
        },
        opacityField: {
          visibility: true
        },
        lineDashField: {
          visibility: true
        },
        dashOffsetField: {
          visibility: true
        },
        capField: {
          visibility: true
        },
        joinField: {
          visibility: true
        },
      }
    }
  });

  const [symbolizer, setSymbolizer] = useState({
    kind: 'Line'
  });

  const onSymbolizerChange = (s) => {
    setSymbolizer(s);
  };

  const onVisibilityChange = (visibility, prop) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition.LineEditor[prop].visibility = visibility;
      return newContext;
    })
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.LineEditor.colorField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'colorField')}}
          checkedChildren="Color"
          unCheckedChildren="Color"
        />
        <Switch
          checked={myContext.composition.LineEditor.widthField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'widthField')}}
          checkedChildren="Width"
          unCheckedChildren="Width"
        />
        <Switch
          checked={myContext.composition.LineEditor.perpendicularOffsetField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'perpendicularOffsetField')}}
          checkedChildren="Perpendicular Offset"
          unCheckedChildren="Perpendicular Offset"
        />
        <Switch
          checked={myContext.composition.LineEditor.opacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'opacityField')}}
          checkedChildren="Opacity"
          unCheckedChildren="Opacity"
        />
        <Switch
          checked={myContext.composition.LineEditor.lineDashField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'lineDashField')}}
          checkedChildren="Dash Pattern"
          unCheckedChildren="Dash Pattern"
        />
        <Switch
          checked={myContext.composition.LineEditor.dashOffsetField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'dashOffsetField')}}
          checkedChildren="Dash Offset"
          unCheckedChildren="Dash Offset"
        />
        <Switch
          checked={myContext.composition.LineEditor.capField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'capField')}}
          checkedChildren="Cap"
          unCheckedChildren="Cap"
        />
        <Switch
          checked={myContext.composition.LineEditor.joinField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'joinField')}}
          checkedChildren="Join"
          unCheckedChildren="Join"
        />
      </div>
      <hr />
      <GeoStylerContext.Provider value={myContext}>
        <LineEditor
          symbolizer={symbolizer}
          onSymbolizerChange={onSymbolizerChange}
        />
      </GeoStylerContext.Provider>
    </div>
  );
};

<LineEditorExample />
```
