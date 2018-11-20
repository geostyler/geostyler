This demonstrates the use of FontPicker.

```jsx
const React = require('react');
const { FontPicker } = require('../../../../index');
require('antd/dist/antd.css');

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
        fontOptions={['arial', 'mySuperFont', 'Foo', 'Bar']}
        onChange={this.onChange}
      />
    );
  }
}

<FontPickerExample />
```
