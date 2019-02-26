This demonstrates the use of `LineDashField`.

```jsx
import * as React from 'react';

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
