This demonstrates the use of `WidthField`.

```jsx
const React = require('react');
const { WidthField } = require('../../../../index');
require('antd/dist/antd.css');

class WidthFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(width) {
    this.setState({
      width: width
    });
  }

  render() {
    const {
      width
    } = this.state;

    return (
      <WidthField
        width={width}
        onChange={this.onChange}
      />
    );
  }
}

<WidthFieldExample />
```
