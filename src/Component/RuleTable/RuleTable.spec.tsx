import { RuleTable, RuleTableProps } from './RuleTable';
import TestUtil from '../../Util/TestUtil';
import { Rule } from 'geostyler-style';

describe('RuleTable', () => {
  let wrapper: any;
  let dummyRules: Rule[];

  beforeEach(() => {
    dummyRules = TestUtil.getTwoRulesStyle().rules;
    dummyRules[1].filter = TestUtil.getDummyGsFilter();
    const props: RuleTableProps = {
      rules: dummyRules
    };
    wrapper = TestUtil.shallowRenderComponent(RuleTable, props);
  });

  it('is defined', () => {
    expect(RuleTable).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('getRuleRecords', () => {
    it('returns a RuleRecord for every Rule', () => {
      const getRuleRecords = wrapper.instance().getRuleRecords;
      const got = getRuleRecords();
      expect(got.length).toEqual(dummyRules.length);
      expect(got[0]).toEqual({...dummyRules[0], key: 0});
      expect(got[1]).toEqual({...dummyRules[1], key: 1});
    });
  });

  describe('onSymbolizerClick', () => {
    it('sets the state correctly', () => {
      const onSymbolizerClick = wrapper.instance().onSymbolizerClick;
      const dummyRect: DOMRect = {
        x: 12,
        y: 24,
        width: 36,
        height: 48,
        bottom: 60,
        top: 72,
        left: 84,
        right: 96,
        toJSON: jest.fn()
      };
      onSymbolizerClick(wrapper.instance().getRuleRecords()[1], dummyRect);
      const state = wrapper.state();
      const newValues = {
        ruleEditIndex: 1,
        symbolizerEditorVisible: true,
        symbolizerEditorPosition: dummyRect,
        filterEditorVisible: false
      };
      const got = {...state, ...newValues};
      expect(state).toEqual(got);
    });
  });

});
