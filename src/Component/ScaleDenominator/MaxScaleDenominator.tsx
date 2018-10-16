import * as React from 'react';
import { InputNumber, Form } from 'antd';

import './MaxScaleDenominator.css';

// default props
interface DefaultScaleDenominatorProps {
  label: string;
  placeholder: string;
}
// non default props
interface ScaleDenominatorProps extends Partial<DefaultScaleDenominatorProps> {
  value: number;
  onChange: ((newMinScale: number) => void);
}

/**
 * Input field for the maximum scale of a rule.
 */
class MaxScaleDenominator extends React.Component<ScaleDenominatorProps, any> {

  public static defaultProps: DefaultScaleDenominatorProps = {
    label: 'Max. Scale',
    placeholder: 'Enter max. Scale (Optional)'
  };

  render() {

    return (
      <Form.Item className="gs-max-scaledenominator" label={this.props.label} colon={false} >

        <InputNumber
          className="gs-max-scaledenominator-input"
          value={this.props.value}
          min={0}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />

      </Form.Item>
    );
  }
}

export default MaxScaleDenominator;
