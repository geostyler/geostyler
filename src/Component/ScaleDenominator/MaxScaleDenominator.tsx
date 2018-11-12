import * as React from 'react';
import { InputNumber, Form } from 'antd';

import './MaxScaleDenominator.css';

// default props
interface MaxScaleDenominatorDefaultProps {
  label: string;
  placeholder: string;
}
// non default props
export interface MaxScaleDenominatorProps extends Partial<MaxScaleDenominatorDefaultProps> {
  value?: number;
  onChange?: (newMinScale: number) => void;
}

/**
 * Input field for the maximum scale of a rule.
 */
export class MaxScaleDenominator extends React.PureComponent<MaxScaleDenominatorProps> {

  public static defaultProps: MaxScaleDenominatorDefaultProps = {
    label: 'Max. Scale',
    placeholder: 'Enter max. Scale (Optional)'
  };

  render() {
    const {
      placeholder,
      label,
      value,
      onChange
    } = this.props;

    return (
      <Form.Item className="gs-max-scaledenominator" label={label} colon={false} >
        <InputNumber
          className="gs-max-scaledenominator-input"
          value={value}
          min={0}
          placeholder={placeholder}
          onChange={onChange}
        />
      </Form.Item>
    );
  }
}

export default MaxScaleDenominator;
