import { PropTextEditor, PropTextEditorProps } from './PropTextEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { TextSymbolizer } from 'geostyler-style';

describe('PropTextEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const labelStyle = TestUtil.getLabeledPointStyle();
    const props: PropTextEditorProps = {
      symbolizer: labelStyle.rules[0].symbolizers[0] as TextSymbolizer,
      locale: en_US.GsPropTextEditor
    };
    wrapper = TestUtil.shallowRenderComponent(PropTextEditor, props);
  });

  it('is defined', () => {
    expect(PropTextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
