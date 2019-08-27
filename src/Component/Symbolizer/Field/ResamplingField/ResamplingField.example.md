This demonstrates the use of `ResamplingField`.

```jsx
import * as React from 'react';
import { ResamplingField } from 'geostyler';

class ResamplingFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resampling: 'linear'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(resampling) {
    this.setState({
      resampling: resampling
    });
  }

  render() {
    const {
      resampling
    } = this.state;

    return (
      <ResamplingField
        resampling={resampling}
        resamplingOptions={['linear', 'nearest']}
        onChange={this.onChange}
      />
    );
  }
}

<ResamplingFieldExample />
```
