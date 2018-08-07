import * as React from 'react';
import { Row, Col } from 'antd';
import MinScaleDenominator from './MinScaleDenominator';
import MaxScaleDenominator from './MaxScaleDenominator';

const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');

import {
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';

import { localize } from '../LocaleWrapper/LocaleWrapper';

// i18n
export interface ScaleDenominatorLocale {
  minScaleDenominatorLabelText?: string;
  maxScaleDenominatorLabelText?: string;
  minScaleDenominatorPlaceholderText?: string;
  maxScaleDenominatorPlaceholderText?: string;
}

// non default props
interface ScaleDenominatorProps {
  scaleDenominator?: GsScaleDenominator;
  onChange: (scaleDenominator: GsScaleDenominator) => void;
  locale?: ScaleDenominatorLocale;
}
// state
interface ScaleDenominatorState {
  scaleDenominator?: GsScaleDenominator;
}

/**
 * Combined UI for input fields for the minimum and maximum scale of a rule.
 */
export class ScaleDenominator extends React.Component<ScaleDenominatorProps, ScaleDenominatorState> {
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
    const {
      locale
    } = this.props;

    return (
      <div className="gs-scaledenominator">
        <Row gutter={16} >
          <Col span={12} className="gs-small-col">
            <MinScaleDenominator
              value={_get(this.state, 'scaleDenominator.min')}
              onChange={this.onMinScaleDenomChange}
              label={locale.minScaleDenominatorLabelText}
              placeholder={locale.minScaleDenominatorPlaceholderText}
            />
          </Col>
          <Col span={12} className="gs-small-col">
            <MaxScaleDenominator
              value={_get(this.state, 'scaleDenominator.max')}
              onChange={this.onMaxScaleDenomChange}
              label={locale.maxScaleDenominatorLabelText}
              placeholder={locale.maxScaleDenominatorPlaceholderText}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default localize(ScaleDenominator);
