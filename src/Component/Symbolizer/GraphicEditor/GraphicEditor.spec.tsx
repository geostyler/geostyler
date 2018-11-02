import GraphicEditor from './GraphicEditor';
import TestUtil from '../../../Util/TestUtil';
import {
  GraphicType,
  MarkSymbolizer,
  IconSymbolizer
} from 'geostyler-style';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';

describe('GraphicEditor', () => {

  const dummyGraphicType: GraphicType = 'Mark';
  const dummyGraphicMark: MarkSymbolizer = SymbolizerUtil.markSymbolizer;
  const dummyGraphicIcon: IconSymbolizer = SymbolizerUtil.iconSymbolizer;
  const onGraphicChangeSpy = jest.fn();

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(GraphicEditor, {
      graphic: dummyGraphicMark,
      graphicType: dummyGraphicType,
      onGraphicChange: onGraphicChangeSpy
    });
    onGraphicChangeSpy.mockClear();
  });

  it('is defined', () => {
    expect(GraphicEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('renders MarkEditor if graphic is Mark', () => {
    expect(wrapper.instance().getGraphicFields(dummyGraphicMark).props.symbolizer.kind)
      .toEqual('Mark');
  });

  it('renders IconEditor if graphic is Icon', () => {
    expect(wrapper.instance().getGraphicFields(dummyGraphicIcon).props.symbolizer.kind).toEqual('Icon');
  });

  it('renders nothing if graphicType is not Mark or Icon', () => {
    expect(wrapper.instance().getGraphicFields('Text')).toBeUndefined();
  });

  it('handles onGraphicTypeChange', () => {
    expect.assertions(9);
    expect(onGraphicChangeSpy).not.toHaveBeenCalled();
    const wrapperInstance = wrapper.instance();

    wrapperInstance.onGraphicTypeChange('Mark');
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(dummyGraphicMark);

    wrapperInstance.onGraphicTypeChange('Icon');
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(dummyGraphicIcon);

    wrapperInstance.onGraphicTypeChange('Wrong');
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(undefined);

    wrapperInstance.onGraphicTypeChange();
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(undefined);
  });
});
