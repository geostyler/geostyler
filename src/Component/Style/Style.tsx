import * as React from 'react';

import {
  Style as GsStyle,
  Rule as GsRule,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import {
  Data as GsData
} from 'geostyler-data';

import { Button } from 'antd';
import Rule from '../Rule/Rule';
import NameField from '../NameField/NameField';

// default props
interface DefaultStyleProps {
  style: GsStyle;
  /** i18n */
  nameFieldLabel?: string;
  nameFieldPlaceholder?: string;
  addRuleBtnText?: string;
  removeRuleBtnText?: string;
  ruleNameFieldLabelText?: string;
  ruleNameFieldPlaceholder?: string;
  previewOpenSymbolizerEditorText?: string;
  previewCloseSymbolizerEditorText?: string;
  scaleFieldSetTitle?: string;
  minScaleDenominatorLabelText?: string;
  maxScaleDenominatorLabelText?: string;
  minScaleDenominatorPlaceholderText?: string;
  maxScaleDenominatorPlaceholderText?: string;
  filterFieldSetTitle?: string;
  filterAttributeLabelText?: string;
  filterAttributePlaceholderText?: string;
  filterAttributeValidationHelpText?: string;
  filterOperatorLabelText?: string;
  filterOperatorPlaceholderText?: string;
  filterOperatorValidationHelpText?: string;
  filterValueLabelText?: string;
  filterValuePlaceholderText?: string;
  filterValueValidationHelpText?: string;
}

import {
  isEqual as _isEqual,
  cloneDeep as _cloneDeep
} from 'lodash';

// non default props
interface StyleProps extends Partial<DefaultStyleProps> {
  data?: GsData;
  onStyleChange?: (rule: GsStyle) => void;
  /** The data projection of example features */
  dataProjection?: string;
}

// state
interface StyleState {
  style: GsStyle;
}

class Style extends React.Component<StyleProps, StyleState> {
  constructor(props: StyleProps) {
    super(props);
    this.state = {
      style: props.style || Style.defaultProps.style
    };
  }

  public static defaultProps: DefaultStyleProps = {
    style: {
      name: 'My Style',
      type: 'Point',
      rules: []
    },
    addRuleBtnText: 'Add Rule'
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.style && !_isEqual(this.props.style, prevProps.style)) {
      this.setState({
        style: this.props.style
      });
    }
  }

  /**
   *
   */
  getSymbolizerFromStyleType(style: GsStyle): GsSymbolizer {
    switch (style.type) {
      case 'Point':
        return {
          kind: 'Circle'
        };
      case 'Line':
        return {
          kind: 'Line'
        };
      case 'Fill':
        return {
          kind: 'Fill'
        };
      default:
        return {
          kind: 'Circle'
        };
    }
  }

  onNameChange = (name: string) => {
    const style = _cloneDeep(this.state.style);
    style.name = name;
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  }

  onRuleChange = (rule: GsRule, ruleBefore: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const ruleIdxToReplace = style.rules.findIndex(r => {
      return _isEqual(r, ruleBefore);
    });
    if (ruleIdxToReplace > -1) {
      style.rules[ruleIdxToReplace] = rule;
      if (this.props.onStyleChange) {
        this.props.onStyleChange(style);
      }
      this.setState({style});
    }
  }

  addRule = () => {
    const style = _cloneDeep(this.state.style);
    // TODO We need to ensure that rule names are unique
    const randomId = Math.floor(Math.random() * 10000);
    const newRule: GsRule = {
      name: 'rule_' + randomId,
      symbolizer: this.getSymbolizerFromStyleType(style)
    };
    style.rules = [...style.rules, newRule];
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  }

  removeRule = (rule: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const newRules = style.rules.filter(r => r.name !== rule.name);
    style.rules = newRules;
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
    this.setState({style});
  }

  render() {
    let rules: GsRule[] = [];
    if (this.state.style) {
      rules = this.state.style.rules;
    }
    return (
      <div className="gs-style" >
        <NameField
          value={this.state.style.name}
          onChange={this.onNameChange}
          label={this.props.nameFieldLabel}
          placeholder={this.props.nameFieldPlaceholder}
        />
        {
          rules.map((rule, idx) => <Rule
            key={'rule_' + idx}
            rule={rule}
            onRemove={this.removeRule}
            internalDataDef={this.props.data}
            onRuleChange={this.onRuleChange}
            dataProjection={this.props.dataProjection}
            removeRuleBtnText={this.props.removeRuleBtnText}
            ruleNameFieldLabelText={this.props.ruleNameFieldLabelText}
            ruleNameFieldPlaceHolder={this.props.ruleNameFieldPlaceholder}
            previewOpenSymbolizerEditorText={this.props.previewOpenSymbolizerEditorText}
            previewCloseSymbolizerEditorText={this.props.previewCloseSymbolizerEditorText}
            scaleFieldSetTitle={this.props.scaleFieldSetTitle}
            minScaleDenominatorLabelText={this.props.minScaleDenominatorLabelText}
            maxScaleDenominatorLabelText={this.props.maxScaleDenominatorLabelText}
            minScaleDenominatorPlaceholderText={this.props.minScaleDenominatorPlaceholderText}
            maxScaleDenominatorPlaceholderText={this.props.maxScaleDenominatorPlaceholderText}
            filterFieldSetTitle={this.props.filterFieldSetTitle}
            filterAttributeLabelText={this.props.filterAttributeLabelText}
            filterAttributePlaceholderText={this.props.filterAttributePlaceholderText}
            filterAttributeValidationHelpText={this.props.filterAttributeValidationHelpText}
            filterOperatorLabelText={this.props.filterOperatorLabelText}
            filterOperatorPlaceholderText={this.props.filterOperatorPlaceholderText}
            filterOperatorValidationHelpText={this.props.filterOperatorValidationHelpText}
            filterValueLabelText={this.props.filterValueLabelText}
            filterValuePlaceholderText={this.props.filterValuePlaceholderText}
            filterValueValidationHelpText={this.props.filterValueValidationHelpText}
          />)
        }
        <Button
          style={{'marginBottom': '20px', 'marginTop': '20px'}}
          icon="plus"
          size="large"
          onClick={this.addRule}
        >
          {this.props.addRuleBtnText}
        </Button>
      </div>
    );
  }
}

export default Style;
