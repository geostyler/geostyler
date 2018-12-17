import {
  ColorsPreview,
  ColorsPreviewProps
} from './ColorsPreview';
import TestUtil from '../../../Util/TestUtil';

describe('ColorsPreview', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ColorsPreviewProps = {
      colors: ['#FF0000', '#FFFFFF']
    };
    wrapper = TestUtil.shallowRenderComponent(ColorsPreview, props);
  });

  it('is defined', () => {
    expect(ColorsPreview).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
