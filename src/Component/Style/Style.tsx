import * as React from 'react';

const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');

import { Button } from 'antd';

import {
  Style as GsStyle,
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  MarkSymbolizer as GsMarkSymbolizer,
  IconSymbolizer as GsIconSymbolizer
} from 'geostyler-style';

import {
  Data as GsData
} from 'geostyler-data';

import Rule from '../Rule/Rule';
import NameField, { DefaultNameFieldProps } from '../NameField/NameField';
import { DefaultComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';

import { localize } from '../LocaleWrapper/LocaleWrapper';

// i18n
export interface StyleLocale {
  addRuleBtnText: string;
  nameFieldLabel?: string;
  nameFieldPlaceholder?: string;
}

// default props
interface DefaultStyleProps {
  style: GsStyle;
  defaultIconSource?: string;
  filterUiProps?: DefaultComparisonFilterProps;
  ruleNameProps?: DefaultNameFieldProps;
  locale?: StyleLocale;
}

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

export class Style extends React.Component<StyleProps, StyleState> {
  constructor(props: StyleProps) {
    super(props);
    this.state = {
      style: props.style || Style.defaultProps.style
    };
  }

  static componentName: string = 'Style';

  public static defaultProps: DefaultStyleProps = {
    style: {
      name: 'My Style',
      rules: []
    },
    defaultIconSource: 'img/openLayers_logo.svg'
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
  getDefaultSymbolizer(symbolizer: GsSymbolizer): GsSymbolizer {
    if (symbolizer) {
      if (symbolizer.kind === 'Mark') {
        return {
          kind: symbolizer.kind,
          wellKnownName: 'Circle'
        } as GsMarkSymbolizer;
      } else if (symbolizer.kind === 'Icon') {
        return {
          kind: symbolizer.kind,
          image: this.props.defaultIconSource
        } as GsIconSymbolizer;
      } else {
        return {
          kind: symbolizer.kind
        } as GsSymbolizer;
      }
    } else {
      return {
        kind: 'Mark',
        wellKnownName: 'Circle'
      } as GsMarkSymbolizer;
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
      symbolizers: [this.getDefaultSymbolizer(_get(style, 'rules[0].symbolizers[0]'))]
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
            dataProjection={this.props.dataProjection}
            filterUiProps={this.props.filterUiProps}
            ruleNameProps={this.props.ruleNameProps}
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
