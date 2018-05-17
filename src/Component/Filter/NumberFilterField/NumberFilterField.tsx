import * as React from 'react';
import { InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

// default props
interface DefaultNumberFilterFieldProps {
  label: string;
  placeholder: string;
}
// non default props
interface NumberFilterFieldProps extends Partial<DefaultNumberFilterFieldProps> {
  internalDataDef: any;
  onValueChange: ((newValue: string) => void);
}

/**
 * Input field for a numeric filter value.
 */
class NumberFilterField extends React.Component<NumberFilterFieldProps, any> {

  public static defaultProps: DefaultNumberFilterFieldProps = {
    label: 'Value',
    placeholder: 'Enter Numeric Value',
  };

  render() {

    return (
      <div className="gs-text-filter-fld">

        <FormItem label={this.props.label} colon={false} labelCol={{span: 2, offset: 0}}>

          <InputNumber
            style={{ width: '100%' }}
            min={1}
            max={10}
            onChange={this.props.onValueChange}
            placeholder={this.props.placeholder}
          />

        </FormItem>

      </div>
    );
  }
}

export default NumberFilterField;
