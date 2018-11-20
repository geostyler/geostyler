This demonstrates the use of SizeField.

```jsx
const React = require('react');
const { SizeField } = require('../../../../index');
require('antd/dist/antd.css');

class SizeFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(size) {
    this.setState({
      size: size
    });
  }

  render() {
    const {
      size
    } = this.state;

    return (
      <SizeField
        size={size}
        onChange={this.onChange}
      />
    );
  }
}

<SizeFieldExample />
```
