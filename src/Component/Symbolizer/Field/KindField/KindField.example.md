This demonstrates the use of `KindField`.

```jsx
const React = require('react');
const { KindField } = require('../../../../index');
require('antd/dist/antd.css');

class KindFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kind: 'Mark'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(kind) {
    this.setState({
      kind: kind
    });
  }

  render() {
    const {
      kind
    } = this.state;

    return (
      <KindField
        kind={kind}
        symbolizerKinds={['Mark', 'Fill', 'Line', 'Icon', 'Text']}
        onChange={this.onChange}
      />
    );
  }
}

<KindFieldExample />
```
