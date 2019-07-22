import { RuleReorderButtons, RuleReorderButtonsProps } from './RuleReorderButtons';
import TestUtil from '../../../Util/TestUtil';

import {
  Rule as GsRule,
} from 'geostyler-style';

const _cloneDeep = require('lodash/cloneDeep');

describe('ReorderButtonGroup', () => {

  let wrapper: any;
  let onRulesMoveDummy: jest.Mock;
  let dummyRules: any;
  beforeEach(() => {
    dummyRules = TestUtil.getTwoRulesStyle().rules;
    onRulesMoveDummy = jest.fn();
    const props: RuleReorderButtonsProps = {
      ruleIndex: 1,
      rules: dummyRules,
      onRulesMove: onRulesMoveDummy
    };
    wrapper = TestUtil.shallowRenderComponent(RuleReorderButtons, props);
  });

  it('is defined', () => {
    expect(RuleReorderButtons).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onRuleOrderChange', () => {
    it('reorders the rules downwards', () => {
      const ruleIndex = 0;
      const rules = [...dummyRules];
      let reorderRules: GsRule[];
      const onRulesMove = (_reorderedRules) => {
        reorderRules = _reorderedRules;
      }
      wrapper.setProps({
        ruleIndex,
        rules,
        onRulesMove
      });

      // move first item downwards
      wrapper.instance().onRuleOrderChange(true);
      expect(reorderRules[0].name).toBe('rule1');
    });

    it('reorders the rules upwards', () => {
      const ruleIndex = 1;
      const rules = [...dummyRules];
      let reorderRules: GsRule[];
      const onRulesMove = (_reorderedRules) => {
        reorderRules = _reorderedRules;
      }
      wrapper.setProps({
        ruleIndex, 
        rules,
        onRulesMove
      });
      // move second item upwards
      wrapper.instance().onRuleOrderChange(false);
      expect(reorderRules[0].name).toBe('rule1');
    });

    it('calls the onRulesChange with the reordered rules ', () => {
      const ruleIndex = 0;
      const rules = [...dummyRules];
      // re-order rules
      const rulesClone = _cloneDeep(rules);
      rulesClone.splice(1, 0, rulesClone.splice(0, 1)[0]);
      const onRulesMove = jest.fn();
      wrapper.setProps({
        ruleIndex,
        rules,
        onRulesMove
      });
      wrapper.instance().onRuleOrderChange(true);
      expect(onRulesMove).toHaveBeenCalledWith(rulesClone);
    });
  });

});
