import * as React from 'react';

import { Input, Form } from 'antd';
import { Data } from 'geostyler-data';

// default props
interface RegExFilterFieldDefaultProps {
  /** Label for this field */
  label: string;
  /** The default text to place into the empty field */
  placeholder: string;
  /** Initial value set to the field */
  value: string | undefined;
  /** Validation status */
  validateStatus: 'success' | 'warning' | 'error' | 'validating';
  /** Element to show a help text */
  help: React.ReactNode;
}
// non default props
export interface RegExFilterFieldProps extends Partial<RegExFilterFieldDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef: Data;
  /** Callback function for onChange */
  onChange?: (newValue: string) => void;
  /** The selected attribute name */
  selectedAttribute?: string;
}
// state
interface RegExFilterFieldState {
  value: string | undefined;
}

/**
 * Input field for a textual filter value.
 */
export class RegeExFilterField extends React.Component<RegExFilterFieldProps, RegExFilterFieldState> {

  public static defaultProps: RegExFilterFieldDefaultProps = {
    label: 'RegEx',
    placeholder: 'Enter regular expression',
    value: undefined,
    validateStatus: 'success',
    help: 'Invalid regular expression.'
  };

  constructor(props: RegExFilterFieldProps) {
    super(props);
    this.state = {
      value: props.value ? props.value.replace(/\//g, '') : undefined
    };
  }

  static getDerivedStateFromProps(
      nextProps: RegExFilterFieldProps,
      prevState: RegExFilterFieldState): Partial<RegExFilterFieldState> {
    return {
      value: nextProps.value ? nextProps.value.replace(/\//g, '') : undefined
    };
  }

  /**
   * Extracts the text value of the event object of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  onInputChange = (e: any) => {
    const {
      onChange: onValueChange
    } = this.props;
    if (onValueChange) {
        onValueChange(e.target.value);
    }
  }

  render() {
    const {
      placeholder,
      label,
      help,
      validateStatus
    } = this.props;

    const {
      value
    } = this.state;

    const helpTxt = validateStatus !== 'success' ? help : null;

    return (
      <div className="gs-regex-filter-field">
        <Form.Item
          label={label}
          colon={false}
          hasFeedback={true}
          validateStatus={validateStatus}
          help={helpTxt}
        >
          <Input
            draggable={true}
            onDragStart={(e) => e.preventDefault()}
            value={value}
            style={{ width: '100%' }}
            onChange={this.onInputChange}
            placeholder={placeholder}
          />
        </Form.Item>
      </div>
    );
  }
}

export default RegeExFilterField;
