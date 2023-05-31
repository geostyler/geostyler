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

This demonstrates the use of `FillEditor`.

```jsx
import * as React from 'react';
import { FillEditor } from 'geostyler';

class FillEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Fill'
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
      <FillEditor
        symbolizer={symbolizer}
        onSymbolizerChange={this.onSymbolizerChange}
      />
    );
  }
}

<FillEditorExample />
```

This demonstrates the usage of `FillEditor` with the `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { FillEditor, GeoStylerContext } from 'geostyler';

function FillEditorExample () {

  const [myContext, setMyContext] = useState({
    composition: {
      FillEditor: {
        fillColorField: {
          visibility: true
        },
        fillOpacityField: {
          visibility: true
        },
        opacityField: {
          visibility: true
        },
        outlineOpacityField: {
          visibility: true
        },
        outlineColorField: {
          visibility: true
        },
        outlineWidthField: {
          visibility: true
        },
        outlineDasharrayField: {
          visibility: true
        }
      }
    }
  });

  const [symbolizer, setSymbolizer] = useState({
    kind: 'Fill'
  });

  const onSymbolizerChange = (s) => {
    setSymbolizer(s);
  };

  const onVisibilityChange = (visibility, prop) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition.FillEditor[prop].visibility = visibility;
      return newContext;
    });
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.FillEditor.fillColorField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'fillColorField')}}
          checkedChildren="Fill-Color"
          unCheckedChildren="Fill-Color"
        />
        <Switch
          checked={myContext.composition.FillEditor.fillOpacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'fillOpacityField')}}
          checkedChildren="Fill-Opacity"
          unCheckedChildren="Fill-Opacity"
        />
        <Switch
          checked={myContext.composition.FillEditor.opacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'opacityField')}}
          checkedChildren="Opacity"
          unCheckedChildren="Opacity"
        />
        <Switch
          checked={myContext.composition.FillEditor.outlineOpacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'outlineOpacityField')}}
          checkedChildren="Outline-Opacity"
          unCheckedChildren="Outline-Opacity"
        />
        <Switch
          checked={myContext.composition.FillEditor.outlineColorField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'outlineColorField')}}
          checkedChildren="Outline-Color"
          unCheckedChildren="Outline-Color"
        />
        <Switch
          checked={myContext.composition.FillEditor.outlineWidthField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'outlineWidthField')}}
          checkedChildren="Outline-Width"
          unCheckedChildren="Outline-Width"
        />
        <Switch
          checked={myContext.composition.FillEditor.outlineDasharrayField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'outlineDasharrayField')}}
          checkedChildren="Outline-Dasharray"
          unCheckedChildren="Outline-Dasharray"
        />
      </div>
      <hr />
      <GeoStylerContext.Provider value={myContext}>
        <FillEditor
          symbolizer={symbolizer}
          onSymbolizerChange={onSymbolizerChange}
        />
      </GeoStylerContext.Provider>
    </div>
  );
};

<FillEditorExample />
```
