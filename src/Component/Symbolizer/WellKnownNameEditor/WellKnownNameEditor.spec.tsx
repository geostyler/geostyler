import { WellKnownNameEditor, WellKnownNameEditorProps } from './WellKnownNameEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { MarkSymbolizer } from 'geostyler-style';

describe('WellKnownNameEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const markstyle = TestUtil.getMarkStyle();
    const props: WellKnownNameEditorProps = {
      symbolizer: markstyle.rules[0].symbolizers[0] as MarkSymbolizer,
      locale: en_US.GsWellKnownNameEditor
    };
    wrapper = TestUtil.shallowRenderComponent(WellKnownNameEditor, props);
  });

  it('is defined', () => {
    expect(WellKnownNameEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
