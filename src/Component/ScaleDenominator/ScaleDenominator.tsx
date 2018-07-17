import * as React from 'react';
import { Row, Col } from 'antd';
import MinScaleDenominator from './MinScaleDenominator';
import MaxScaleDenominator from './MaxScaleDenominator';

import {
  get as _get,
  cloneDeep as _cloneDeep
} from 'lodash';

import {
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';

// default props
interface DefaultScaleDenominatorProps {
  /** i18n */
  minScaleDenominatorLabelText?: string;
  maxScaleDenominatorLabelText?: string;
  minScaleDenominatorPlaceholderText?: string;
  maxScaleDenominatorPlaceholderText?: string;
}
// non default props
interface ScaleDenominatorProps extends Partial<DefaultScaleDenominatorProps> {
  scaleDenominator?: GsScaleDenominator;
  onChange: (scaleDenominator: GsScaleDenominator) => void;
}
// state
interface ScaleDenominatorState {
  scaleDenominator?: GsScaleDenominator;
}

/**
 * Combined UI for input fields for the minimum and maximum scale of a rule.
 */
class ScaleDenominator extends React.Component<ScaleDenominatorProps, ScaleDenominatorState> {
  constructor(props: ScaleDenominatorProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(
      nextProps: ScaleDenominatorProps,
      prevState: ScaleDenominatorState): Partial<ScaleDenominatorState> {
    return {
      scaleDenominator: nextProps.scaleDenominator
    };
  }

  /**
   * Reacts on changing min scale and pushes the current state to the 'onChange' function
   */
  onMinScaleDenomChange = (minScaleDenominator: number) => {
    let scaleDenominator = _cloneDeep(this.state.scaleDenominator);
    if (!scaleDenominator) {
      scaleDenominator = {};
    }
    scaleDenominator.min = minScaleDenominator;
    this.props.onChange(scaleDenominator);
    this.setState({scaleDenominator});
  }

  /**
   * Reacts on changing max scale and pushes the current state to the 'onChange' function
   */
  onMaxScaleDenomChange = (maxScaleDenominator: number) => {
    let scaleDenominator = _cloneDeep(this.state.scaleDenominator);
    if (!scaleDenominator) {
      scaleDenominator = {};
    }
    scaleDenominator.max = maxScaleDenominator;
    this.props.onChange(scaleDenominator);
    this.setState({scaleDenominator});
  }

  render() {
    return (
      <div className="gs-scaledenominator">
        <Row gutter={16} >
          <Col span={12} className="gs-small-col">
            <MinScaleDenominator
              value={_get(this.state, 'scaleDenominator.min')}
              onChange={this.onMinScaleDenomChange}
              label={this.props.minScaleDenominatorLabelText}
              placeholder={this.props.minScaleDenominatorPlaceholderText}
            />
          </Col>
          <Col span={12} className="gs-small-col">
            <MaxScaleDenominator
              value={_get(this.state, 'scaleDenominator.max')}
              onChange={this.onMaxScaleDenomChange}
              label={this.props.maxScaleDenominatorLabelText}
              placeholder={this.props.maxScaleDenominatorPlaceholderText}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ScaleDenominator;
