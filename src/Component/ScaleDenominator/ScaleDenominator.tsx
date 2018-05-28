import * as React from 'react';
import { Row, Col } from 'antd';
import MinScaleDenominator from './MinScaleDenominator';
import MaxScaleDenominator from './MaxScaleDenominator';

import {
  get as _get
} from 'lodash';

import {
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';

// default props
interface DefaultScaleDenominatorProps {
}
// non default props
interface ScaleDenominatorProps extends Partial<DefaultScaleDenominatorProps> {
  scaleDenominator?: GsScaleDenominator;
  onChange: ((newScaleDenoms: ScaleDenominatorState) => void);
}
// state
interface ScaleDenominatorState {
  scaleDenominator?: GsScaleDenominator;
}

/**
 * Cmbined UI fpr input fields for the minimum and maximum scale of a rule.
 */
class ScaleDenominator extends React.Component<ScaleDenominatorProps, ScaleDenominatorState> {

  static getDerivedStateFromProps(
      nextProps: ScaleDenominatorProps,
      prevState: ScaleDenominatorState): ScaleDenominatorState {
    return {
      scaleDenominator: nextProps.scaleDenominator
    };
  }

  /**
   * Reacts on changing min scale and pushes the current state to the 'onChange' function
   */
  onMinScaleDenomChange = (minScaleDenominator: number) => {
    let scaleDenominator = this.state.scaleDenominator;
    if (!scaleDenominator) {
      scaleDenominator = {};
    }
    scaleDenominator.min = minScaleDenominator;
    this.setState({scaleDenominator});
  }

  /**
   * Reacts on changing max scale and pushes the current state to the 'onChange' function
   */
  onMaxScaleDenomChange = (maxScaleDenominator: number) => {
    let scaleDenominator = this.state.scaleDenominator;
    if (!scaleDenominator) {
      scaleDenominator = {};
    }
    scaleDenominator.max = maxScaleDenominator;
    this.setState({scaleDenominator});
  }

  render() {

    return (
      <div className="gs-max-scaledenominator">
        <Row gutter={16} >
          <Col span={12}>
            <MinScaleDenominator
              value={_get(this.state, 'scaleDenominator.min')}
              onChange={this.onMinScaleDenomChange}
            />
          </Col>
          <Col span={12}>
            <MaxScaleDenominator
              value={_get(this.state, 'scaleDenominator.max')}
              onChange={this.onMaxScaleDenomChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ScaleDenominator;
