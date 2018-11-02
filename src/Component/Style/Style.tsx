import * as React from 'react';

const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');

import { Button } from 'antd';

import {
  Style as GsStyle,
  Rule as GsRule,
  SymbolizerKind
} from 'geostyler-style';

import {
  Data as GsData
} from 'geostyler-data';

import Rule from '../Rule/Rule';
import NameField, { NameFieldProps } from '../NameField/NameField';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import SymbolizerUtil from '../../Util/SymbolizerUtil';

// i18n
export interface StyleLocale {
  addRuleBtnText: string;
  nameFieldLabel?: string;
  nameFieldPlaceholder?: string;
}

// default props
interface DefaultStyleProps {
  style: GsStyle;
  locale: StyleLocale;
}

// non default props
interface StyleProps extends Partial<DefaultStyleProps> {
  data?: GsData;
  onStyleChange?: (rule: GsStyle) => void;
  /** The data projection of example features */
  dataProjection?: string;
  filterUiProps?: Partial<ComparisonFilterProps>;
  ruleNameProps?: Partial<NameFieldProps>;
}

// state
interface StyleState {
  style: GsStyle;
}

export class Style extends React.Component<StyleProps, StyleState> {
  constructor(props: StyleProps) {
    super(props);
    this.state = {
      style: props.style || Style.defaultProps.style
    };
  }

  static componentName: string = 'Style';

  public static defaultProps: DefaultStyleProps = {
    locale: en_US.GsStyle,
    style: {
      name: 'My Style',
      rules: []
    }
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.style && !_isEqual(this.props.style, prevProps.style)) {
      this.setState({
        style: this.props.style
      });
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
    const symbolizerKind: SymbolizerKind = _get(style, 'rules[0].symbolizers[0].kind');
    const newRule: GsRule = {
      name: 'rule_' + randomId,
      symbolizers: [SymbolizerUtil.generateSymbolizer(symbolizerKind)]
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

    const {
      dataProjection,
      filterUiProps,
      ruleNameProps,
      locale
    } = this.props;

    if (this.state.style) {
      rules = this.state.style.rules;
    }

    return (
      <div className="gs-style" >
        <NameField
          value={this.state.style.name}
          onChange={this.onNameChange}
          label={locale.nameFieldLabel}
          placeholder={locale.nameFieldPlaceholder}
        />
        {
          rules.map((rule, idx) => <Rule
            key={'rule_' + idx}
            rule={rule}
            onRemove={this.removeRule}
            internalDataDef={this.props.data}
            onRuleChange={this.onRuleChange}
            dataProjection={dataProjection}
            filterUiProps={filterUiProps}
            ruleNameProps={ruleNameProps}
          />)
        }
        <Button
          style={{'marginBottom': '20px', 'marginTop': '20px'}}
          icon="plus"
          size="large"
          onClick={this.addRule}
        >
          {locale.addRuleBtnText}
        </Button>
      </div>
    );
  }
}

export default localize(Style, Style.componentName);
