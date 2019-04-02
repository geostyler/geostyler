import { RasterEditor, RasterEditorProps } from './RasterEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { RasterSymbolizer, MarkSymbolizer } from 'geostyler-style';

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

  describe('onHueRotateChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onHueRotateChange = wrapper.instance().onHueRotateChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.hueRotate = 90;
      onHueRotateChange(90);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onBrightnessMinChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onBrightnessMinChange = wrapper.instance().onBrightnessMinChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.brightnessMin = 0;
      onBrightnessMinChange(0);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onBrightnessMaxChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onBrightnessMaxChange = wrapper.instance().onBrightnessMaxChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.brightnessMax = 1;
      onBrightnessMaxChange(1);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onSaturationChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onSaturationChange = wrapper.instance().onSaturationChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.saturation = 1;
      onSaturationChange(1);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onContrastChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onContrastChange = wrapper.instance().onContrastChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.contrast = 1;
      onContrastChange(1);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onFadeDurationChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onFadeDurationChange = wrapper.instance().onFadeDurationChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.fadeDuration = 400;
      onFadeDurationChange(400);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onResamplingChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onResamplingChange = wrapper.instance().onResamplingChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.resampling = 'linear';
      onResamplingChange('linear');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

});
