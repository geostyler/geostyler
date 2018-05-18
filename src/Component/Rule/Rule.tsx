import * as React from 'react';

import { Row, Col } from 'antd';
import { ComparisonFilter, Rule as GsRule } from 'geostyler-style';
import RuleNameField from './NameField/NameField';
import ComparisonFilterUi from '../Filter/ComparisonFilter/ComparisonFilter';
import RuleRemoveButton from './RemoveButton/RemoveButton';
import MinScaleDenominator from '../ScaleDenominator/MinScaleDenominator';
import MaxScaleDenominator from '../ScaleDenominator/MaxScaleDenominator';

// default props
interface DefaultRuleProps {}
// non default props
interface RuleProps extends Partial<DefaultRuleProps> {
  keyIndex: number;
  internalDataDef: any;
  // onFilterChange: ((compFilter: ComparisonFilter) => void);
  onRuleChange: ((rule: GsRule, keyIndex: number) => void);
}

/**
 * UI container representing a Rule
 */
class Rule extends React.Component<RuleProps, any> {

  /** */
  name: string;

  /** */
  filter: ComparisonFilter;

  /** */
  maxScale: number;

  /** */
  minScale: number;

  /**
   * Handles changing rule name
   */
  onNameChange = (newName: string) => {
    this.name = newName;

    this.createGsRule();
  }

  /**
   * Handles changing rule min. scale
   */
  onMinScaleChange = (newMinScale: number) => {
    this.minScale = newMinScale;

    this.createGsRule();
  }

  /**
   * Handles changing rule max. scale
   */
  onMaxScaleChange = (newMaxScale: number) => {
    this.maxScale = newMaxScale;

    this.createGsRule();
  }

  /**
   * Handles changing rule filter
   */
  onFilterChange = (changedFilter: ComparisonFilter) => {
    this.filter = changedFilter;

    this.createGsRule();
  }

  /**
   * 
   */
  createGsRule = () => {
    const rule: GsRule = {
      name: this.name,
      scaleDenominator: {
        min: this.minScale,
        max: this.maxScale
      },
      // TODO apply filter object
      // filter: {}
      // TODO apply symbolizer once we have a UI to create one
      symbolizer: {
        kind: 'Line',
        color: '#000000',
        width: 3
      }
    };

    this.props.onRuleChange(rule, this.props.keyIndex);
  }

  /**
   * 
   */
  remove = () => {
    // console.log('REMOVE ME!');
    // TODO implement remove logic for a Rule
  }

  render() {

    return (
      <div className="gs-rule" style={{ border: '1px solid lightgrey', padding: 10, margin: 10}} >

        <Row gutter={16}>

          <Col span={14}>

            <RuleNameField onChange={this.onNameChange} />

          </Col>

          <Col span={5}>

            <MinScaleDenominator onChange={this.onMinScaleChange} /> 

          </Col>

          <Col span={5}>

            <MaxScaleDenominator onChange={this.onMaxScaleChange} /> 

          </Col>

        </Row>

        <Row gutter={16}>

          <Col span={12}>

            <div style={{margin: 10}}>
              <img src="http://fillmurray.com/120/120" />
            </div>

          </Col>

          <Col span={12}>

            <ComparisonFilterUi 
              internalDataDef={this.props.internalDataDef} 
              onFilterChange={this.onFilterChange}
            />

          </Col>

        </Row>

        <Row>
          <Col span={24} style={{ float: 'right' }} >
            <RuleRemoveButton onClick={this.remove} />
          </Col>
        </Row>  

      </div>
    );
  }
}

export default Rule;
