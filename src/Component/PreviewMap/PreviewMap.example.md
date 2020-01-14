This demonstrates the usage of the `PreviewMap` component.

```jsx
import * as React from 'react';
import { PreviewMap } from 'geostyler';

class PreviewMapExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    }
  }

  render() {
    const {
      style
    } = this.state;

    return (
      <PreviewMap
        symbolizers={style}
      />
    );
  }
}

<PreviewMapExample />
```
