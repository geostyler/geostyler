This demonstrates the use of `LineJoinField`.

```jsx
const React = require('react');
const { LineJoinField } = require('../../../../index');
require('antd/dist/antd.css');

class LineJoinFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      join: 'bevel'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(join) {
    this.setState({
      join: join
    });
  }

  render() {
    const {
      join
    } = this.state;

    return (
      <LineJoinField
        join={join}
        joinOptions={['bevel', 'round', 'miter']}
        onChange={this.onChange}
      />
    );
  }
}

<LineJoinFieldExample />
```
