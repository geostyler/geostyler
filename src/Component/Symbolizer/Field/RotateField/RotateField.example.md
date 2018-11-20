This demonstrates the use of RotateField.

```jsx
const React = require('react');
const { RotateField } = require('../../../../index');
require('antd/dist/antd.css');

class RotateFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rotate: 0
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(rotate) {
    this.setState({
      rotate: rotate
    });
  }

  render() {
    const {
      rotate
    } = this.state;

    return (
      <RotateField
        rotate={rotate}
        onChange={this.onChange}
      />
    );
  }
}

<RotateFieldExample />
```
