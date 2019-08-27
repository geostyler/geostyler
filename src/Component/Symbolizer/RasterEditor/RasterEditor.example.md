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
