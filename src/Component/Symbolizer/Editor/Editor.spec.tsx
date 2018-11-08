import { Editor, EditorProps } from './Editor';
import TestUtil from '../../../Util/TestUtil';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import MarkEditor from '../MarkEditor/MarkEditor';
import { shallow } from 'enzyme';
import { IconEditor } from '../IconEditor/IconEditor';
import { LineEditor } from '../LineEditor/LineEditor';
import { FillEditor } from '../FillEditor/FillEditor';
import { TextEditor } from '../TextEditor/TextEditor';

describe('SymbolizerEditor', () => {

  let wrapper: any;
  let dummySymbolizer = TestUtil.getPolygonStyle().rules[0].symbolizers[0];
  beforeEach(() => {
    const props: EditorProps = {
      symbolizer: dummySymbolizer
    };
    wrapper = TestUtil.shallowRenderComponent(Editor, props);
  });

  it('is defined', () => {
    expect(Editor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onSymbolizerChange', () => {
    it('doesn\'t fail if no method is passed as prop', () => {
      const newSymbolizer = {...dummySymbolizer};
      newSymbolizer.color = '#00AA00';
      const func = wrapper.instance().onSymbolizerChange;
      func(newSymbolizer);
      expect(func).not.toThrow();
    });
    it('calls the change handler passed via props', () => {
      const newSymbolizer = {...dummySymbolizer};
      const onSymbolizerChangeDummy = jest.fn();
      newSymbolizer.color = '#00AA00';
      wrapper.setProps({
        onSymbolizerChange: onSymbolizerChangeDummy
      });
      wrapper.instance().onSymbolizerChange(newSymbolizer);
      expect(onSymbolizerChangeDummy).toBeCalledWith(newSymbolizer);
    });
  });

  describe('getUiFromSymbolizer', () => {
    it('returns a MarkEditor for Symbolizer with kind Mark', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Mark');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      const got = shallow(returnValue).instance();
      expect(got).toBeInstanceOf(MarkEditor);
    });
    it('returns an IconEditor for Symbolizer with kind Icon', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Icon');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      const localeWrapper = shallow(returnValue);
      const got = shallow(localeWrapper.get(0)).instance();
      expect(got).toBeInstanceOf(IconEditor);
    });
    it('returns a LineEditor for Symbolizer with kind Line', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Line');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      const localeWrapper = shallow(returnValue);
      const got = shallow(localeWrapper.get(0)).instance();
      expect(got).toBeInstanceOf(LineEditor);
    });
    it('returns a FillEditor for Symbolizer with kind Fill', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Fill');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      const localeWrapper = shallow(returnValue);
      const got = shallow(localeWrapper.get(0)).instance();
      expect(got).toBeInstanceOf(FillEditor);
    });
    it('returns a TextEditor for Symbolizer with kind Text', () => {
      const symbolizer = SymbolizerUtil.generateSymbolizer('Text');
      const func = wrapper.instance().getUiFromSymbolizer;
      const returnValue = func(symbolizer);
      const localeWrapper = shallow(returnValue);
      const got = shallow(localeWrapper.get(0)).instance();
      expect(got).toBeInstanceOf(TextEditor);
    });
    it('returns the unknownSymbolizerText prop as default', () => {
      const func = wrapper.instance().getUiFromSymbolizer;
      wrapper.setProps({
        unknownSymbolizerText: 'Go BIG or go Home!'
      });
      const got = func('BIG');
      expect(got).toBe('Go BIG or go Home!');
    });
  });

});
