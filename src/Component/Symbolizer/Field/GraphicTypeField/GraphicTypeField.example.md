This demonstrates the use of `GraphicTypeField`.

```jsx
const React = require('react');
const { GraphicTypeField } = require('../../../../index');
require('antd/dist/antd.css');

class GraphicTypeFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphicType: 'Mark'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(graphicType) {
    this.setState({
      graphicType: graphicType
    });
  }

  render() {
    const {
      graphicType
    } = this.state;

    return (
      <GraphicTypeField
        graphicType={graphicType}
        graphicTypes={['Mark', 'Icon']}
        label="GraphicType"
        clearable={true}
        onChange={this.onChange}
      />
    );
  }
}

<GraphicTypeFieldExample />
```
