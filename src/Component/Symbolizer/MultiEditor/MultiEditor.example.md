This demonstrates the use of MultiEditor.

```jsx
const React = require('react');
const { MultiEditor } = require('../../../index');
require('antd/dist/antd.css');

class MultiEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizers: [{
        kind: 'Fill'
      }, {
        kind: 'Line'
      }]
    };

    this.onSymbolizersChange = this.onSymbolizersChange.bind(this);
  }

  onSymbolizersChange(symbolizers) {
    this.setState({
      symbolizers: symbolizers
    });
  }

  render() {
    const {
      symbolizers
    } = this.state;

    return (
      <MultiEditor
        symbolizers={symbolizers}
        onSymbolizersChange={this.onSymbolizersChange}
      />
    );
  }
}

<MultiEditorExample />
```
