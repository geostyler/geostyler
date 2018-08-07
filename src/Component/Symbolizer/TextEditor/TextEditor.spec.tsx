import { TextEditor } from './TextEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';

describe('TextEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const labelStyle = TestUtil.getLabeledPointStyle();
    wrapper = TestUtil.shallowRenderComponent(TextEditor, {
      symbolizer: labelStyle.rules[0].symbolizer,
      locale: en_US.GsTextEditor
    });
  });

  it('is defined', () => {
    expect(TextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
