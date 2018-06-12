import * as React from 'react';

import { Checkbox, Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import { Data } from 'geostyler-data';

// default props
interface DefaultBoolFilterFieldProps {
  label: string;
  value: boolean;
}
// non default props
interface BoolFilterFieldProps extends Partial<DefaultBoolFilterFieldProps> {
  internalDataDef: Data;
  onValueChange: ((newValue: boolean) => void);
}
// state
interface BoolFilterFieldState {
  value: boolean;
}

/**
 * Checkbox field for a boolean filter value.
 */
class BoolFilterField extends React.Component<BoolFilterFieldProps, BoolFilterFieldState> {

  public static defaultProps: DefaultBoolFilterFieldProps = {
    label: 'Value',
    value: false
  };

  constructor(props: BoolFilterFieldProps) {
    super(props);
    this.state = {
      value: this.props.value ? true : false
    };
  }

  static getDerivedStateFromProps(
      nextProps: BoolFilterFieldProps,
      prevState: BoolFilterFieldState): Partial<BoolFilterFieldState> {
    return {
      value: nextProps.value
    };
  }

  /**
   * Extracts the boolean value out of the CheckboxChangeEvent of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  onChange = (e: CheckboxChangeEvent) => {
    this.props.onValueChange(e.target.checked);

    this.setState({value: e.target.checked});
  }

  render() {

    return (
      <div className="gs-text-filter-fld">

        <Form.Item label={this.props.label} colon={false} >

          <Checkbox
            checked={this.state.value}
            onChange={this.onChange}
          />

        </Form.Item>

      </div>
    );
  }
}

export default BoolFilterField;
