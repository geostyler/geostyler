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
  selectedAttribute: string;
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
    // detect min and max value for the selected attribute
    const attrDefs = this.props.internalDataDef.schema.properties;
    const minVal = attrDefs[this.props.selectedAttribute].minimum;
    const maxVal = attrDefs[this.props.selectedAttribute].maximum;

    return (
      <div className="gs-text-filter-fld">

        <FormItem label={this.props.label} colon={false} >

          <InputNumber
            style={{ width: '100%' }}
            min={minVal}
            max={maxVal}
            onChange={this.props.onValueChange}
            placeholder={this.props.placeholder}
          />

        </FormItem>

      </div>
    );
  }
}

export default NumberFilterField;
