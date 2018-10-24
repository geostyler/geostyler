import { PropTextEditor } from './PropTextEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';

describe('PropTextEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const labelStyle = TestUtil.getLabeledPointStyle();
    wrapper = TestUtil.shallowRenderComponent(PropTextEditor, {
      symbolizer: labelStyle.rules[0].symbolizers,
      locale: en_US.GsTextEditor
    });
  });

  it('is defined', () => {
    expect(PropTextEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
