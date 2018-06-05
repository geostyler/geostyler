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
}

import {
  isEqual as _isEqual,
  cloneDeep as _cloneDeep
} from 'lodash';

// non default props
interface StyleProps extends Partial<DefaultStyleProps> {
  data?: GsData;
  onStyleChange?: (rule: GsStyle) => void;
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
    }
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
    this.setState({style});
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
  }

  onRuleChange = (rule: GsRule, ruleBefore: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const ruleIdxToReplace = style.rules.findIndex(r => {
      return _isEqual(r, ruleBefore);
    });
    if (ruleIdxToReplace > -1) {
      style.rules[ruleIdxToReplace] = rule;
      this.setState({style});
      if (this.props.onStyleChange) {
        this.props.onStyleChange(style);
      }
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
    this.setState({style});
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
  }

  removeRule = (rule: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const newRules = style.rules.filter(r => r.name !== rule.name);
    style.rules = newRules;
    this.setState({style});
    if (this.props.onStyleChange) {
      this.props.onStyleChange(style);
    }
  }

  render() {
    let rules: GsRule[] = [];
    if (this.state.style) {
      rules = this.state.style.rules;
    }
    return (
      <div className="gs-style" >
        <NameField value={this.state.style.name} onChange={this.onNameChange} />
        {
          rules.map((rule) => <Rule
            key={rule.name}
            rule={rule}
            onRemove={this.removeRule}
            internalDataDef={this.props.data}
            onRuleChange={this.onRuleChange}
          />)
        }
        <Button
          style={{'marginBottom': '20px', 'marginTop': '20px'}}
          icon="plus"
          size="large"
          onClick={this.addRule}
        >
          Add Rule
        </Button>
      </div>
    );
  }
}

export default Style;
