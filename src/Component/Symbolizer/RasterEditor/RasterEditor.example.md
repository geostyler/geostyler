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

This demonstrates the use of `RasterEditor`.

```jsx
import * as React from 'react';
import { RasterEditor } from 'geostyler';

class RasterEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Raster'
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
      <RasterEditor
        symbolizer={symbolizer}
        onSymbolizerChange={this.onSymbolizerChange}
      />
    );
  }
}

<RasterEditorExample />
```

This demonstrates the usage of `RasterEditor` with `GeoStylerContext`.

```jsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { RasterEditor, GeoStylerContext } from 'geostyler';

function RasterEditorExample () {

  const [myContext, setMyContext] = useState({
    composition: {
      RasterEditor: {
        opacityField: {
          visibility: true
        },
        contrastEnhancementField: {
          visibility: true
        },
        gammaValueField: {
          visibility: true
        },
      },
      ColorMapEditor: {
        visibility: true
      },
      RasterChannelEditor: {
        visibility: true,
        channelSelectionField: {
          visibility: true
        },
        sourceChannelNameField: {
          visibility: true
        },
        contrastEnhancementField: {
          visibility: true
        },
        gammaValueField: {
          visibility: true
        }
      }
    }
  });

  const [symbolizer, setSymbolizer] = useState({
    kind: 'Raster'
  });

  const onSymbolizerChange = (s) => {
    setSymbolizer(s);
  };

  const onVisibilityChange = (visibility, editor, prop) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition[editor][prop].visibility = visibility;
      return newContext;
    });
  };

  const onEditorVisibilityChange = (visibility, editor) => {
    setMyContext(oldContext => {
      const newContext = {...oldContext};
      newContext.composition[editor].visibility = visibility;
      return newContext;
    });
  };

  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        <Switch
          checked={myContext.composition.RasterEditor.opacityField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'RasterEditor', 'opacityField')}}
          checkedChildren="Opacity"
          unCheckedChildren="Opacity"
        />
        <Switch
          checked={myContext.composition.RasterEditor.contrastEnhancementField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'RasterEditor', 'contrastEnhancementField')}}
          checkedChildren="Contrast Enhancement"
          unCheckedChildren="Contrast Enhancement"
        />
        <Switch
          checked={myContext.composition.RasterEditor.gammaValueField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'RasterEditor', 'gammaValueField')}}
          checkedChildren="Gamma"
          unCheckedChildren="Gamma"
        />
        <Switch
          checked={myContext.composition.ColorMapEditor.visibility}
          onChange={visibility => {onEditorVisibilityChange(visibility, 'ColorMapEditor')}}
          checkedChildren="Color Map"
          unCheckedChildren="Color Map"
        />
        <Switch
          checked={myContext.composition.RasterChannelEditor.visibility}
          onChange={visibility => {onEditorVisibilityChange(visibility, 'RasterChannelEditor')}}
          checkedChildren="Channel Selection"
          unCheckedChildren="Channel Selection"
        />
        <Switch
          checked={myContext.composition.RasterChannelEditor.channelSelectionField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'RasterChannelEditor', 'channelSelectionField')}}
          checkedChildren="Edit Channels"
          unCheckedChildren="Edit Channels"
        />
        <Switch
          checked={myContext.composition.RasterChannelEditor.sourceChannelNameField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'RasterChannelEditor', 'sourceChannelNameField')}}
          checkedChildren="Channel Name"
          unCheckedChildren="Channel Name"
        />
        <Switch
          checked={myContext.composition.RasterChannelEditor.contrastEnhancementField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'RasterChannelEditor', 'contrastEnhancementField')}}
          checkedChildren="Channel Contrast Enhancement"
          unCheckedChildren="Channel Contrast Enhancement"
        />
        <Switch
          checked={myContext.composition.RasterChannelEditor.gammaValueField.visibility}
          onChange={visibility => {onVisibilityChange(visibility, 'RasterChannelEditor', 'gammaValueField')}}
          checkedChildren="Channel Gamma"
          unCheckedChildren="Channel Gamma"
        />
      </div>
      <hr />
      <GeoStylerContext.Provider value={myContext}>
        <RasterEditor
          symbolizer={symbolizer}
          onSymbolizerChange={onSymbolizerChange}
        />
      </GeoStylerContext.Provider>
    </div>
  );
};

<RasterEditorExample />
```
