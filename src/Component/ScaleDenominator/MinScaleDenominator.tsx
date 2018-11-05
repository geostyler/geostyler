import * as React from 'react';
import { InputNumber, Form } from 'antd';

import './MinScaleDenominator.css';

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
 * Input field for the minimum scale of a rule.
 */
class MinScaleDenominator extends React.PureComponent<ScaleDenominatorProps> {

  public static defaultProps: DefaultScaleDenominatorProps = {
    label: 'Min. Scale',
    placeholder: 'Enter min. Scale (Optional)'
  };

  render() {

    return (
        <Form.Item className="gs-min-scaledenominator" label={this.props.label} colon={false} >

          <InputNumber
            className="gs-min-scaledenominator-input"
            value={this.props.value}
            min={0}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
          />

        </Form.Item>
    );
  }
}

export default MinScaleDenominator;
