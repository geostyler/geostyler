import { RasterEditor, RasterEditorProps } from './RasterEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { RasterSymbolizer } from 'geostyler-style';

describe('RasterEditor', () => {

  let wrapper: any;
  let dummySymbolizer: RasterSymbolizer = SymbolizerUtil.generateSymbolizer('Raster') as RasterSymbolizer;
  let onSymbolizerChangeDummy: jest.Mock;

  beforeEach(() => {
    onSymbolizerChangeDummy = jest.fn();
    const props: RasterEditorProps = {
      symbolizer: dummySymbolizer,
      locale: en_US.GsRasterEditor,
      onSymbolizerChange: onSymbolizerChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(RasterEditor, props);
  });

  it('is defined', () => {
    expect(RasterEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onOpacityChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onOpacityChange = wrapper.instance().onOpacityChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.opacity = 0.5;
      onOpacityChange(0.5);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });
});
