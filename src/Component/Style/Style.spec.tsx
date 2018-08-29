import { Style } from './Style';
import TestUtil from '../../Util/TestUtil';
import en_US from '../../locale/en_US';
const _cloneDeep = require('lodash/cloneDeep');

describe('Style', () => {

  let wrapper: any;
  let lineStyle = TestUtil.getLineStyle();
  beforeEach(() => {

    wrapper = TestUtil.shallowRenderComponent(Style, {
      locale: en_US.GsStyle,
      style: lineStyle
    });
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

  it('gets the right default Symbolizer', () => {
    const mark = wrapper.instance().getDefaultSymbolizer({kind: 'Mark'});
    const icon = wrapper.instance().getDefaultSymbolizer({kind: 'Icon'});
    const text = wrapper.instance().getDefaultSymbolizer({kind: 'Text'});
    const fill = wrapper.instance().getDefaultSymbolizer({kind: 'Fill'});
    const line = wrapper.instance().getDefaultSymbolizer({kind: 'Line'});

    expect(mark).toHaveProperty('kind', 'Mark');
    expect(mark).toHaveProperty('wellKnownName', 'Circle');
    expect(icon).toHaveProperty('kind', 'Icon');
    expect(text).toHaveProperty('kind', 'Text');
    expect(fill).toHaveProperty('kind', 'Fill');
    expect(line).toHaveProperty('kind', 'Line');
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

  it('adds a Symbolizer', () => {
    expect(wrapper.state().style.rules[0].symbolizers).toHaveLength(1);
    wrapper.instance().addSymbolizer(lineStyle.rules[0]);
    expect(wrapper.state().style.rules[0].symbolizers).toHaveLength(2);
  });

  it('removes a Symbolizer', () => {
    expect(wrapper.state().style.rules[0].symbolizers).toHaveLength(1);
    wrapper.instance().removeSymbolizer(lineStyle.rules[0], lineStyle.rules[0].symbolizers[0]);
    expect(wrapper.state().style.rules[0].symbolizers).toHaveLength(0);
  });
});
