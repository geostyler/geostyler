import * as React from 'react';
import { InputNumber, Form } from 'antd';

import './MinScaleDenominator.css';

// default props
interface DefaultMinScaleDenominatorProps {
  label: string;
  placeholder: string;
}
// non default props
export interface MinScaleDenominatorProps extends Partial<DefaultMinScaleDenominatorProps> {
  value?: number;
  onChange?: (newMinScale: number) => void;
}

/**
 * Input field for the minimum scale of a rule.
 */
export class MinScaleDenominator extends React.PureComponent<MinScaleDenominatorProps> {

  public static defaultProps: DefaultMinScaleDenominatorProps = {
    label: 'Min. Scale',
    placeholder: 'Enter min. Scale (Optional)'
  };

  render() {
    const {
      placeholder,
      label,
      value,
      onChange
    } = this.props;

    return (
        <Form.Item className="gs-min-scaledenominator" label={label} colon={false} >
          <InputNumber
            className="gs-min-scaledenominator-input"
            value={value}
            min={0}
            placeholder={placeholder}
            onChange={onChange}
          />
        </Form.Item>
    );
  }
}

export default MinScaleDenominator;
