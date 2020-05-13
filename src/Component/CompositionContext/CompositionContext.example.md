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

`CompositionContext` lets you disable fields and editors and/or replace fields with custom components.

In order to compose your own editors, a CompositionContext provider has to be wrapped around the editor(s) to customize. All configurations have to be set within the object passed to the value property of CompositionContext. The corresponding interface is defined in `src/Components/CompositionContext/CompositionContext.tsx`.

#### Disable single field

Disables/Enables rotation field in IconEditor.

```jsx
import * as React from 'react';
import { CompositionContext, IconEditor } from 'geostyler';
import { Switch } from 'antd';

class CompositionContextExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Icon'
      },
      enableRotation: false
    }

    this.onSymbolizerChange = this.onSymbolizerChange.bind(this);
    this.onRotationChange = this.onRotationChange.bind(this);
  }

  onSymbolizerChange(symbolizer) {
    this.setState({
      symbolizer: symbolizer
    });
  }

  onRotationChange(enable) {
    this.setState({
      enableRotation: enable
    });
  }

  render() {
    const {
      symbolizer,
      enableRotation
    } = this.state;

    const composition = {
      IconEditor: {
        rotateField: enableRotation ? undefined : false
      }
    };

    return (
      <div>
        <span>Enable rotation field </span>
        <Switch
          checked={enableRotation}
          onChange={this.onRotationChange}
          checkedChildren="true"
          unCheckedChildren="false"
        />
        <hr/>
        <CompositionContext.Provider value={composition}>
          <IconEditor 
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        </CompositionContext.Provider>
      </div>
    );
  }
}

<CompositionContextExample />
```

#### Replace field with custom field
Replaces rotation field with custom component that limits the rotation to 90 degrees in each direction.
```jsx
import * as React from 'react';
import { CompositionContext, IconEditor } from 'geostyler';
import { Switch, InputNumber } from 'antd';

class CompositionContextExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Icon',
        rotate: 180
      },
      customRotation: false
    }

    this.onSymbolizerChange = this.onSymbolizerChange.bind(this);
    this.toggleCustomRotation = this.toggleCustomRotation.bind(this);
  }

  onSymbolizerChange(symbolizer) {
    this.setState({
      symbolizer: symbolizer
    });
  }

  toggleCustomRotation(enable) {
    this.setState({
      customRotation: enable
    });
  }

  render() {
    const {
      symbolizer,
      customRotation
    } = this.state;

    const composition = {
      IconEditor: {
        rotateField: customRotation ? (
          <InputNumber
            className="editor-field rotate-field"
            min={-90}
            max={90}
            value={symbolizer.rotate}
          />
        ) : undefined
      }
    };

    return (
      <div>
        <span>Use custom component </span>
        <Switch
          checked={customRotation}
          onChange={this.toggleCustomRotation}
          checkedChildren="true"
          unCheckedChildren="false"
        />
        <hr/>
        <CompositionContext.Provider value={composition}>
          <IconEditor 
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        </CompositionContext.Provider>
      </div>
    );
  }
}

<CompositionContextExample />
```
