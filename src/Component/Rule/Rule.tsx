import * as React from 'react';

import { Row, Col, Button } from 'antd';
import {
  Filter as GsFilter,
  ComparisonFilter as GsComparisonFilter,
  Rule as GsRule,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';
import { Data as GsData } from 'geostyler-data';

import RuleNameField from './NameField/NameField';
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
  name: string;
  filter: GsFilter | undefined;
  maxScale: number | undefined;
  minScale: number | undefined;
  symbolizer: GsSymbolizer;
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

  constructor(props: RuleProps) {
    super(props);

    const defaultSymb: GsSymbolizer = {
      kind: 'Circle'
    };

    if (this.props.rule) {
      this.state = {
        name: this.props.rule.name,
        filter: this.props.rule.filter ? this.props.rule.filter : undefined,
        maxScale: this.props.rule.scaleDenominator ? this.props.rule.scaleDenominator.max : undefined,
        minScale: this.props.rule.scaleDenominator ? this.props.rule.scaleDenominator.min : undefined,
        symbolizer: this.props.rule.symbolizer ? this.props.rule.symbolizer : defaultSymb,
        symbolizerEditorVisible: false
      };
    } else {
      this.state = {
        name: '',
        filter: undefined,
        maxScale: undefined,
        minScale: undefined,
        symbolizer: defaultSymb,
        symbolizerEditorVisible: false
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
   * Handles changing rule symbolizer
   */
  onSymbolizerChange = (symbolizer: GsSymbolizer) => {
    this.setState({symbolizer}, () => {
      this.createGsRule();
    });
  }

  onEditPreviewButtonClicked = () => {
    this.setState({
      symbolizerEditorVisible: !this.state.symbolizerEditorVisible
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
      symbolizer: this.state.symbolizer
    };

    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule);
    }
  }

  render() {
    const {
      internalDataDef,
      rule,
      onRemove
    } = this.props;

    const {
      filter,
      name,
      minScale,
      maxScale,
      symbolizer
    } = this.state;

    // cast the current filter object to pass over to ComparisonFilterUi
    const cmpFilter = filter as GsComparisonFilter;

    // cast to GeoStyler compliant data model
    const gsData = internalDataDef as GsData;

    return (
      <div className="gs-rule" >
        <Row gutter={16}>
          <Col span={12}>
            <RuleNameField value={name} onChange={this.onNameChange} />
          </Col>
          <Col span={12}>
            <Fieldset title="Use Scale">
              <ScaleDenominator
                minScaleDenom={minScale}
                maxScaleDenom={maxScale}
                onChange={this.onScaleDenomChange}
              />
            </Fieldset>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Preview
              symbolizer={symbolizer}
              features={gsData ? gsData.exampleFeatures : undefined}
              onSymbolizerChange={this.onSymbolizerChange}
            />
          </Col>
          <Col span={12}>
            <Fieldset title="Use Filter">
              <ComparisonFilterUi
                internalDataDef={internalDataDef}
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
              Remove Text
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Rule;
