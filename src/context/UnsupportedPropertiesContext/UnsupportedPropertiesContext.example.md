<!--
 * Released under the BSD 2-Clause License
 *
 * Copyright © 2022-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

The `UnsupportedPropertiesContext` deploys unsupported properties to underlying components.
The components themeselves will disable fields that are marked as not supported and add notes
for fields that are only partially supported.

#### Example

Provide some default values.

```jsx
import * as React from 'react';
import { UnsupportedPropertiesContext, FillEditor } from 'geostyler';
import OlStyleParser from 'geostyler-openlayers-parser';
import SldStyleParser from 'geostyler-sld-parser';
import { Checkbox, Switch, InputNumber } from 'antd';

class UnsupportedPropertiesContextExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parser: new SldStyleParser(),
      hideUnsupported: false
    }
    this.switchParser = this.switchParser.bind(this);
    this.onHideUnsupportedChange = this.onHideUnsupportedChange.bind(this);
  }

  switchParser(checked) {
    this.setState({
      parser: checked ? new SldStyleParser() : new OlStyleParser()
    });
  }

  onHideUnsupportedChange(e) {
    this.setState({
      hideUnsupported: e.target.checked
    });
  }

  render() {
    const {
      parser,
      hideUnsupported
    } = this.state;

    return (
      <div>
        <Switch
          style={{marginRight: 20}}
          checked={parser instanceof SldStyleParser}
          onChange={this.switchParser}
          checkedChildren="SLD"
          unCheckedChildren="OpenLayers"
        />
        <Checkbox
          checked={hideUnsupported}
          onChange={this.onHideUnsupportedChange}
        >
          Hide unsupported properties
        </Checkbox>
        <hr/>
        <UnsupportedPropertiesContext.Provider value={{
          unsupportedProperties: parser.unsupportedProperties,
          options: {
            hideUnsupported
          }
        }}>
          <FillEditor
            symbolizer={{
              kind: 'Fill',
              color: '#0E1058',
              fillOpacity: 0.14,
              opacity: 0.09,
              outlineOpacity: 0.06,
              outlineColor: '#194d2b',
              outlineWidth: 6
            }}
          />
        </UnsupportedPropertiesContext.Provider>
      </div>
    );
  }
}

<UnsupportedPropertiesContextExample />
```
