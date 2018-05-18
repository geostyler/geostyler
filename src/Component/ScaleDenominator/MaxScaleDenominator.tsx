import * as React from 'react';
import { InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

// default props
interface DefaultScaleDenominatorProps {
  label: string;
  placeholder: string;
}
// non default props
interface ScaleDenominatorProps extends Partial<DefaultScaleDenominatorProps> {
  onChange: ((newMinScale: number) => void);
}

/**
 * Input field for a textual filter value.
 */
class MaxScaleDenominator extends React.Component<ScaleDenominatorProps, any> {

  public static defaultProps: DefaultScaleDenominatorProps = {
    label: 'Max. Scale',
    placeholder: 'Enter max. Scale (Optional)'
  };

  render() {

    return (
      <div className="gs-max-scaledenominator" style={{ }} >

        <FormItem label={this.props.label} colon={false} >

          <InputNumber 
            min={0} 
            placeholder={this.props.placeholder} 
            onChange={this.props.onChange} 
            style={{ width: '100%' }} 
          />

        </FormItem>
      
      </div>
    );
  }
}

export default MaxScaleDenominator;
