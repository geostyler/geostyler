import { MultiEditor, MultiEditorProps } from './MultiEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { Symbolizer } from 'geostyler-style';

describe('Renderer', () => {

  let wrapper: any;
  let dummyOnSymbolizerChange: jest.Mock;
  const dummySymbolizers: Symbolizer[] = [{
    kind: 'Mark',
    wellKnownName: 'Circle',
    color: '#FF0000'
  }, {
    kind: 'Mark',
    wellKnownName: 'Circle',
    color: '#FF00FF'
  }];

  beforeEach(() => {
    dummyOnSymbolizerChange = jest.fn();
    const props: MultiEditorProps = {
      locale: en_US.GsMultiEditor,
      onSymbolizersChange: dummyOnSymbolizerChange,
      symbolizers: dummySymbolizers
    };
    wrapper = TestUtil.shallowRenderComponent(MultiEditor, props);
  });

  it('is defined', () => {
    expect(MultiEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('adds a Symbolizer', () => {
    wrapper.instance().addSymbolizer();
    expect(dummyOnSymbolizerChange).toHaveBeenCalledTimes(1);
    dummyOnSymbolizerChange.mockRestore();
  });

  it('removes a Symbolizer', () => {
    wrapper.instance().removeSymbolizer(1);
    expect(dummyOnSymbolizerChange).toHaveBeenCalledTimes(1);
    dummyOnSymbolizerChange.mockRestore();
  });
});
