import * as React from 'react';
import { InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

// default props
interface DefaultNumberFilterFieldProps {
  label: string;
  placeholder: string;
  value: number | undefined;
}
// non default props
interface NumberFilterFieldProps extends Partial<DefaultNumberFilterFieldProps> {
  internalDataDef: any;
  onValueChange: ((newValue: number) => void);
  selectedAttribute: string;
}
// state
interface NumberFilterFieldState {
  value: number | undefined;
}

/**
 * Input field for a numeric filter value.
 */
class NumberFilterField extends React.Component<NumberFilterFieldProps, NumberFilterFieldState> {

  public static defaultProps: DefaultNumberFilterFieldProps = {
    label: 'Value',
    placeholder: 'Enter Numeric Value',
    value: undefined
  };

  constructor(props: NumberFilterFieldProps) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  /**
   * Stores the new value to the state object and
   * passes it to the passed in 'onValueChange' handler.
   */
  onChange = (e: number) => {
    this.setState({value: e});

    this.props.onValueChange(e);
  }

  render() {

    // detect min and max value for the selected attribute
    const attrDefs = this.props.internalDataDef.schema.properties;
    const minVal = attrDefs[this.props.selectedAttribute].minimum;
    const maxVal = attrDefs[this.props.selectedAttribute].maximum;

    return (
      <div className="gs-text-filter-fld">

        <FormItem label={this.props.label} colon={false} >

          <InputNumber
            value={this.state.value}
            style={{ width: '100%' }}
            min={minVal}
            max={maxVal}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
          />

        </FormItem>

      </div>
    );
  }
}

export default NumberFilterField;
