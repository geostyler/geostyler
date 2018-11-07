import { GraphicTypeField, GraphicTypeFieldProps } from './GraphicTypeField';
import TestUtil from '../../../../Util/TestUtil';

describe('GraphicTypeField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: GraphicTypeFieldProps = {};
    wrapper = TestUtil.shallowRenderComponent(GraphicTypeField, props);
  });

  it('is defined', () => {
    expect(GraphicTypeField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('gets the right default type select options', () => {
    expect(wrapper.instance().getTypeSelectOptions()).toHaveLength(2);
  });

  it('gets the right non-default type select options', () => {
    wrapper.setProps({
      graphicTypes: ['Mark']
    });
    expect(wrapper.instance().getTypeSelectOptions()).toHaveLength(1);
  });
});
