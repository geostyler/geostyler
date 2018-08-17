import GraphicEditor from './GraphicEditor';
import TestUtil from '../../../Util/TestUtil';
import {
  PointSymbolizer,
  GraphicType,
  IconSymbolizer
} from 'geostyler-style';
// import MarkEditor from '../MarkEditor/MarkEditor';

describe('GraphicEditor', () => {

  const dummyGraphicType: GraphicType = 'Mark';
  const dummyGraphic: PointSymbolizer = {
    kind: 'Mark',
    wellKnownName: 'Circle'
  };

  const dummyOnGraphicChange = (g: PointSymbolizer, gType: GraphicType): void => {
    return;
  };

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(GraphicEditor, {
      graphic: dummyGraphic,
      graphicType: dummyGraphicType,
      onGraphicChange: dummyOnGraphicChange
    });
  });

  it('is defined', () => {
    expect(GraphicEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('renders MarkEditor if graphicType is Mark', () => {
    expect(wrapper.instance().getGraphicFields(dummyGraphicType).props.symbolizer.kind)
      .toEqual('Mark');
  });

  it('renders IconEditor if graphicType is Icon', () => {
    expect(wrapper.instance().getGraphicFields('Icon').props.symbolizer.kind).toEqual('Icon');
  });

  it('renders nothing if graphicType is not Mark or Icon', () => {
    expect(wrapper.instance().getGraphicFields('Text')).toBeUndefined();
  });

  it('returns CircleSymbolizer as default MarkGraphic', () => {
    expect(wrapper.instance().getDefaultMarkGraphic()).toEqual(dummyGraphic);
  });

  it('returns IconSymbolizer as default IconGraphic', () => {
    const dummyIcon: IconSymbolizer = {
      kind: 'Icon',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/OpenLayers_logo.svg'
    };
    expect(wrapper.instance().getDefaultIconGraphic()).toEqual(dummyIcon);
  });

  // it('handles onGraphicTypeChange', () => {
  //   const wrapperInstance = wrapper.instance();
  //   console.log(wrapperInstance);
  //   // const onGraphicChangeSpy = jest.spyOn(wrapperInstance.props, 'onGraphicChange');
  //   wrapperInstance.onGraphicTypeChange('Mark');
  //   wrapperInstance.onGraphicTypeChange('Icon');
  //   wrapperInstance.onGraphicTypeChange('Wrong');
  //   wrapperInstance.onGraphicTypeChange();
  //   expect(wrapperInstance.props.onGraphicChange).toHaveBeenCalledTimes(4);

  //   // onGraphicChangeSpy.mockReset();
  //   // onGraphicChangeSpy.mockRestore();
  // });
});
