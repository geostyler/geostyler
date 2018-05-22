import * as React from 'react';
import { Checkbox } from 'antd';

import './FieldSet.css';

// default props
interface DefaultFieldSetProps {}
// non default props
interface FieldSetProps extends Partial<DefaultFieldSetProps> {
  title: string;
}
// state
interface FieldSetState {
  visible: boolean;
}

/**
 * Input field for a numeric filter value.
 */
class FieldSet extends React.Component<FieldSetProps, FieldSetState> {

  constructor(props: FieldSetProps) {
    super(props);

    this.state = {
      visible: true
    };
  }

  /**
   * Toggles the state according to the checkbox check state.
   */
  onCheckchange = (e: any) => {
    this.setState({visible: e.target.checked});
  }

  render() {

    const children = this.props.children;

    return (

        <fieldset className="gs-fieldset">
          <legend>
            <Checkbox checked={this.state.visible} onChange={this.onCheckchange}>{this.props.title}</Checkbox>
          </legend>
          {React.Children.map(children, (child, i) => {
            // Ignore all childs if checkbix is unchecked
            if (this.state.visible) {
              return child;
            }
            return;
          })}
        </fieldset>

    );
  }
}

export default FieldSet;
