This demonstrates the use of `RadiusField`.

```jsx
const React = require('react');
const { RadiusField } = require('../../../../index');
require('antd/dist/antd.css');

class RadiusFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radius: 10
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(radius) {
    this.setState({
      radius: radius
    });
  }

  render() {
    const {
      radius
    } = this.state;

    return (
      <RadiusField
        radius={radius}
        onChange={this.onChange}
      />
    );
  }
}

<RadiusFieldExample />
```
