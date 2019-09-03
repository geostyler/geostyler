import { RuleTableFooter, RuleTableFooterProps } from './RuleTableFooter';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';

describe('Style', () => {

  let wrapper: any;
  let lineStyle = TestUtil.getLineStyle();
  let onTableMenuClickDummy: jest.Mock;
  beforeEach(() => {
    onTableMenuClickDummy = jest.fn();
    const props: RuleTableFooterProps = {
      locale: en_US.GsRuleTableFooter,
      style: lineStyle,
      selectedRowKeys: [],
      onTableMenuClick: onTableMenuClickDummy
    };
    wrapper = TestUtil.shallowRenderComponent(RuleTableFooter, props);
  });

  it('is defined', () => {
    expect(RuleTableFooter).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('sets the state to props.style', () => {
    expect(wrapper.state().style).toEqual(lineStyle);
  });

  it('adds a Rule', () => {
    expect(wrapper.state().style.rules).toHaveLength(1);
    wrapper.instance().addRule();
    expect(wrapper.state().style.rules).toHaveLength(2);
  });

  it('clones Rules', () => {
    expect(wrapper.state().style.rules).toHaveLength(1);
    wrapper.state().selectedRowKeys = [0];
    wrapper.instance().cloneRules();
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
