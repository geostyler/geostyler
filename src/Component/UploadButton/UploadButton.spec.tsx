import { UploadButton, UploadButtonProps } from './UploadButton';
import TestUtil from '../../Util/TestUtil';

describe('UploadButton', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: UploadButtonProps = {};
    wrapper = TestUtil.shallowRenderComponent(UploadButton, props);
  });

  it('is defined', () => {
    expect(UploadButton).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
