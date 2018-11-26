import * as React from 'react';

import { Input, Form, AutoComplete } from 'antd';
import { Data } from 'geostyler-data';

const _get = require('lodash/get');
import { Feature } from 'geojson';

// default props
interface TextFilterFieldDefaultProps {
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
export interface TextFilterFieldProps extends Partial<TextFilterFieldDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef: Data;
  /** Callback function for onChange */
  onValueChange?: (newValue: string) => void;
  /** The selected attribute name */
  selectedAttribute?: string;
}
// state
interface TextFilterFieldState {
  value: string | undefined;
}

/**
 * Input field for a textual filter value.
 */
export class TextFilterField extends React.Component<TextFilterFieldProps, TextFilterFieldState> {

  public static defaultProps: TextFilterFieldDefaultProps = {
    label: 'Value',
    placeholder: 'Enter Text Value',
    value: undefined,
    validateStatus: 'success',
    help: 'Please enter a text.'
  };

  constructor(props: TextFilterFieldProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  static getDerivedStateFromProps(
      nextProps: TextFilterFieldProps,
      prevState: TextFilterFieldState): Partial<TextFilterFieldState> {
    return {
      value: nextProps.value
    };
  }

  /**
   * Extracts the text value of the event object of 'onChange'
   * and passes it to the passed in 'onValueChange' handler.
   */
  onInputChange = (e: any) => {
    const {
      onValueChange
    } = this.props;
    if (onValueChange) {
      onValueChange(e.target.value);
    }
    this.setState({value: e.target.value});
  }

  onAutoCompleteChange = (value: string) => {
    const {
      onValueChange
    } = this.props;
    if (onValueChange) {
      onValueChange(value);
    }
    this.setState({value: value});
  }

  getSampleValuesFromFeatures = (): string[] => {
    const {
      selectedAttribute,
      internalDataDef
    } = this.props;
    let sampleValues: string[] = [];
    const features = _get(internalDataDef, 'exampleFeatures.features') || [];

    features.forEach((feature: Feature) => {
      const value = _get(feature, `properties[${selectedAttribute}]`);
      if (value && sampleValues.indexOf(value) === -1) {
        sampleValues.push(value);
      }
    });
    return sampleValues.sort();
  }

  render() {
    const helpTxt = this.props.validateStatus !== 'success' ? this.props.help : null;
    const sampleValues: string[] = this.getSampleValuesFromFeatures();

    return (
      <div className="gs-text-filter-fld">
        <Form.Item
          label={this.props.label}
          colon={false}
          validateStatus={this.props.validateStatus}
          help={helpTxt}
          hasFeedback={true}
        >
        {
          sampleValues.length > 0 ?
          <AutoComplete
            value={this.state.value}
            style={{ width: '100%' }}
            onChange={this.onAutoCompleteChange}
            placeholder={this.props.placeholder}
            dataSource={sampleValues}
            filterOption={(value: string , option: any) => {
              return option.key.toLowerCase().includes(value.toLowerCase());
            }}
          />
          :
          <Input
            draggable={true}
            onDragStart={(e) => e.preventDefault()}
            value={this.state.value}
            style={{ width: '100%' }}
            onChange={this.onInputChange}
            placeholder={this.props.placeholder}
          />
        }
        </Form.Item>
      </div>
    );
  }
}

export default TextFilterField;
