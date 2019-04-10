This demonstrates the use of `RasterEditor`.

```jsx
const React = require('react');
const { RasterEditor } = require('../../../index');
require('antd/dist/antd.css');

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
