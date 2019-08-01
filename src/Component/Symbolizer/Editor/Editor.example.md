This demonstrates the use of `Editor`.

```jsx
import * as React from 'react';

class EditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Mark',
        wellKnownName: 'Circle'
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
      <Editor
        symbolizer={symbolizer}
        onSymbolizerChange={this.onSymbolizerChange}
        unknownSymbolizerText="Unknown Symbolizer"
      />
    );
  }
}

<EditorExample />
```
