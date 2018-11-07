import FilterEditorWindow, { FilterEditorWindowProps } from './FilterEditorWindow';
import TestUtil from '../../../Util/TestUtil';

describe('FilterEditorWindow', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: FilterEditorWindowProps = {
      filter: TestUtil.getDummyGsFilter()
    };
    wrapper = TestUtil.shallowRenderComponent(FilterEditorWindow, props);
  });

  it('is defined', () => {
    expect(FilterEditorWindow).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
