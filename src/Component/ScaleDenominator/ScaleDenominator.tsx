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
import en_US from '../../locale/en_US';

// i18n
export interface ScaleDenominatorLocale {
  minScaleDenominatorLabelText?: string;
  maxScaleDenominatorLabelText?: string;
  minScaleDenominatorPlaceholderText?: string;
  maxScaleDenominatorPlaceholderText?: string;
}

interface ScaleDenominatorDefaultProps {
  locale?: ScaleDenominatorLocale;
}

// non default props
export interface ScaleDenominatorProps extends Partial<ScaleDenominatorDefaultProps> {
  scaleDenominator?: GsScaleDenominator;
  onChange?: (scaleDenominator: GsScaleDenominator) => void;
}

/**
 * Combined UI for input fields for the minimum and maximum scale of a rule.
 */
export class ScaleDenominator extends React.Component<ScaleDenominatorProps> {

  public static defaultProps: ScaleDenominatorDefaultProps = {
    locale: en_US.GsScaleDenominator
  };

  static componentName: string = 'ScaleDenominator';

  /**
   * Reacts on changing min scale and pushes the updated scaleDenominator to the 'onChange' function
   */
  onMinScaleDenomChange = (minScaleDenominator: number) => {
    const {
      onChange
    } = this.props;
    let scaleDenominator = _cloneDeep(this.props.scaleDenominator);
    if (!scaleDenominator) {
      scaleDenominator = {};
    }
    scaleDenominator.min = minScaleDenominator;
    if (onChange) {
      onChange(scaleDenominator);
    }
  }

  /**
   * Reacts on changing max scale and pushes the updated scaleDenominator to the 'onChange' function
   */
  onMaxScaleDenomChange = (maxScaleDenominator: number) => {
    const {
      onChange
    } = this.props;
    let scaleDenominator = _cloneDeep(this.props.scaleDenominator);
    if (!scaleDenominator) {
      scaleDenominator = {};
    }
    scaleDenominator.max = maxScaleDenominator;
    if (onChange) {
      onChange(scaleDenominator);
    }
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
              value={_get(this.props, 'scaleDenominator.min')}
              onChange={this.onMinScaleDenomChange}
              label={locale.minScaleDenominatorLabelText}
              placeholder={locale.minScaleDenominatorPlaceholderText}
            />
          </Col>
          <Col span={12} className="gs-small-col">
            <MaxScaleDenominator
              value={_get(this.props, 'scaleDenominator.max')}
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

export default localize(ScaleDenominator, ScaleDenominator.componentName);
