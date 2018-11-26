This demonstrates the use of `LineDashField`.

```jsx
const React = require('react');
const { LineDashField } = require('../../../../index');
require('antd/dist/antd.css');

class LineDashFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dashArray: []
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(dashArray) {
    this.setState({
      dashArray: dashArray
    });
  }

  render() {
    const {
      dashArray
    } = this.state;

    return (
      <LineDashField
        dashArray={dashArray}
        onChange={this.onChange}
      />
    );
  }
}

<LineDashFieldExample />
```
