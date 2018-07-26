import { LineEditor } from './LineEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';

describe('LineEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const linestyle = TestUtil.getLineStyle();
    wrapper = TestUtil.shallowRenderComponent(LineEditor, {
      symbolizer: linestyle.rules[0].symbolizer,
      locale: en_US.GsLineEditor
    });
  });

  it('is defined', () => {
    expect(LineEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
