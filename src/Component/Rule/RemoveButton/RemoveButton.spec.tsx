import RemoveButton from './RemoveButton';
import TestUtil from '../../../Util/TestUtil';

describe('RemoveButton', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    wrapper = TestUtil.shallowRenderComponent(RemoveButton, {
      ruleIdx: 1,
      onClick: dummyFn
    });
  });

  it('is defined', () => {
    expect(RemoveButton).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
