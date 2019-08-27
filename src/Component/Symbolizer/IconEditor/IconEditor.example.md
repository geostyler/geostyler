This demonstrates the use of `IconEditor`.

```jsx
import * as React from 'react';
import { IconEditor } from 'geostyler';

class IconEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Icon'
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
      <IconEditor
        symbolizer={symbolizer}
        onSymbolizerChange={this.onSymbolizerChange}
      />
    );
  }
}

<IconEditorExample />
```
