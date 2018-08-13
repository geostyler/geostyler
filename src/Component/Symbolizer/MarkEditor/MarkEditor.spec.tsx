import MarkEditor from './MarkEditor';
import TestUtil from '../../../Util/TestUtil';

describe('MarkEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const markstyle = TestUtil.getMarkStyle();
    wrapper = TestUtil.shallowRenderComponent(MarkEditor, {
      symbolizer: markstyle.rules[0].symbolizer
    });
  });

  it('is defined', () => {
    expect(MarkEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
