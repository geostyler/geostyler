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
                "wellKnownName": "Circle"
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