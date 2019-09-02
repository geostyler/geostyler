This demonstrates the use of `RuleTable`.

```jsx
import * as React from 'react';
import { RuleTable } from 'geostyler';

class RuleTableExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {
        "name": "Demo Style",
        "rules": [
          {
            "name": "Rule 1",
            "symbolizers": [
              {
                "kind": "Mark",
                "wellKnownName": "Circle"
              }
            ]
          }
        ]
      }
    };

    this.onRulesChange = this.onRulesChange.bind(this);
  }

  onRulesChange(rules) {
    const style = JSON.parse(JSON.stringify(this.state.style));
    style.rules = rules;
    this.setState({style});
  }

  render() {
    const {
      style
    } = this.state;
    const rules = style.rules;

    return (
      <RuleTable
        rules={rules}
        onRulesChange={this.onRulesChange}
      />
    );
  }
}

<RuleTableExample />
```