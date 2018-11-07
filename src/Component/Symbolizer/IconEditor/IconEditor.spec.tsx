import IconEditor, { IconEditorProps } from './IconEditor';
import TestUtil from '../../../Util/TestUtil';

describe('IconEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: IconEditorProps = {
      symbolizer: {
        kind: 'Icon'
      }
    };
    wrapper = TestUtil.shallowRenderComponent(IconEditor, props);
  });

  it('is defined', () => {
    expect(IconEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
