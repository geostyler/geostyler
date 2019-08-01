This demonstrates the use of `FontPicker`.

```jsx
import * as React from 'react';
import FontPicker from './FontPicker';

class FontPickerExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      font: ['arial']
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(font) {
    this.setState({
      font: font
    });
  }

  render() {
    const {
      font
    } = this.state;

    return (
      <FontPicker
        font={font}
        fontOptions={['monospace', 'fantasy', 'serif', 'sans-serif']}
        onChange={this.onChange}
      />
    );
  }
}

<FontPickerExample />
```
