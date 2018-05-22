import * as React from 'react';
import { Row, Col } from 'antd';
import MinScaleDenominator from './MinScaleDenominator';
import MaxScaleDenominator from './MaxScaleDenominator';

// default props
interface DefaultScaleDenominatorProps {}
// non default props
interface ScaleDenominatorProps extends Partial<DefaultScaleDenominatorProps> {
  onChange: ((newScaleDenoms: ScaleDenominatorState) => void);
}
// state
interface ScaleDenominatorState {
  minScaleDenom: number | undefined;
  maxScaleDenom: number | undefined;
}

/**
 * Cmbined UI fpr input fields for the minimum and maximum scale of a rule.
 */
class ScaleDenominator extends React.Component<ScaleDenominatorProps, ScaleDenominatorState> {

  constructor(props: ScaleDenominatorProps) {
    super(props);

    this.state = {
      minScaleDenom: undefined,
      maxScaleDenom: undefined
    };
  }

  /**
   * Reacts on changing min scale and pushes the current state to the 'onChange' function
   */
  onMinScaleDenomChange = (newMinScaleDenom: number) => {
    this.setState({minScaleDenom: newMinScaleDenom}, () => {
      this.props.onChange(this.state);
    });
  }

  /**
   * Reacts on changing max scale and pushes the current state to the 'onChange' function
   */
  onMaxScaleDenomChange = (newMaxScaleDenom: number) => {
    this.setState({maxScaleDenom: newMaxScaleDenom}, () => {
      this.props.onChange(this.state);
    });
  }

  render() {

    return (
      <div className="gs-max-scaledenominator">

        <Row gutter={16} >
          <Col span={12}>
            <MinScaleDenominator value={this.state.minScaleDenom} onChange={this.onMinScaleDenomChange} />
          </Col>
          <Col span={12}>
            <MaxScaleDenominator value={this.state.maxScaleDenom} onChange={this.onMaxScaleDenomChange} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ScaleDenominator;
