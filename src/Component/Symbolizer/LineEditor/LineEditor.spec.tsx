import { LineEditor, LineEditorProps } from './LineEditor';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { LineSymbolizer, MarkSymbolizer } from 'geostyler-style';

describe('LineEditor', () => {

  let wrapper: any;
  let dummySymbolizer: LineSymbolizer = SymbolizerUtil.generateSymbolizer('Line') as LineSymbolizer;
  let onSymbolizerChangeDummy: jest.Mock;

  beforeEach(() => {
    onSymbolizerChangeDummy = jest.fn();
    const props: LineEditorProps = {
      symbolizer: dummySymbolizer,
      locale: en_US.GsLineEditor,
      onSymbolizerChange: onSymbolizerChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(LineEditor, props);
  });

  it('is defined', () => {
    expect(LineEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
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

  describe('onWidthChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onWidthChange = wrapper.instance().onWidthChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.width = 12;
      onWidthChange(12);
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

  describe('onDasharrayChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onDasharrayChange = wrapper.instance().onDasharrayChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.dasharray = [0, 8, 15];
      onDasharrayChange([0, 8, 15]);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onDashOffsetChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onDashOffsetChange = wrapper.instance().onDashOffsetChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.dashOffset = 5;
      onDashOffsetChange(5);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onCapChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onCapChange = wrapper.instance().onCapChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.cap = 'square';
      onCapChange('square');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onJoinChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onJoinChange = wrapper.instance().onJoinChange;
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.join = 'bevel';
      onJoinChange('bevel');
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onGraphicStrokeChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onGraphicStrokeChange = wrapper.instance().onGraphicStrokeChange;
      const newSymbolizer = {...dummySymbolizer};
      const markSymbolizer = SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer;
      newSymbolizer.graphicStroke = markSymbolizer;
      onGraphicStrokeChange(markSymbolizer);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('onGraphicFillChange', () => {
    it('calls the onSymbolizerChange prop with correct symbolizer ', () => {
      const onGraphicFillChange = wrapper.instance().onGraphicFillChange;
      const newSymbolizer = {...dummySymbolizer};
      const markSymbolizer = SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer;
      newSymbolizer.graphicFill = markSymbolizer;
      onGraphicFillChange(markSymbolizer);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

});
