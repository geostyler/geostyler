import TextEditor from './TextEditor';
import TestUtil from '../../../Util/TestUtil';

describe('TextEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const labelStyle = TestUtil.getLabeledPointStyle();
    wrapper = TestUtil.shallowRenderComponent(TextEditor, {
      symbolizer: labelStyle.rules[0].symbolizer
    });
  });

  it('is defined', () => {
    expect(TextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
