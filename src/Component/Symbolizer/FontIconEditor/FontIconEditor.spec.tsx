import { FontIconEditor, FontIconEditorProps } from './FontIconEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { FontIconSymbolizer } from 'geostyler-style';

describe('IconEditor', () => {

  let wrapper: any;
  let dummySymbolizer: FontIconSymbolizer = SymbolizerUtil.generateSymbolizer('FontIcon') as FontIconSymbolizer;
  let onSymbolizerChangeDummy: jest.Mock;

  beforeEach(() => {
    onSymbolizerChangeDummy = jest.fn();
    const props: FontIconEditorProps = {
      symbolizer: dummySymbolizer,
      locale: en_US.GsFontIconEditor,
      onSymbolizerChange: onSymbolizerChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(FontIconEditor, props);
  });

  it('is defined', () => {
    expect(FontIconEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onImageSrcChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onImageSrcChange = wrapper.instance().onImageSrcChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.image = 'www.meinbild.de/image.png';
      onImageSrcChange('www.meinbild.de/image.png');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onSizeChange', () => {
    it('calls the onSizeChange prop with correct symbolizer ', () => {
      const onSizeChange = wrapper.instance().onSizeChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.size = 7;
      onSizeChange(7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onRotateChange', () => {
    it('calls the onRotateChange prop with correct symbolizer ', () => {
      const onRotateChange = wrapper.instance().onRotateChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.rotate = 45;
      onRotateChange(45);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onOpacityChange', () => {
    it('calls the onOpacityChange prop with correct symbolizer ', () => {
      const onOpacityChange = wrapper.instance().onOpacityChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.opacity = 0.7;
      onOpacityChange(0.7);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

});
