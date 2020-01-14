import { PreviewMap, PreviewMapProps } from './PreviewMap';
import TestUtil from '../../Util/TestUtil';

describe('PreviewMap', () => {

  let wrapper: any;
  const dummyStyle = TestUtil.getLineStyle();

  beforeEach(() => {
    const props: PreviewMapProps = {
      style: dummyStyle
    };
    wrapper = TestUtil.shallowRenderComponent(PreviewMap, props);
  });

  it('is defined', () => {
    expect(PreviewMap).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
