This demonstrates the use of `PropTextEditor`.

```jsx
import * as React from 'react';
import { PropTextEditor } from 'geostyler';

const data = {
  schema: {
    title: 'DummyData',
    type: 'object',
    properties: {
      foo: {
        type: 'number',
        minimum: 1,
        maximum: 1
      },
      bar: {
        type: 'string',
      }
    }
  },
  exampleFeatures: {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {
        foo: 1,
        bar: 'bar'
      },
      geometry: {
        type: 'Point',
        coordinates: [0, 0]
      }
    }]
  }
};

class PropTextEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizer: {
        kind: 'Text'
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
      <PropTextEditor
        symbolizer={symbolizer}
        internalDataDef={data}
        onSymbolizerChange={this.onSymbolizerChange}
      />
    );
  }
}

<PropTextEditorExample />
```
