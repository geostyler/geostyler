import { WellKnownNameEditor } from './WellKnownNameEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';

describe('WellKnownNameEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const markstyle = TestUtil.getMarkStyle();
    wrapper = TestUtil.shallowRenderComponent(WellKnownNameEditor, {
      symbolizer: markstyle.rules[0].symbolizers,
      locale: en_US.GsLineEditor
    });
  });

  it('is defined', () => {
    expect(WellKnownNameEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
