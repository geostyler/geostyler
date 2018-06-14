import * as React from 'react';

import { Input, Form, AutoComplete } from 'antd';
import { Data } from 'geostyler-data';

import {
  get as _get
} from 'lodash';
import { Feature } from 'geojson';

// default props
interface DefaultTextFilterFieldProps {
  label: string;
  placeholder: string;
  value: string | undefined;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  help?: React.ReactNode;
}
// non default props
interface TextFilterFieldProps extends Partial<DefaultTextFilterFieldProps> {
  internalDataDef: Data;
  onValueChange: ((newValue: string) => void);
  selectedAttribute: string;
}
// state
interface TextFilterFieldState {
  value: string | undefined;
}

/**
 * Input field for a textual filter value.
 */
class TextFilterField extends React.Component<TextFilterFieldProps, TextFilterFieldState> {

  public static defaultProps: DefaultTextFilterFieldProps = {
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
    this.props.onValueChange(e.target.value);
    this.setState({value: e.target.value});
  }

  onAutoCompleteChange = (value: string) => {
    this.props.onValueChange(value);
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
            filterOption={(value: string , option: any) => option.key.includes(value)}
          />
          :
          <Input
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
