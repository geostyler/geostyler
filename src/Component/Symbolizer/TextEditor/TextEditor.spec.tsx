import TextEditor, { TextEditorProps } from './TextEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { TextSymbolizer } from 'geostyler-style';

describe('TextEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const labelStyle = TestUtil.getLabeledPointStyle();
    const props: TextEditorProps = {
      symbolizer: labelStyle.rules[0].symbolizers[0] as TextSymbolizer,
      locale: en_US.GsTextEditor
    };
    wrapper = TestUtil.shallowRenderComponent(TextEditor, props);
  });

  it('is defined', () => {
    expect(TextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
