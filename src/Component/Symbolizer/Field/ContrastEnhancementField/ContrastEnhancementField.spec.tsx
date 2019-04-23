import { ContrastEnhancementField, ContrastEnhancementFieldProps } from './ContrastEnhancementField';
import TestUtil from '../../../../Util/TestUtil';

describe('ContrastEnhancementField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ContrastEnhancementFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(ContrastEnhancementField, props);
  });

  it('is defined', () => {
    expect(ContrastEnhancementField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('getContrastEnhancementSelectOptions', () => {
    it('returns the right amount of options', () => {
      const options = wrapper.instance().getContrastEnhancementSelectOptions();
      expect(options).toHaveLength(2);
      const dummySelectOptions = ['normalize'];
      wrapper.setProps({contrastEnhancementOptions: dummySelectOptions});
      const newOptions = wrapper.instance().getContrastEnhancementSelectOptions();
      expect(newOptions).toHaveLength(1);
    });
  });
});
