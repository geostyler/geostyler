This demonstrates the use of OffsetField.

```jsx
const React = require('react');
const { OffsetField } = require('../../../../index');
require('antd/dist/antd.css');

class OffsetFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(offset) {
    this.setState({
      offset: offset
    });
  }

  render() {
    const {
      offset
    } = this.state;

    return (
      <OffsetField
        offset={offset}
        onChange={this.onChange}
      />
    );
  }
}

<OffsetFieldExample />
```
