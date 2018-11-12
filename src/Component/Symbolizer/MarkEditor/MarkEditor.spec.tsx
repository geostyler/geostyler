import { MarkEditor, MarkEditorProps } from './MarkEditor';
import TestUtil from '../../../Util/TestUtil';

describe('MarkEditor', () => {

  let wrapper: any;
  let markstyle: any;
  beforeEach(() => {
    markstyle = TestUtil.getMarkStyle();
    const props: MarkEditorProps = {
      symbolizer: markstyle.rules[0].symbolizers[0]
    };
    wrapper = TestUtil.shallowRenderComponent(MarkEditor, props);
  });

  it('is defined', () => {
    expect(MarkEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
