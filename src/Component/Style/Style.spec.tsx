import { Style, StyleProps } from './Style';
import TestUtil from '../../Util/TestUtil';
import en_US from '../../locale/en_US';
const _cloneDeep = require('lodash/cloneDeep');

describe('Style', () => {

  let wrapper: any;
  let lineStyle = TestUtil.getLineStyle();
  beforeEach(() => {
    const props: StyleProps = {
      locale: en_US.GsStyle,
      style: lineStyle
    };
    wrapper = TestUtil.shallowRenderComponent(Style, props);
  });

  it('is defined', () => {
    expect(Style).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('sets the state to props.style', () => {
    expect(wrapper.state().style).toEqual(lineStyle);
  });

  it('onNameChange changes Style.name', () => {
    expect(wrapper.state().style.name).toEqual(lineStyle.name);
    wrapper.instance().onNameChange('new Name');
    expect(wrapper.state().style.name).toEqual('new Name');
  });

  it('onRuleChange updates the right rule', () => {
    const twoRules = TestUtil.getTwoRulesStyle();
    wrapper.setState({style: twoRules});
    let newRule = _cloneDeep(twoRules.rules[1]);
    newRule.symbolizers[0].color = '#000';

    wrapper.instance().onRuleChange(newRule, twoRules.rules[1]);
    const newStyle = wrapper.state().style;
    expect(newStyle).toBeDefined();
    expect(newStyle.rules[0]).toEqual(twoRules.rules[0]);
    expect(newStyle.rules[1]).toEqual(newRule);
    expect(newStyle.rules[1]).not.toEqual(twoRules.rules[1]);
  });

  it('adds a Rule', () => {
    expect(wrapper.state().style.rules).toHaveLength(1);
    wrapper.instance().addRule();
    expect(wrapper.state().style.rules).toHaveLength(2);
  });

  it('removes a Rule', () => {
    expect(wrapper.state().style.rules).toHaveLength(1);
    wrapper.instance().removeRule(lineStyle.rules[0]);
    expect(wrapper.state().style.rules).toHaveLength(0);
  });

  it('disables the color menu item', () => {
    let twoRules = TestUtil.getTwoRulesStyle();
    wrapper.instance().setState({style: twoRules});
    let disabled = wrapper.instance().disableMenu('color', [0, 1]);
    expect(disabled).toEqual(false);
    twoRules.rules[0].symbolizers[0].kind = 'Icon';
    wrapper.instance().setState({style: twoRules});
    disabled = wrapper.instance().disableMenu('color', [0, 1]);
    expect(disabled).toEqual(true);
  });

  it('disables the size menu item', () => {
    let twoRules = TestUtil.getTwoRulesStyle();
    wrapper.instance().setState({style: twoRules});
    let disabled = wrapper.instance().disableMenu('size', [0, 1]);
    expect(disabled).toEqual(false);
    twoRules.rules[0].symbolizers[0].kind = 'Line';
    wrapper.instance().setState({style: twoRules});
    disabled = wrapper.instance().disableMenu('size', [0, 1]);
    expect(disabled).toEqual(true);
  });

  it('disables the symbol menu item', () => {
    let twoRules = TestUtil.getTwoRulesStyle();
    wrapper.instance().setState({style: twoRules});
    let disabled = wrapper.instance().disableMenu('symbol', [0, 1]);
    expect(disabled).toEqual(false);
    twoRules.rules[0].symbolizers[0].kind = 'Line';
    wrapper.instance().setState({style: twoRules});
    disabled = wrapper.instance().disableMenu('symbol', [0, 1]);
    expect(disabled).toEqual(true);
  });
});
