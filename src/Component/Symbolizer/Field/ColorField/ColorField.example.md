This demonstrates the use of ColorField.

```jsx
const React = require('react');
const { ColorField } = require('../../../../index');
require('antd/dist/antd.css');

class ColorFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#000000'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(color) {
    this.setState({
      color: color
    });
  }

  render() {
    const {
      color
    } = this.state;

    return (
      <ColorField
        color={color}
        label="Color"
        onChange={this.onChange}
      />
    );
  }
}

<ColorFieldExample />
```
