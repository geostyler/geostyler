import { WellKnownNameEditor, WellKnownNameEditorProps } from './WellKnownNameEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { MarkSymbolizer } from 'geostyler-style';

describe('WellKnownNameEditor', () => {

  let wrapper: any;
  let dummySymbolizer: MarkSymbolizer = SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer;
  let onSymbolizerChangeDummy: jest.Mock;
  beforeEach(() => {
    onSymbolizerChangeDummy = jest.fn();
    const props: WellKnownNameEditorProps = {
      symbolizer: dummySymbolizer,
      locale: en_US.GsWellKnownNameEditor,
      onSymbolizerChange: onSymbolizerChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(WellKnownNameEditor, props);
  });

  it('is defined', () => {
    expect(WellKnownNameEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onRadiusChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onRadiusChange = wrapper.instance().onRadiusChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.radius = 12;
      onRadiusChange(12);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onColorChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onColorChange = wrapper.instance().onColorChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.color = '#00AA00';
      onColorChange('#00AA00');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
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

  describe('onStrokeColorChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onStrokeColorChange = wrapper.instance().onStrokeColorChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.strokeColor = '#00AA00';
      onStrokeColorChange('#00AA00');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onStrokeWidthChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onStrokeWidthChange = wrapper.instance().onStrokeWidthChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.strokeWidth = 12;
      onStrokeWidthChange(12);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onStrokeOpacityChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onStrokeOpacityChange = wrapper.instance().onStrokeOpacityChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.strokeOpacity = 0.5;
      onStrokeOpacityChange(0.5);
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

});
