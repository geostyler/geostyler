import MarkEditor from './MarkEditor';
import TestUtil from '../../../Util/TestUtil';

describe('MarkEditor', () => {

  let wrapper: any;
  let markstyle: any;
  beforeEach(() => {
    markstyle = TestUtil.getMarkStyle();
    wrapper = TestUtil.shallowRenderComponent(MarkEditor, {
      symbolizer: markstyle.rules[0].symbolizers[0]
    });
  });

  it('is defined', () => {
    expect(MarkEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('calls props.onSymbolizerChange()', () => {
    let counter: number = 0;
    wrapper.setProps({
      onSymbolizerChange: ((symb: any) => counter++)
    });
    wrapper.instance().onSymbolizerChange(markstyle.rules[0].symbolizers[0]);
    expect(counter).toEqual(1);
  });
});
