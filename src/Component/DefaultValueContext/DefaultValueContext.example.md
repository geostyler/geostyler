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

The `DefaultValueContext` lets you define default values for many fields.

In order to provide default values for some fields, a DefaultValueContext has to be wrapped around the editor.

#### Example

Provide some default values.

```jsx
import * as React from 'react';
import { DefaultValueContext, IconEditor } from 'geostyler';
import { Switch, InputNumber } from 'antd';

class DefaultValueExample extends React.Component {

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

    const defaults = {
      IconEditor: {
        defaultOpacity: 1
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
        <DefaultValueContext.Provider value={defaults}>
          <IconEditor
            symbolizer={symbolizer}
            onSymbolizerChange={this.onSymbolizerChange}
          />
        </DefaultValueContext.Provider>
      </div>
    );
  }
}

<CompositionContextExample />
```
