import TitleField from './TitleField';
import TestUtil from '../../../Util/TestUtil';

describe('TitleField', () => {

  let wrapper: any;
  beforeEach(() => {
    let i = 0;
    const dummyFn = () => {
      i = i + 1;
    };
    wrapper = TestUtil.shallowRenderComponent(TitleField, {
      onChange: dummyFn
    });
  });

  it('is defined', () => {
    expect(TitleField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
