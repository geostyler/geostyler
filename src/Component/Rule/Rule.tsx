import * as React from 'react';

import { Row, Col } from 'antd';
import {
  Filter as GsFilter,
  ComparisonFilter as GsComparisonFilter,
  Rule as GsRule,
} from 'geostyler-style';
import { Data as GsData } from 'geostyler-data';

import RuleNameField from './NameField/NameField';
import ComparisonFilterUi from '../Filter/ComparisonFilter/ComparisonFilter';
import RuleRemoveButton from './RemoveButton/RemoveButton';
import ScaleDenominator from '../ScaleDenominator/ScaleDenominator';
import Fieldset from '../FieldSet/FieldSet';
import Preview from '../Symbolizer/Preview/Preview';

import './Rule.css';

// default props
interface DefaultRuleProps {
  rule: GsRule;
}
// non default props
interface RuleProps extends Partial<DefaultRuleProps> {
  keyIndex: number;
  internalDataDef: GsData | null;
  onRuleChange: ((rule: GsRule, keyIndex: number) => void);
  onRemove: ((ruleIdx: number) => void);
}
// state
interface RuleState {
  name: string;
  filter: GsFilter | undefined;
  maxScale: number | undefined;
  minScale: number | undefined;
}

/**
 * UI container representing a Rule
 */
class Rule extends React.Component<RuleProps, RuleState> {

  constructor(props: RuleProps) {
    super(props);

    if (this.props.rule) {
      this.state = {
        name: this.props.rule.name,
        filter: this.props.rule.filter ? this.props.rule.filter : undefined,
        maxScale: this.props.rule.scaleDenominator ? this.props.rule.scaleDenominator.max : undefined,
        minScale: this.props.rule.scaleDenominator ? this.props.rule.scaleDenominator.min : undefined
      };

    } else {
      this.state = {
        name: '',
        filter: undefined,
        maxScale: undefined,
        minScale: undefined
      };
    }

    this.createGsRule();
  }

  /**
   * Handles changing rule name
   */
  onNameChange = (newName: string) => {
    this.setState({name: newName}, () => {
      this.createGsRule();
    });
  }

  /**
   * Handles changing rule min. and max. scale denominators.
   */
  onScaleDenomChange = (newScaleDenom: any) => {
    this.setState({minScale: newScaleDenom.minScaleDenom, maxScale: newScaleDenom.maxScaleDenom}, () => {
      this.createGsRule();
    });
  }

  /**
   * Handles changing rule filter
   */
  onFilterChange = (changedFilter: GsComparisonFilter) => {
    this.setState({filter: changedFilter}, () => {
      this.createGsRule();
    });
  }

  /**
   * Creates a GeoStyler compliant rule object according to the UI
   * and pushes it to the passed in 'onRuleChange' function.
   */
  createGsRule = () => {
    const rule: GsRule = {
      name: this.state.name,
      scaleDenominator: {
        min: this.state.minScale,
        max: this.state.maxScale
      },
      filter: this.state.filter,
      // TODO apply symbolizer once we have a UI to create one
      symbolizer: {
        kind: 'Line',
        color: '#000000',
        width: 3
      }
    };

    this.props.onRuleChange(rule, this.props.keyIndex);
  }

  render() {
    // cast the current filter object to pass over to ComparisonFilterUi
    const cmpFilter = this.state.filter as GsComparisonFilter;
    // cast to GeoStyler compliant data model
    const gsData = this.props.internalDataDef as GsData;

    return (
      <div className="gs-rule" >

        <Row gutter={16}>

          <Col span={12}>

            <RuleNameField value={this.state.name} onChange={this.onNameChange} />

          </Col>

          <Col span={12}>

            <Fieldset title="Use Scale">
              <ScaleDenominator
                minScaleDenom={this.state.minScale}
                maxScaleDenom={this.state.maxScale}
                onChange={this.onScaleDenomChange}
              />
            </Fieldset>

          </Col>

        </Row>

        <Row gutter={16}>

          <Col span={12}>
            <Preview
              symbolizer={this.state.symbolizer}
              features={gsData.exampleFeatures}
            />
          </Col>

          <Col span={12}>

            <Fieldset title="Use Filter">
              <ComparisonFilterUi
                internalDataDef={this.props.internalDataDef}
                filter={cmpFilter}
                onFilterChange={this.onFilterChange}
              />
            </Fieldset>

          </Col>

        </Row>

        <Row>
          <Col span={24} style={{ float: 'right' }} >
            <RuleRemoveButton ruleIdx={this.props.keyIndex} onClick={this.props.onRemove} />
          </Col>
        </Row>

      </div>
    );
  }
}

export default Rule;
