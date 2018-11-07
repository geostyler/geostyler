import { LineEditor, LineEditorProps } from './LineEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { LineSymbolizer } from 'geostyler-style';

describe('LineEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const linestyle = TestUtil.getLineStyle();
    const props: LineEditorProps = {
      symbolizer: linestyle.rules[0].symbolizers[0] as LineSymbolizer,
      locale: en_US.GsLineEditor
    };
    wrapper = TestUtil.shallowRenderComponent(LineEditor, props);
  });

  it('is defined', () => {
    expect(LineEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
