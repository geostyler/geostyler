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

This demonstrates the use of `Style`.

```jsx
import * as React from 'react';
import { Style } from 'geostyler';

import { Switch } from 'antd';

class StyleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compactLayout: false,
      style: {
        "name": "Demo Style",
        "rules": [
          {
            "name": "Rule 1",
            "symbolizers": [
              {
                "kind": "Mark",
                "wellKnownName": "circle"
              }
            ]
          }
        ]
      }
    };

    this.onStyleChange = this.onStyleChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onStyleChange(style) {
    this.setState({
      style: style
    });
  }

  onLayoutChange(compact) {
    this.setState({
      compactLayout: compact
    });
  }

  render() {
    const {
      style,
      compactLayout
    } = this.state;

    return (
      <div>
        <div>
          <span>Compact Layout </span>
          <Switch
            checked={compactLayout}
            onChange={this.onLayoutChange}
            checkedChildren="true"
            unCheckedChildren="false"
          />
        </div>
        <hr/>
        <Style
          style={style}
          onStyleChange={this.onStyleChange}
          compact={compactLayout}
        />
      </div>
    );
  }

}

<StyleExample />
```

```jsx
import * as React from 'react';
import { Style, PreviewMap } from 'geostyler';

import { Switch } from 'antd';

class StyleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compactLayout: false,
      style: {
        "name": "Demo Style",
        "rules": [
          {
            "name": "Rule 1",
            "symbolizers": [
              {
                "kind": "Mark",
                "wellKnownName": "circle",
                "color": {
                  "type": "literal",
                  "value": "#ffff00"
                }
              }
            ]
          }
        ]
      }
    };

    this.onStyleChange = this.onStyleChange.bind(this);
  }

  onStyleChange(style) {
    this.setState({
      style: style
    });
  }

  render() {
    const {
      style,
      compactLayout
    } = this.state;

    return (
      <div>
        <Style
          style={style}
          onStyleChange={this.onStyleChange}
          compact={true}
        />
        <PreviewMap
          style={style}
        />
      </div>
    );
  }

}

<StyleExample />
```

Style with a connected preview window and data.

```jsx
import * as React from 'react';
import { Style, PreviewMap } from 'geostyler';

import { Switch } from 'antd';

class StyleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compactLayout: false,
      style: {
        "name": "Demo Style",
        "rules": [
          {
            "name": "Rule 1",
            "symbolizers": [
              {
                "kind": "Mark",
                "wellKnownName": "circle",
                "color": {
                  "type": "functioncall",
                  "name": "Categorize",
                  "args": [
                    {"type": "literal", "value": "3"}, {"type": "literal", "value": "#0000ff"},
                    {"type": "literal", "value": "1"}, {"type": "literal", "value": "#ffff00"},
                    {"type": "literal", "value": "10"}, {"type": "literal", "value": "#ff0000"}
                  ]
                }
              }
            ]
          }
        ]
      }
    };

    this.onStyleChange = this.onStyleChange.bind(this);
  }

  onStyleChange(style) {
    this.setState({
      style: style
    });
  }

  render() {
    const {
      style,
      compactLayout
    } = this.state;

    return (
      <div>
        <Style
          style={style}
          onStyleChange={this.onStyleChange}
          compact={true}
        />
        <PreviewMap
          style={style}
        />
      </div>
    );
  }

}

<StyleExample />
```
