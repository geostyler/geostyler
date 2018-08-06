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
import NameField, { DefaultNameFieldProps } from '../NameField/NameField';

// default props
interface DefaultStyleProps {
  style: GsStyle;
  /** i18n */
  nameFieldLabel?: string;
  nameFieldPlaceholder?: string;
  addRuleBtnText?: string;
  removeRuleBtnText?: string;
  filterFieldSetTitle?: string;
  scaleFieldSetTitle?: string;
  filterUiProps?: DefaultComparisonFilterProps;
  scaleDenominatorProps?: DefaultScaleDenominatorProps;
  previewProps?: DefaultPreviewProps;
  ruleNameProps?: DefaultNameFieldProps;
}

const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');
import { DefaultComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
import { DefaultScaleDenominatorProps } from '../ScaleDenominator/ScaleDenominator';
import { DefaultPreviewProps } from '../Symbolizer/Preview/Preview';

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
    const ruleIdxToReplace = style.rules.findIndex((r: any) => {
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
    const newRules = style.rules.filter((r: any) => r.name !== rule.name);
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
            filterUiProps={this.props.filterUiProps}
            scaleDenominatorProps={this.props.scaleDenominatorProps}
            previewProps={this.props.previewProps}
            ruleNameProps={this.props.ruleNameProps}
            filterFieldSetTitle={this.props.filterFieldSetTitle}
            scaleFieldSetTitle={this.props.scaleFieldSetTitle}
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
