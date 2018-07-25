import * as React from 'react';

import {
  // Row,
  // Col,
  Button
} from 'antd';
import {
  // Filter as GsFilter,
  ComparisonFilter as GsComparisonFilter,
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  Filter as GsFilter,
  ScaleDenominator as GsScaleDenominator
} from 'geostyler-style';
import { Data as GsData } from 'geostyler-data';

import RuleNameField, { DefaultNameFieldProps } from '../NameField/NameField';
import ComparisonFilterUi, { DefaultComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
// import RuleRemoveButton from './RemoveButton/RemoveButton';
import ScaleDenominator from '../ScaleDenominator/ScaleDenominator';
import Fieldset from '../FieldSet/FieldSet';
import Preview, { DefaultPreviewProps } from '../Symbolizer/Preview/Preview';

import './Rule.css';

import { localize } from '../LocaleWrapper/LocaleWrapper';

import {
  cloneDeep as _cloneDeep
} from 'lodash';

/** i18n */
interface RuleLocale {
    removeRuleBtnText: string;
    scaleFieldSetTitle: string;
    filterFieldSetTitle: string;
    nameFieldLabel: string;
    nameFieldPlaceholder: string;
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
  previewProps?: DefaultPreviewProps;
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
}

// state
interface RuleState {
  rule: GsRule;
  symbolizerEditorVisible: boolean;
  storedFilter?: GsFilter;
  storedScaleDenominator?: GsScaleDenominator;
}

/**
 * UI container representing a Rule
 */
class Rule extends React.Component<RuleProps, RuleState> {
  constructor(props: any) {
    super(props);
    this.state = {
      rule: Rule.defaultProps.rule,
      symbolizerEditorVisible: false
    };
  }

  public static defaultProps: DefaultRuleProps = {
    rule: {
      name: 'My Style',
      symbolizer: {
        kind: 'Circle'
      }
    },
    dataProjection: 'EPSG:4326'
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
  onSymbolizerChange = (symbolizer: GsSymbolizer) => {
    const rule: GsRule = _cloneDeep(this.state.rule);
    rule.symbolizer = symbolizer;
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
    this.setState({rule});
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
    this.setState({rule});
  }

  render() {
    const {
      dataProjection,
      internalDataDef,
      onRemove,
      locale
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
        <div className="gs-rule-fields" >
          <div className="gs-rule-left-fields" >
            <RuleNameField
              value={rule.name}
              onChange={this.onNameChange}
              label={locale.nameFieldLabel}
              placeholder={locale.nameFieldPlaceholder}
            />
            <Preview
              dataProjection={dataProjection}
              symbolizer={rule.symbolizer}
              internalDataDef={gsData}
              onSymbolizerChange={this.onSymbolizerChange}
              {...this.props.previewProps}
            />
          </div>
          <div className="gs-rule-right-fields" >
            <Fieldset
              title={locale.scaleFieldSetTitle}
              onCheckChange={this.onScaleCheckChange}
            >
              <ScaleDenominator
                scaleDenominator={rule.scaleDenominator}
                onChange={this.onScaleDenominatorChange}
              />
            </Fieldset>
            <Fieldset
              title={locale.filterFieldSetTitle}
              onCheckChange={this.onFilterCheckChange}
            >
              <ComparisonFilterUi
                internalDataDef={gsData}
                filter={cmpFilter}
                onFilterChange={this.onFilterChange}
                {...this.props.filterUiProps}
                {...this.props.locale}
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

export default localize(Rule);
