import * as React from 'react';

import {
  Button
} from 'antd';
import {
  ComparisonFilter as GsComparisonFilter,
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  Filter as GsFilter,
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';
import { Data as GsData } from 'geostyler-data';

import RuleNameField, { DefaultNameFieldProps } from '../NameField/NameField';
import { DefaultComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
import ScaleDenominator from '../ScaleDenominator/ScaleDenominator';
import Fieldset from '../FieldSet/FieldSet';

import './Rule.css';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import FilterTree from '../Filter/FilterTree/FilterTree';
import Renderer from '../Symbolizer/Renderer/Renderer';
import EditorWindow from '../Symbolizer/EditorWindow/EditorWindow';

const _cloneDeep = require('lodash/cloneDeep');

// i18n
export interface RuleLocale {
    removeRuleBtnText: string;
    scaleFieldTitle: string;
    filterFieldTitle: string;
    nameFieldLabel?: string;
    nameFieldPlaceholder?: string;
    attributeLabel?: string;
    attributePlaceholderString?: string;
    attributeValidationHelpString?: string;
    operatorLabel?: string;
    operatorPlaceholderString?: string;
    operatorValidationHelpString?: string;
    valueLabel?: string;
    valuePlaceholder?: string;
    valueValidationHelpString?: string;
}

// default props
interface DefaultRuleProps {
  /** Optional Rule object holding inital values for the component */
  rule: GsRule;
  /** The data projection of example features */
  dataProjection?: string;
  filterUiProps?: DefaultComparisonFilterProps;
  ruleNameProps?: DefaultNameFieldProps;
  locale?: RuleLocale;
}

// non default props
interface RuleProps extends Partial<DefaultRuleProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef?: GsData | null;
  /** Callback for a changed Rule */
  onRuleChange?: (rule: GsRule, ruleBefore?: GsRule) => void;
  /** Callback for onClick of the RemoveButton */
  onRemove?: (rule: GsRule) => void;
  /** Callback for onClick of the AddSymbolizerButton */
  onAddSymbolizer?: (rule: GsRule) => void;
  /** Callback for onClick of the RemoveSymbolizerButton */
  onRemoveSymbolizer?: (rule: GsRule, symbolizer: GsSymbolizer, key: number) => void;
  /** Callbakc for onClick of the Renderer */
  onRendererClick?: (symbolizers: GsSymbolizer[], rule: GsRule) => void;
}

// state
interface RuleState {
  editorVisible: boolean;
  rule: GsRule;
  symbolizerEditorVisible: boolean;
  storedFilter: GsFilter;
  storedScaleDenominator: GsScaleDenominator;
  scaleFieldChecked?: boolean;
  filterFieldChecked?: boolean;
}

/**
 * UI container representing a Rule
 */
export class Rule extends React.Component<RuleProps, RuleState> {
  constructor(props: RuleProps) {
    super(props);
    this.state = {
      editorVisible: false,
      rule: Rule.defaultProps.rule,
      symbolizerEditorVisible: false,
      storedFilter: ['=='],
      storedScaleDenominator: {}
    };
  }

  static componentName: string = 'Rule';

  public static defaultProps: DefaultRuleProps = {
    rule: {
      name: 'My Style',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'Circle'
      }]
    },
    dataProjection: 'EPSG:4326'
  };

  static getDerivedStateFromProps(
      nextProps: RuleProps,
      prevState: RuleState): Partial<RuleState> {
    const rule = nextProps.rule || Rule.defaultProps.rule;

    return {
      rule,
      filterFieldChecked: rule.filter ?
        true : false,
      scaleFieldChecked: rule.scaleDenominator ?
        true : false,
      symbolizerEditorVisible: false
    };
  }

  /**
   * Handles changing rule name
   */
  onNameChange = (name: string) => {
    const rule: GsRule = _cloneDeep(this.state.rule);
    rule.name = name;
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule});
  }

  /**
   * Handles changing rule name
   */
  onScaleDenominatorChange = (scaleDenominator: any) => {
    const rule: GsRule = _cloneDeep(this.state.rule);
    rule.scaleDenominator = scaleDenominator;
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule});
  }

  /**
   * Handles changing rule filter
   */
  onFilterChange = (filter: GsComparisonFilter) => {
    const rule: GsRule = _cloneDeep(this.state.rule);
    rule.filter = filter;
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule});
  }

  /**
   * Handles changing rule symbolizer
   */
  onSymbolizersChange = (symbolizers: GsSymbolizer[]) => {
    let rule: GsRule = _cloneDeep(this.state.rule);
    rule.symbolizers = symbolizers;
    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule});
  }

  onEditPreviewButtonClicked = () => {
    this.setState({
      symbolizerEditorVisible: !this.state.symbolizerEditorVisible
    });
  }

  onScaleCheckChange = (e: any) => {
    const checked = e.target.checked;
    const rule: GsRule = _cloneDeep(this.state.rule);

    if (checked) {
      rule.scaleDenominator = this.state.storedScaleDenominator;
    } else {
      this.setState({
        storedScaleDenominator: rule.scaleDenominator
      });
      rule.scaleDenominator = undefined;
    }

    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule, scaleFieldChecked: checked});
  }

  onFilterCheckChange = (e: any) => {
    const checked = e.target.checked;
    const rule: GsRule = _cloneDeep(this.state.rule);

    if (checked) {
      rule.filter = this.state.storedFilter;
    } else {
      this.setState({
        storedFilter: rule.filter
      });
      rule.filter = undefined;
    }

    if (this.props.onRuleChange) {
      this.props.onRuleChange(rule, this.state.rule);
    }
    this.setState({rule, filterFieldChecked: checked});
  }

  render() {
    const {
      internalDataDef,
      onRemove,
      locale
    } = this.props;

    const {
      editorVisible,
      rule,
      scaleFieldChecked,
      filterFieldChecked
    } = this.state;

    // cast the current filter object to pass over to ComparisonFilterUi
    const cmpFilter = rule.filter as GsComparisonFilter;

    // cast to GeoStyler compliant data model
    const gsData = internalDataDef as GsData;

    return (
      <div className="gs-rule" >
        <div className="gs-rule-fields" >
          <div className="gs-rule-left-fields" >
            <RuleNameField
              value={rule.name}
              onChange={this.onNameChange}
              label={locale.nameFieldLabel}
              placeholder={locale.nameFieldPlaceholder}
              {...this.props.ruleNameProps}
            />
            <Renderer
              symbolizers={rule.symbolizers}
              onClick={() => {
                this.setState({
                  editorVisible: !editorVisible
                });
              }}
            />
            {
              !editorVisible ? null :
                <EditorWindow
                  onClose={() => {
                    this.setState({editorVisible: false});
                  }}
                  symbolizers={rule.symbolizers}
                  onSymbolizersChange={this.onSymbolizersChange}
                />
            }
          </div>
          <div className="gs-rule-right-fields" >
            <Fieldset
              title={locale.scaleFieldTitle}
              onCheckChange={this.onScaleCheckChange}
              checked={scaleFieldChecked}
            >
              <ScaleDenominator
                scaleDenominator={rule.scaleDenominator}
                onChange={this.onScaleDenominatorChange}
              />
            </Fieldset>
            <Fieldset
              title={locale.filterFieldTitle}
              onCheckChange={this.onFilterCheckChange}
              checked={filterFieldChecked}
            >
              <FilterTree
                internalDataDef={gsData}
                filter={cmpFilter}
                onFilterChange={this.onFilterChange}
              />
            </Fieldset>
          </div>
        </div>
        <Button
          className="gs-rule-remove-button"
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
          {locale.removeRuleBtnText}
        </Button>
      </div>
    );
  }
}

export default localize(Rule, Rule.componentName);
