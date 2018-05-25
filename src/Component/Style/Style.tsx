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

// default props
interface DefaultStyleProps {
  style: GsStyle;
}

// non default props
interface StyleProps extends Partial<DefaultStyleProps> {
  data?: GsData;
}

// state
interface StyleState {
  style: GsStyle;
}

class Style extends React.Component<StyleProps, StyleState> {

  public static defaultProps: DefaultStyleProps = {
    style: {
      name: 'My Style',
      type: 'Point',
      rules: []
    }
  };

  static getDerivedStateFromProps(nextProps: StyleProps, prevState: StyleState): StyleState {
    return {
      style: nextProps.style || prevState.style
    };
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

  /**
   * Adds another ComparisonFilter to this UI.
   */
  addRule = () => {
    const style = this.state.style;
    const newRule: GsRule = {
      name: 'new rule',
      symbolizer: this.getSymbolizerFromStyleType(style)
    };
    style.rules = [...style.rules, newRule];
    this.setState({style});
  }

  render() {
    const {
      rules
    } = this.state.style;

    return (
      <div>
        {rules.map((rule) => <Rule key={rule.name} rule={rule} />)}
        <Button
          style={{'marginBottom': '20px', 'marginTop': '20px'}}
          shape="circle"
          icon="plus"
          size="large"
          onClick={this.addRule}
        />
      </div>
    );
  }
}

export default Style;
