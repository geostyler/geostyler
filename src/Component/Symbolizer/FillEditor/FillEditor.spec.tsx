import FillEditor, { FillEditorProps } from './FillEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { FillSymbolizer } from 'geostyler-style';

describe('FillEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const polygonStyle = TestUtil.getPolygonStyle();
    const props: FillEditorProps = {
      symbolizer: polygonStyle.rules[0].symbolizers[0] as FillSymbolizer,
      locale: en_US.GsFillEditor
    };
    wrapper = TestUtil.shallowRenderComponent(FillEditor, props);
  });

  it('is defined', () => {
    expect(FillEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
