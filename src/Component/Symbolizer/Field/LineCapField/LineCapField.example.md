This demonstrates the use of LineCapField.

```jsx
const React = require('react');
const { LineCapField } = require('../../../../index');
require('antd/dist/antd.css');

class LineCapFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cap: 'butt'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(cap) {
    this.setState({
      cap: cap
    });
  }

  render() {
    const {
      cap
    } = this.state;

    return (
      <LineCapField
        cap={cap}
        capOptions={['butt', 'round', 'square']}
        onChange={this.onChange}
      />
    );
  }
}

<LineCapFieldExample />
```
