import SymbolizerEditorWindow, { SymbolizerEditorWindowProps } from './SymbolizerEditorWindow';
import TestUtil from '../../../Util/TestUtil';
import { Symbolizer } from 'geostyler-style';

describe('SymbolizerEditorWindow', () => {

  let wrapper: any;
  const dummySymbolizers: Symbolizer[] = [{
    kind: 'Mark',
    wellKnownName: 'Circle',
    color: '#FF0000'
  }];

  beforeEach(() => {
    const props: SymbolizerEditorWindowProps = {
      symbolizers: dummySymbolizers
    };
    wrapper = TestUtil.shallowRenderComponent(SymbolizerEditorWindow, props);
  });

  it('is defined', () => {
    expect(SymbolizerEditorWindow).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
