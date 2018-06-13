import * as React from 'react';
import { InputNumber, Form } from 'antd';
import { Data } from 'geostyler-data';

// default props
interface DefaultNumberFilterFieldProps {
  label: string;
  placeholder: string;
  value: number | undefined;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  help?: React.ReactNode;
}
// non default props
interface NumberFilterFieldProps extends Partial<DefaultNumberFilterFieldProps> {
  internalDataDef: Data;
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
    value: undefined,
    validateStatus: 'success',
    help: 'Please enter a number.'
  };

  constructor(props: NumberFilterFieldProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  static getDerivedStateFromProps(
      nextProps: NumberFilterFieldProps,
      prevState: NumberFilterFieldState): Partial<NumberFilterFieldState> {
    return {
      value: nextProps.value
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
    const {
      validateStatus,
      help,
      placeholder
    } = this.props;

    const helpTxt = validateStatus !== 'success' ? help : null;

    return (
      <div className="gs-text-filter-fld">
        <Form.Item
          label={this.props.label}
          colon={false}
          validateStatus={this.props.validateStatus}
          help={helpTxt}
          hasFeedback={true}
        >
          <InputNumber
            defaultValue={this.state.value}
            value={this.state.value}
            style={{
              width: '100%'
            }}
            onChange={this.onChange}
            placeholder={placeholder}
          />
        </Form.Item>
      </div>
    );
  }
}

export default NumberFilterField;
