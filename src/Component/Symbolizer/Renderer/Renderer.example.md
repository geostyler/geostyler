This demonstrates the use of `Renderer`.

```jsx
const React = require('react');
const { Renderer } = require('../../../index');
require('antd/dist/antd.css');

class RendererExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: '#ff0000',
        strokeColor: '000000',
        strokeWidth: 3,
        radius: 10
      }],
      symbolizerKind: 'Mark'
    };
  }

  render() {
    const {
      symbolizers,
      symbolizerKind
    } = this.state;

    return (
      <Renderer
        symbolizers={symbolizers}
        symbolizerKind={symbolizerKind}
      />
    );
  }
}

<RendererExample />
```
