import * as React from 'react';

import { Row, Col, Button } from 'antd';
import {
  // Filter as GsFilter,
  ComparisonFilter as GsComparisonFilter,
  Rule as GsRule,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';
import { Data as GsData } from 'geostyler-data';

import RuleNameField from '../NameField/NameField';
import ComparisonFilterUi from '../Filter/ComparisonFilter/ComparisonFilter';
// import RuleRemoveButton from './RemoveButton/RemoveButton';
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
  internalDataDef?: GsData | null;
  onRuleChange?: (rule: GsRule) => void;
  onRemove?: (rule: GsRule) => void;
}

// state
interface RuleState {
  rule: GsRule;
  symbolizerEditorVisible: boolean;
}

/**
 * UI container representing a Rule
 */
class Rule extends React.Component<RuleProps, RuleState> {

  public static defaultProps: DefaultRuleProps = {
    rule: {
      name: 'My Style',
      symbolizer: {
        kind: 'Circle'
      }
    }
  };

  static getDerivedStateFromProps(
      nextProps: RuleProps,
      prevState: RuleState): Partial<RuleState> {
    return {
      rule: nextProps.rule || Rule.defaultProps.rule,
      symbolizerEditorVisible: false
    };
  }

  /**
   * Handles changing rule name
   */
  onNameChange = (name: string) => {
    const rule = this.state.rule;
    rule.name = name;
    this.setState({rule});
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule);
    }
  }

  /**
   * Handles changing rule name
   */
  onScaleDenominatorChange = (scaleDenominator: any) => {
    const rule = this.state.rule;
    rule.scaleDenominator = scaleDenominator;
    this.setState({rule});
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule);
    }
  }

  /**
   * Handles changing rule filter
   */
  onFilterChange = (filter: GsComparisonFilter) => {
    const rule = this.state.rule;
    rule.filter = filter;
    this.setState({rule});
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule);
    }
  }

  /**
   * Handles changing rule symbolizer
   */
  onSymbolizerChange = (symbolizer: GsSymbolizer) => {
    const rule = this.state.rule;
    rule.symbolizer = symbolizer;
    this.setState({rule});
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule);
    }
  }

  onEditPreviewButtonClicked = () => {
    this.setState({
      symbolizerEditorVisible: !this.state.symbolizerEditorVisible
    });
  }

  render() {
    const {
      internalDataDef,
      onRemove
    } = this.props;

    const {
      rule
    } = this.state;

    // cast the current filter object to pass over to ComparisonFilterUi
    const cmpFilter = rule.filter as GsComparisonFilter;

    // cast to GeoStyler compliant data model
    const gsData = internalDataDef as GsData;

    return (
      <div className="gs-rule" >
        <Row gutter={16}>
          <Col span={12}>
            <RuleNameField value={rule.name} onChange={this.onNameChange} />
          </Col>
          <Col span={12}>
            <Fieldset title="Use Scale">
              <ScaleDenominator
                scaleDenominator={rule.scaleDenominator}
                onChange={this.onScaleDenominatorChange}
              />
            </Fieldset>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Preview
              symbolizer={rule.symbolizer}
              features={gsData ? gsData.exampleFeatures : undefined}
              onSymbolizerChange={this.onSymbolizerChange}
            />
          </Col>
          <Col span={12}>
            <Fieldset title="Use Filter">
              <ComparisonFilterUi
                internalDataDef={gsData}
                filter={cmpFilter}
                onFilterChange={this.onFilterChange}
              />
            </Fieldset>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ float: 'right' }} >
            <Button
              style={{}}
              type="danger"
              icon="close-circle-o"
              size="large"
              onClick={() => {
                if (onRemove && rule) {
                  onRemove(rule);
                }
              }}
            >
              Remove Rule
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Rule;
