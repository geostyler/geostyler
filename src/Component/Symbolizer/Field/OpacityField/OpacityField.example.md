This demonstrates the use of `OpacityField`.

```jsx
const React = require('react');
const { OpacityField } = require('../../../../index');
require('antd/dist/antd.css');

class OpacityFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(opacity) {
    this.setState({
      opacity: opacity
    });
  }

  render() {
    const {
      opacity
    } = this.state;

    return (
      <OpacityField
        opacity={opacity}
        onChange={this.onChange}
      />
    );
  }
}

<OpacityFieldExample />
```
