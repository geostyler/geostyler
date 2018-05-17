import * as React from 'react';

import { Checkbox } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

// default props
interface DefaultBoolFilterFieldProps {
  label: string;
}
// non default props
interface BoolFilterFieldProps extends Partial<DefaultBoolFilterFieldProps> {
  internalDataDef: any;
  onValueChange: ((newValue: boolean) => void);
}

/**
 * Input field for a textual filter value.
 */
class BoolFilterField extends React.Component<BoolFilterFieldProps, any> {

  public static defaultProps: DefaultBoolFilterFieldProps = {
    label: 'Value'
  };

  /**
   * Extracts the boolean value out of the CheckboxChangeEvent of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  valToBool = (e: CheckboxChangeEvent) => {
    this.props.onValueChange(e.target.checked);
  }

  render() {

    return (
      <div className="gs-text-filter-fld">

        <FormItem label={this.props.label} colon={false} >

          <Checkbox onChange={this.valToBool} />

        </FormItem>

      </div>
    );
  }
}

export default BoolFilterField;
