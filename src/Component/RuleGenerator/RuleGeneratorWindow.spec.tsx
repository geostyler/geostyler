import {
  RuleGeneratorWindow,
  RuleGeneratorWindowProps
} from './RuleGeneratorWindow';
import TestUtil from '../../Util/TestUtil';
import { Data } from 'geostyler-data';

describe('SymbolizerEditorWindow', () => {

  let wrapper: any;
  const dummyData: Data = TestUtil.getDummyGsData();

  beforeEach(() => {
    const props: RuleGeneratorWindowProps = {
      internalDataDef: dummyData
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
