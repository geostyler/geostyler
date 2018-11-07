import CodeEditor, { CodeEditorProps } from './CodeEditor';
import TestUtil from '../../Util/TestUtil';

describe('CodeEditor', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: CodeEditorProps = {};
    wrapper = TestUtil.shallowRenderComponent(CodeEditor, props);
  });

  it('is defined', () => {
    expect(CodeEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
