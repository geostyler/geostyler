import {
  RuleGeneratorWindow,
  RuleGeneratorWindowProps
} from './RuleGeneratorWindow';
import TestUtil from '../../Util/TestUtil';
import { Rule } from 'geostyler-style';

describe('SymbolizerEditorWindow', () => {

  let wrapper: any;
  const dummyRules: Rule[] = TestUtil.getTwoRulesStyle().rules;

  beforeEach(() => {
    const props: RuleGeneratorWindowProps = {
      rules: dummyRules
    };
    wrapper = TestUtil.shallowRenderComponent(RuleGeneratorWindow, props);
  });

  it('is defined', () => {
    expect(RuleGeneratorWindow).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
